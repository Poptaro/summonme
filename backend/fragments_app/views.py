from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status as s
from django.shortcuts import get_object_or_404, get_list_or_404


import requests

from .models import Rune, Item, Fragment
from .serializers import RuneSerializer, FragmentSerializer, ItemSerializer

from stats_app.models import DDragon

# https://ddragon.leagueoflegends.com/cdn/img/{LINK TO IMG FOR RUNES}
# fragments/
# fragments/champion_id/
class Fragment_View(APIView):
  # Requires champion's Web Name
  def get(self, request, champion_key=None, fragment_id=None):
    user = request.user
    try:
      if fragment_id:
        fragment = get_object_or_404(Fragment, id=fragment_id)
        fragment_ser = FragmentSerializer(fragment).data
        return Response(fragment_ser, status=s.HTTP_200_OK)
      if champion_key:
        fragments = Fragment.objects.filter(user=user, champion=DDragon.objects.get(champion_key__iexact=champion_key))
        fragments_ser = FragmentSerializer(fragments, many=True).data
        return Response(fragments_ser, status=s.HTTP_200_OK)
    except:
      return Response("Failed to retrive fragment or fragments", status=s.HTTP_403_FORBIDDEN)


  def post(self, request):
    # champion -> DDRAGON FOREIGN KEY via CHAMPION_KEY
    # items = ArrayField(
    #   base_field=models.IntegerField(),
    #   size=300,
    #   default=list,
    #   blank=True
    # )**[1,2,3,4,5,6]
    # main_rune ** name -> FOREIGN KEY
    # sub_rune ** name -> FOREIGN KEY
    # user ** (from request.user) -> FOREIGN KEY

    # payload should have the above from the frontend
    payload = request.data
    try:
      frag_payload = {
        "user": request.user,
        "champion": get_object_or_404(DDragon, champion_key=payload.get("champion_key")),
        "items": payload.get("items") or [],
        "main_rune": get_object_or_404(Rune, rune_id=payload.get("main_rune")),
        "sub_rune": get_object_or_404(Rune, rune_id=payload.get("sub_rune")),
        "fragment_description": payload.get("fragment_description"),
      }
      fragment = Fragment.objects.create(**frag_payload)
      fragment_ser = FragmentSerializer(fragment).data
      return Response(fragment_ser, status=s.HTTP_201_CREATED)
    except:
      return Response("Failed to create Fragment", status=s.HTTP_400_BAD_REQUEST)
  
  # Serializer partial update
  def put(self, request):
    # fragment_id **ID OF FRAGMENT TO CHANGE
    # champion -> DDRAGON FOREIGN KEY via CHAMPION_KEY
    # items = ArrayField(
    #   base_field=models.IntegerField(),
    #   size=300,
    #   default=list,
    #   blank=True
    # )**[1,2,3,4,5,6]
    # main_rune ** name -> FOREIGN KEY
    # sub_rune ** name -> FOREIGN KEY
    # user ** (from request.user) -> FOREIGN KEY

    # payload should have the above from the frontend
    payload = request.data
    try:
      fragment = get_object_or_404(Fragment, id=payload.get("fragment_id"))

      items = payload.get("items") or []
      main_rune = Rune.objects.filter(id=payload.get("main_rune")).first() or None
      sub_rune = Rune.objects.filter(id=payload.get("sub_rune")).first() or None
      fragment_description = payload.get("fragment_description") or None


      fragment.items = items
      fragment.main_rune = main_rune
      fragment.sub_rune = sub_rune
      fragment.fragment_description = fragment_description

      fragment.full_clean()
      fragment.save()
      return Response("Successfully saved fragment edit.", status=s.HTTP_200_OK)
    except:
      return Response("Failed to save fragment edit.(Except Block)", status=s.HTTP_400_BAD_REQUEST)


    

  # Requires the fragments DB ID
  def delete(self, request):
    fragment_id = request.data.get("fragment_id")
    try:
      fragment = get_object_or_404(Fragment, id=fragment_id)
      fragment.delete()
      return Response(f"Fragment Sucessfully deleted of ID: {fragment_id}", status=s.HTTP_204_NO_CONTENT)
    except:
      return Response(f"Failed to delete fragment of ID: {fragment_id}", status=s.HTTP_404_NOT_FOUND)


# fragments/rune/
# fragments/rune/rune_name/
class Rune_View(APIView):
  
  permission_classes = [AllowAny]

  # Get a singular Rune by its rune_name or all if rune_name is not provided
  def get(self, request, rune_name=None):
    if not rune_name:
      try:
        rune_ser = Rune.objects.all()
        runes_ser = RuneSerializer(rune_ser, many=True).data
        return Response(runes_ser, status=s.HTTP_200_OK)
      except:
        return Response(f"Failed to retrieve ALL rune_ser", status=s.HTTP_404_NOT_FOUND)
      
    try:
      rune = get_object_or_404(Rune, rune_name__iexact=rune_name)
      rune_ser = RuneSerializer(rune).data
      return Response(rune_ser, status=s.HTTP_200_OK)
    except:
      return Response(f"Failed to retrieve item of id: {id}", status=s.HTTP_404_NOT_FOUND)

  # Create all runes at once
  # Run only if new runes
  # Precision, Domination, Sorcery, Resolve, Inspiration

  def post(self, request):
    version = "15.7.1"
    try:
      r = requests.get(
        f"https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/runesReforged.json"
      ).json()
      for rune in r:
        full = {
          "rune_id": rune.get("id"),
          "rune_name": rune.get("name"),
          "rune_icon": f"https://ddragon.leagueoflegends.com/cdn/img/{rune.get("icon")}",
        }
        Rune.objects.create(**full)
      return Response(f"Successfully created {version} Runes for league", status=s.HTTP_201_CREATED)
    except:
      return Response("Failed to create Runes", status=s.HTTP_400_BAD_REQUEST)
    


  # Delete all Runes
  def delete(self, request):
    runes = Rune.objects.all()
    runes.delete()
    return Response("Deleted all Runes", status=s.HTTP_204_NO_CONTENT)
  



class Item_View(APIView):

  permission_classes = [AllowAny]

  def get(self, request, id=None):
    if not id:
      try:
        items = Item.objects.all()
        items_ser = ItemSerializer(items, many=True).data
        return Response(items_ser, status=s.HTTP_200_OK)
      except:
        return Response(f"Failed to retrieve ALL items", status=s.HTTP_404_NOT_FOUND)
      
    try:
      item = get_object_or_404(Item, item_id=id)
      item_ser = ItemSerializer(item).data
      return Response(item_ser, status=s.HTTP_200_OK)
    except:
      return Response(f"Failed to retrieve item of id: {id}", status=s.HTTP_404_NOT_FOUND)

  # Create
  def post(self, request):
    version = "15.7.1"
    try:
      r = requests.get(
        f"https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/item.json"
      ).json().get("data")
      
      filtered = [
        (key, value) for key, value in r.items()
        if value.get("maps", {}).get("11") and value.get("gold", {}).get("purchasable")
      ]
      for item in filtered:
        full = {
          "item_id": item[0],
          "item_name": item[1].get("name"),
          "item_icon": f"https://ddragon.leagueoflegends.com/cdn/{version}/img/item/{item[0]}.png",
        }
        Item.objects.create(**full)
      return Response("Items successfully created for SR only", status=s.HTTP_201_CREATED)
    except:
      return Response("Failed to create Items")
    
  # Delete all items in db
  def delete(self, request):
    items = Item.objects.all()
    items.delete()
    return Response("Deleted all items from db", status=s.HTTP_204_NO_CONTENT)