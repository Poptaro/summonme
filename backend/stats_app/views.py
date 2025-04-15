from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status as s

import requests

from .models import Champion, DDragon
from .serializers import ChampionSerializer, DDragonSerializer
from user_app.serializers import UserSerializer

from dotenv import dotenv_values
config = dotenv_values(".env")
RIOT_API_KEY = config.get("RIOT_API_KEY")

# User Specific
# /stats/riot/
class Riot_User_Champions(APIView):

  # Get all information from the put method below
  def get(self, request):
    user = request.user
    users_champs = Champion.objects.filter(user=user).all()
    users_champs_ser = ChampionSerializer(users_champs, many=True).data
    return Response(users_champs_ser)


  # Update all champions mastery and level via riot api
  # Press button on frontend to refresh champs
  def put(self, request):
    user = request.user
    token = Token.objects.get(user=user)

    #Delete every champ pertaining this user
    all_user_champs = Champion.objects.filter(user=user).all()
    all_user_champs.delete()

    try:
      r = requests.get(
        f"https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${user.puuid}", 
        headers={
          "X-Riot-Token": RIOT_API_KEY
        }
      ).json()

      dd = requests.get(
        f"http://localhost:8000/stats/ddragon/",
        headers={"Authorization": f"Token {token}"}
      ).json()


      # print(dd)
      # return 
      # Has every single champ
      dict = {}
      for champ in dd:
        dict[champ.get("champion_id")] = champ
# dict 
# 143: {
#   'id': 344, 
#   'champion_id': 143, 
#   'champion_name': 'Zyra', 
#   'champion_title': 'Rise of the Thorns', 
#   'champion_splash': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zyra_0.jpg',
#   'champion_square': 'https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/Zyra.png'
# }
      
      # r only has played champs
      for champ in r:
        full = {
          "champion_id": champ.get("championId"), 
          "champion_level": champ.get("championLevel"), 
          "champion_points": champ.get("championPoints"),
          "ddragon": DDragon.objects.get(champion_id=champ.get("championId")),
          "user": user,
        }
      
        Champion.objects.create(**full)
        # Remove the freshly created champion from the dict array
        del dict[champ.get("championId")]
      # Create new Champion models for non played champions
      # print(dict)
      for key, champ in dict.items():
        unplayed_champ_full = {
          "champion_id": champ.get("champion_id"),
          "ddragon": DDragon.objects.get(champion_id=champ.get("champion_id")),
          "user": user
        }
        
        print(unplayed_champ_full)
        Champion.objects.create(**unplayed_champ_full)
      # print(dict)
      return Response("Sucessfully ciphered ddragon and authorized user's champions", status=s.HTTP_201_CREATED)
    except:
      return Response("Failed to cipher ddragon and authorized user's champions", status=s.HTTP_400_BAD_REQUEST)

  # Update user's favs per react click
  def patch(self, request):
    user = request.user
    user_ser = UserSerializer(instance=user, data=request.data, partial=True)
    if user_ser.is_valid():
      user_ser.save()
      return Response(user_ser.data, status=s.HTTP_202_ACCEPTED)
    else:
      return Response("Failed to update user's favorite champs", status=s.HTTP_400_BAD_REQUEST)


# Not tied to speicfic users. This is for ddragon champion only data stuff
# Only delete and post when a new champion updates
# 15.7.1
# stats/ddragon/
class DDragon_View(APIView):
  permission_classes = [AllowAny]

  # Retrieve all ddragon information(Champion data NOT USER TIRED)
  def get(self, request):
    ddragons = DDragon.objects.all()
    ddragons_ser = DDragonSerializer(ddragons, many=True).data
    return Response(ddragons_ser, status=s.HTTP_200_OK)


  # Populate DDragon Model
  def post(self, request):
    r = requests.get(
      f"https://ddragon.leagueoflegends.com/cdn/15.7.1/data/en_US/champion.json"
    ).json()
    r = r.get("data")
    try:
      for key, value in r.items():
        ddragon = DDragon.objects.create(
          champion_id = value.get("key"),
          # key is the name for the web and images
          champion_key = value.get("id"),
          champion_name = value.get("name"),
          champion_title = value.get("title"),
          champion_splash = f"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{value.get("id")}_0.jpg",
          champion_square = f"https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/{value.get("id")}.png",
          champion_loading = f"https://ddragon.leagueoflegends.com/cdn/img/champion/loading/{value.get("id")}_0.jpg"
        )
        ddragon.full_clean()
        ddragon.save()
      return Response("Successfully pouplated DDragon Model", status=s.HTTP_201_CREATED)
    except:
      return Response("Failed to populate DDragon", status=s.HTTP_418_IM_A_TEAPOT)


  # Delete all champs in the DDragon model 
  # Situations of new model migration or new champ release
  def delete(self, request):
    ddragons = DDragon.objects.all()
    ddragons.delete()
    return Response("Deleted all DDragon Data", status=s.HTTP_204_NO_CONTENT)
    
    