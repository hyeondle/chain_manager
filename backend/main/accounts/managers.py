import string
import random
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def generate_referral_code(self):
        """6자리 랜덤 참조(추천) 코드 생성"""
        while True:
            referral_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            if not self.model.objects.filter(referral_code=referral_code).exists():  # ✅ self.model 사용
                return referral_code

    def create_user(self, id, password, **extra_fields):
        """공통 유저 생성 (상속용)"""
        if not id:
            raise ValueError("The ID must be set")
        user = self.model(id=id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_franchisee_user(self, id, password, **kwargs):
        """가맹점주 회원 생성"""
        kwargs["referral_code"] = self.generate_referral_code()
        return self.create_user(id=id, password=password, **kwargs)

    def create_individual_user(self, id, password, **kwargs):
        """자영업자 회원 생성"""
        return self.create_user(id=id, password=password, **kwargs)

    def create_headquarters_user(self, id, password, **kwargs):
        """본사 회원 생성"""
        return self.create_user(id=id, password=password, **kwargs)
