import string
import random

from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
	def generate_referral_code(self):
		# 6자리 랜덤 문자열 생성
		while True:
			referral_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
			if not FranchiseeUser.objects.filter(referral_code=referral_code).exists():
				return referral_code

	def create_franchisee_user(self, **kwargs):
		# 가맹점주 회원 생성
		kwargs["referral_code"] = self.generate_referral_code()
		return FranchiseeUser.objects.create_user(**kwargs)

	def create_individual_user(self, **kwargs):
		# 자영업자 회원 생성
		return IndividualUser.objects.create_user(**kwargs)

	def create_headquarters_user(self, **kwargs):
		# 본사 회원 생성
		return HeadquartersUser.objects.create_user(**kwargs)