from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
form .managers import UserManager

# 공통 모델 (상속용)
class BaseUser(AbstractBaseUser):
	usernumber = models.BigAutoField(primary_key=True) # 유저번호 (자동증가)
	id = models.CharField(max_length=20, unique=True) # 아이디
	password = models.CharField(max_length=128) # 비밀번호
	email = models.EmailField(unique=True, blank=False, null=False) # 이메일
	created_at = models.DateTimeField(auto_now_add=True) # 생성일
	phone_number = models.CharField(max_length=20, unique=True, blank=False, null=False) # 전화번호
	region_number = models.CharField(max_length=5) # 지역번호

	objects = UserManager()

	USERNAME_FIELD = 'id'
	REQUIRED_FIELDS = ['email', 'phone_number', 'region_number']

	class Meta:
		abstract = True # 테이블 생성 X (상속용)
		indexes = [
			models.Index(fields=['id'], name='id_idx'),
			models.Index(fields=['email'], name='email_idx'),
			models.Index(fields=['phone_number'], name='phone_number_idx'),
			models.Index(fields=['region_number'], name='region_number_idx'),
		]

# 본사주 모델 (Headquarters)
class HeadquartersUser(BaseUser):
	company_name = models.CharField(max_length=20) # 회사명
	license_number = models.CharField(max_length=20, unique=True) # 사업자등록번호

# 가맹점주 모델 (Franchisee)
class FranchiseeUser(BaseUser):
	company_name = models.CharField(max_length=20, blank=False, null=False) # 회사명
	referral_code = models.CharField(max_length=6, unique=True) # 색인코드

	def save(self, *args, **kwargs):
		if not self.referral_code:
			self.referral_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
		super().save(*args, **kwargs)

# 자영업자 모델 (Individual)
class IndividualUser(BaseUser):
	shop_name = models.CharField(max_length=20) # 가게명

# 테스트용 매출 기록
class SalesRecord(models.Model):
	id = models.BigAutoField(primary_key=True) # 거래 번호
	usernumber = models.BigIntegerField(db_index=True) # 유저 ID (색인용)
	amount = models.DecimalField(max_digits=10, decimal_places=2) # 거래 금액
	date = models.DateField(auto_now_add=True) # 거래 일자

	class Meta:
		indexes = [
			models.Index(fields=['usernumber'], name='usernumber_idx'),
			models.Index(fields=['date'], name='date_idx'),
		]