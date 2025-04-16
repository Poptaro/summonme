from rest_framework import serializers

from .models import Fragment, Rune, Item

class ItemSerializer(serializers.ModelSerializer):

  class Meta:
    model = Item
    fields = "__all__"

class RuneSerializer(serializers.ModelSerializer):

  class Meta:
    model = Rune
    fields = "__all__"

class FragmentSerializer(serializers.ModelSerializer):
  main_rune = RuneSerializer()
  sub_rune = RuneSerializer()
  items = serializers.SerializerMethodField()

  class Meta:
    model = Fragment
    fields = "__all__"

  def get_items(self, obj):
    items = Item.objects.filter(item_id__in=obj.items)
    return ItemSerializer(items, many=True).data