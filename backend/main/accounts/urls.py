from ninja import NinjaAPI
from accounts.apis import account_api

api = NinjaAPI()
api.add_router("/account/", account_api)

urlpatterns = [
    path("api/", api.urls),
]
