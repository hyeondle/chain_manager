from ninja import NinjaAPI

from accounts.apis import account_api

api = NinjaAPI()

api.add_router("/accounts", account_api)