from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status as s

from django.contrib.auth import authenticate
from django.http import JsonResponse
from user_app.serializers import UserSerializer
from user_app.models import User

# auth/signup/
class Sign_Up(APIView):
  
  #Does not need a token to log in as global settings require tokens to use auth and user views
  permission_classes = [AllowAny]
  
  def post(self, request):
    #REQUIRED by JSONBody#
    #username
    #password
    user = User.objects.create_user(**request.data)
    token = Token.objects.create(user=user)
    return Response(
      {
        "token": token.key,
        "user": user.username,
      },
      status=s.HTTP_201_CREATED
    )
  
# auth/login/
class Log_In(APIView):

  #Does not need a token to log in as global settings require tokens to use auth and user views
  permission_classes = [AllowAny]

  def post(self, request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user:
      token, created = Token.objects.get_or_create(user=user)
      return Response(
        {
          "token": token.key, 
          "user": user.username,
        },
        status=s.HTTP_200_OK)
    else:
      return Response("No User Found for Log_In", status=s.HTTP_418_IM_A_TEAPOT)
    
# auth/current/
class Current_Auth(APIView):
  def get(self, request):
    current_user_id = request.user.id
    user = User.objects.get(id=current_user_id)
    username = user.username
    user_instance_id = user.id
    token, created = Token.objects.get_or_create(user=user)
    if not token:
      return Response("No user currently authorized", status=s.HTTP_418_IM_A_TEAPOT)
    return Response({
      "token": token.key,
      "username": username,
      "user_instance_id": user_instance_id,
      }, status=s.HTTP_200_OK)
  
# auth/logout/
class Log_Out(APIView):

  def post(self, request):
    request.user.auth_token.delete()
    return Response("Current user logged out", status=s.HTTP_204_NO_CONTENT)