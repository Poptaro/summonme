from django.shortcuts import get_object_or_404, get_list_or_404

# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status as s

from .serializers import UserSerializer
from .models import User

from dotenv import dotenv_values
config = dotenv_values(".env")

RIOT_API_KEY = config.get("RIOT_API_KEY")

#REQUIRES AUTH/TOKEN VIA summonme.settings

#Gets a single user .model User information
class Single_User(APIView):


  def get(self, request, id):
    if request.user.id != id:
      return Response({"Auth error: You cannot view other profiles"}, status=s.HTTP_418_IM_A_TEAPOT)
    user = UserSerializer(get_object_or_404(User, id=id)).data
    return Response(user, status=s.HTTP_200_OK)


  #Update user information
  def put(self, request, id):
    if request.user.id != id:
      return Response({"Auth error: You cannot view other profiles"}, status=s.HTTP_418_IM_A_TEAPOT)
    user = get_object_or_404(User, id=id)
    user_ser = UserSerializer(user,  data=request.data, partial=True)
    if user_ser.is_valid():
      user_ser.save()
      return Response(user_ser.data)
    return Response(user_ser.errors)
    

  #Delete user
  def delete(self, request, id):
    pass