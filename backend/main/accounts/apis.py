from ninja import Router
from django.db import IntegrityError
from accounts.models import FranchiseeUser, IndividualUser, HeadquartersUser, SalesRecord
from accounts.schemas import (
    FranchiseeRegisterRequest,
    IndividualRegisterRequest,
    HeadquartersRegisterRequest,
    SalesRecordRequest
)

account_api = Router(tags=["account"])

# 본사주 회원가입 API
@account_api.post("/register/headquarters/", response={201: str, 400: str})
def register_headquarters(request, payload: HeadquartersRegisterRequest):
    try:
        user = HeadquartersUser.objects.create_user(**payload.dict())
        return 201, "Headquarters user created successfully"
    except IntegrityError:
        return 400, "User registration failed"

# 체인점주 회원가입 API
@account_api.post("/register/franchisee/", response={201: str, 400: str})
def register_franchisee(request, payload: FranchiseeRegisterRequest):
    try:
        user = FranchiseeUser.objects.create_user(**payload.dict())
        return 201, "Franchisee user created successfully"
    except IntegrityError:
        return 400, "User registration failed"

# 자영업자 회원가입 API
@account_api.post("/register/individual/", response={201: str, 400: str})
def register_individual(request, payload: IndividualRegisterRequest):
    try:
        user = IndividualUser.objects.create_user(**payload.dict())
        return 201, "Individual user created successfully"
    except IntegrityError:
        return 400, "User registration failed"

# 매출 기록 API (테스트용)
@account_api.post("/sales/record/", response={201: str, 400: str})
def record_sales(request, payload: SalesRecordRequest):
    try:
        SalesRecord.objects.create(**payload.dict())
        return 201, "Sales record created successfully"
    except IntegrityError:
        return 400, "Failed to create sales record"
