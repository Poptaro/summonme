from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', Sign_Up.as_view(), name="sign_up"),
    path('login/', Log_In.as_view(), name="log_in"),
    path('current/', Current_Auth.as_view(), name="current"),
    path('logout/', Log_Out.as_view(), name="log_out"),
    
]
