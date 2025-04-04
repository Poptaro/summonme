from django.urls import path
from .views import Single_User

urlpatterns = [
    path('<int:id>/', Single_User.as_view(), name='user')
]
