from ninja import ModelSchema, Schema

from .models import User

# 본사 가입용
class HeadquartersRegisterRequest(Schema):
	id: str
	password: str
	email: str
	phone_number: str
	region_number: str
	company_name: str
	license_number: str

# 가맹점 가입용
class FranchiseeRegisterRequest(Schema):
	id: str
	password: str
	email: str
	phone_number: str
	region_number: str
	company_name: str

# 자영업자 가입용
class IndividualRegisterRequest(Schema):
	id: str
	password: str
	email: str
	phone_number: str
	region_number: str
	shop_name: str

# 매출 등록 테스트
class SalesRecordRequest(Schema):
	amount: float
	usernumber: int