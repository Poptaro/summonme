from django.shortcuts import get_object_or_404, get_list_or_404

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status as s

import requests

from .serializers import UserSerializer
from .models import User

from dotenv import dotenv_values
config = dotenv_values(".env")

RIOT_API_KEY = config.get("RIOT_API_KEY")

# REQUIRES AUTH/TOKEN VIA summonme.settings

# Gets a single user .model User information
# user/
class Single_User(APIView):

  def get(self, request):
    user_id = request.user.id
    user = UserSerializer(get_object_or_404(User, id=user_id)).data
    # print(user)
    return Response(user, status=s.HTTP_200_OK)


  #Update user information
  def put(self, request):
    user_id = request.user.id
    token = Token.objects.get(user=request.user)
    user = get_object_or_404(User, id=user_id)
    # Changes to game_name and tag_line require a new PUUID and Icon attribute
    payload = request.data

    r = requests.get(
      f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{payload.get("game_name")}/{payload.get("tag_line")}", 
      headers={
        "X-Riot-Token": RIOT_API_KEY
      }
    )

    # Response for frontend
    if(r.status_code != 200):
      return Response(f"Failed to update account with game_name: {payload.get("game_name")} | tag_line: {payload.get("tag_line")}", status=s.HTTP_404_NOT_FOUND)
    
    payload["puuid"] = r.json().get("puuid")

    r2 = requests.get(
      f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{payload["puuid"]}", 
      headers={
        "X-Riot-Token": RIOT_API_KEY
      }
    ).json()
    payload["account_id"] = r2.get("accountId")
    payload["icon"] = f"https://ddragon.leagueoflegends.com/cdn/15.7.1/img/profileicon/{r2.get("profileIconId")}.png"

    user_ser = UserSerializer(user,  data=payload, partial=True)
    if user_ser.is_valid():
      user_ser.save()

      # Recall /stats/riot/ @PUT to refresh the new users champions mastery stats page
      r = requests.put(
        f"http://localhost:8000/stats/riot/",
        headers={
          "Authorization": f"Token {token}"
        }
      )
      print(r)

      return Response(user_ser.data, status=s.HTTP_200_OK)
    return Response(user_ser.errors, status=s.HTTP_400_BAD_REQUEST)
    

  #Delete user
  def delete(self, request):
    user = request.user
    user = User.objects.get(id=user.id)
    user.delete()
    return Response("User deleted", status=s.HTTP_204_NO_CONTENT)