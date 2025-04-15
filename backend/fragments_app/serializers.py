from rest_framework import serializers

from .models import Rune, Fragment


class RuneSerializer(serializers.ModelSerializer):

  class Meta:
    model = Rune
    fields = "__all__"

class FragmentSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Fragment
    fields = "__all__"