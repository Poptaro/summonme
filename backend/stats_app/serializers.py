from rest_framework import serializers

from .models import Champion, DDragon

class DDragonSerializer(serializers.ModelSerializer):
   
  class Meta:
    model = DDragon
    fields = "__all__"

class ChampionSerializer(serializers.ModelSerializer):
  ddragon = DDragonSerializer()
  class Meta:
    model = Champion
    fields = "__all__"
