from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
  tag_line = serializers.CharField(min_length=3, max_length=5)
  puuid = serializers.CharField(max_length=78)
  account_id = serializers.CharField(max_length=56)
  game_name = serializers.CharField(min_length=3, max_length=16)
  class Meta:
    model = User
    # fields = '__all__'
    fields = ["id", "username", "puuid", "account_id", "icon", "game_name", "tag_line"]