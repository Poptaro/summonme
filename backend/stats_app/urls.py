from django.urls import path
from .views import Riot_User_Champions, DDragon_View

urlpatterns = [
    path('riot/', Riot_User_Champions.as_view(), name='riot_user_champions'),
    path('ddragon/', DDragon_View.as_view(), name='ddragon_view')
]
