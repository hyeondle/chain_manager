from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from accounts.models import FranchiseeUser, HeadquartersUser, IndividualUser

class MultiUserModelBackend(BaseBackend):
    # 3가지 유저 모델을 모두 지원하는 커스텀 모델 백엔드

    def authenticate(self, request, id=None, password=None, **kwargs):
        """
        사용자가 로그인할 때 호출됨. id와 password를 받아서 일치하는 유저를 찾는다.
        """
        user_models = [FranchiseeUser, HeadquartersUser, IndividualUser]
        
        for model in user_models:
            try:
                user = model.objects.get(id=id)  # id 필드로 유저 찾기
                if check_password(password, user.password):  # 비밀번호 검증
                    return user  # 성공하면 유저 객체 반환
            except model.DoesNotExist:
                continue  # 해당 모델에 유저가 없으면 다음 모델 검사
        
        return None  # 일치하는 유저가 없으면 None 반환

    def get_user(self, user_id):
        """
        ID로 유저를 가져오는 함수
        """
        for model in [FranchiseeUser, HeadquartersUser, IndividualUser]:
            try:
                return model.objects.get(pk=user_id)
            except model.DoesNotExist:
                continue
        return None
