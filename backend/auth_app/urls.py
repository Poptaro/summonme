from django.urls import path
from .views import *

urlpatterns = [
    path('sign_up/', Sign_Up.as_view(), name="sign_up"),
    path('log_in/', Log_In.as_view(), name="log_in"),
    path('log_out/', Log_Out.as_view(), name="log_out"),
]
