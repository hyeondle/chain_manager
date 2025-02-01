import string
import random

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager

# 공통 모델 (상속용)
class BaseUser(AbstractBaseUser, PermissionsMixin):
    usernumber = models.BigAutoField(primary_key=True)  # 유저번호 (자동증가)
    id = models.CharField(max_length=20, unique=True)  # 아이디
    password = models.CharField(max_length=128)  # 비밀번호
    email = models.EmailField(unique=True, blank=False, null=False)  # 이메일
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일
    phone_number = models.CharField(max_length=20, unique=True, blank=False, null=False)  # 전화번호
    region_number = models.CharField(max_length=5)  # 지역번호

    USERNAME_FIELD = 'id'
    REQUIRED_FIELDS = ['email', 'phone_number', 'region_number']

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="%(class)s_groups",  # 모델별로 구분된 related_name 추가
        blank=True
    )

    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="%(class)s_permissions",  # 모델별로 구분된 related_name 추가
        blank=True
    )

    class Meta:
        abstract = True  # 테이블 생성 X (상속용)


# 본사주 모델 (Headquarters)
class HeadquartersUser(BaseUser):
    company_name = models.CharField(max_length=20)  # 회사명
    license_number = models.CharField(max_length=20, unique=True)  # 사업자등록번호

    objects = UserManager()  # 개별 모델에서 UserManager 사용

    class Meta:
        indexes = [
            models.Index(fields=['id'], name='headquarters_id_idx'),
            models.Index(fields=['email'], name='headquarters_email_idx'),
            models.Index(fields=['phone_number'], name='headquarters_phone_number_idx'),
            models.Index(fields=['region_number'], name='headquarters_region_number_idx'),
        ]


# 가맹점주 모델 (Franchisee)
class FranchiseeUser(BaseUser):
    company_name = models.CharField(max_length=20, blank=False, null=False)  # 회사명
    referral_code = models.CharField(max_length=6, unique=True)  # 색인코드

    objects = UserManager()

    def save(self, *args, **kwargs):
        if not self.referral_code:
            self.referral_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        super().save(*args, **kwargs)

    class Meta:
        indexes = [
            models.Index(fields=['id'], name='franchisee_id_idx'),
            models.Index(fields=['email'], name='franchisee_email_idx'),
            models.Index(fields=['phone_number'], name='franchisee_phone_number_idx'),
            models.Index(fields=['region_number'], name='franchisee_region_number_idx'),
        ]


# 자영업자 모델 (Individual)
class IndividualUser(BaseUser):
    shop_name = models.CharField(max_length=20)  # 가게명

    objects = UserManager()

    class Meta:
        indexes = [
            models.Index(fields=['id'], name='individual_id_idx'),
            models.Index(fields=['email'], name='individual_email_idx'),
            models.Index(fields=['phone_number'], name='individual_phone_number_idx'),
            models.Index(fields=['region_number'], name='individual_region_number_idx'),
        ]


# 테스트용 매출 기록
class SalesRecord(models.Model):
    id = models.BigAutoField(primary_key=True)  # 거래 번호
    usernumber = models.BigIntegerField(db_index=True)  # 유저 ID (색인용)
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # 거래 금액
    date = models.DateField(auto_now_add=True)  # 거래 일자

    class Meta:
        indexes = [
            models.Index(fields=['usernumber'], name='sales_usernumber_idx'),
            models.Index(fields=['date'], name='sales_date_idx'),
        ]


# 전체 로드 시 사용할 모델 리스트
__all__ = ["BaseUser", "HeadquartersUser", "FranchiseeUser", "IndividualUser", "SalesRecord"]
