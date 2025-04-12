from django.db import models
from user_app.models import User



class Rune(models.Model):
  rune_name = models.CharField(max_length=255)
  rune_icon = models.CharField(max_length=255)

class Fragment(models.Model):
  champion_id = models.IntegerField()
  champion_name = models.CharField(max_length=255)
  champion_square = models.CharField(max_length=255)
  fragment_description = models.TextField()

  # If values are None, rainbow rune(pic of all 5?)
  main_rune_name = models.CharField(max_length=255, default=None)
  sub_rune_name = models.CharField(max_length=255, default=None)


  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="fragment")



