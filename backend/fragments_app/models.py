from django.contrib.postgres.fields import ArrayField
from django.core.exceptions import ValidationError
from django.db.models import Q, F, CheckConstraint
from django.db import models

from user_app.models import User
from stats_app.models import DDragon



class Item(models.Model):
  item_id = models.BigIntegerField()
  item_name = models.CharField(max_length=255)
  item_icon = models.CharField(max_length=255)

  def __str__(self):
    return f"{self.item_id}. {self.item_name}"


class Rune(models.Model):
  rune_id = models.BigIntegerField(unique=True)
  rune_name = models.CharField(max_length=255, unique=True)
  rune_icon = models.CharField(max_length=255, unique=True)

  def __str__(self):
    return f"{self.rune_name}"

class Fragment(models.Model):

  fragment_description = models.TextField(default=None, null=True, blank=True)

  items = ArrayField(
    base_field=models.IntegerField(),
    size=300,
    default=list,
    max_length=6,
    blank=True,
  )
  # If values are None, rainbow rune(pic of all 5?)
  main_rune = models.ForeignKey(Rune, on_delete=models.SET_NULL, default=None, null=True, blank=True, related_name="main_rune")
  sub_rune = models.ForeignKey(Rune, on_delete=models.SET_NULL, default=None, null=True, blank=True, related_name="sub_rune")
  champion = models.ForeignKey(DDragon, on_delete=models.PROTECT)

  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="fragment")

  def clean(self):
    if len(self.items) > 6:
        raise ValidationError("You can only include up to 6 items.")
    if len(self.items) != len(set(self.items)):
        raise ValidationError("Duplicate items are not allowed.")

  class Meta:
          constraints = [
              CheckConstraint(
                  check=~Q(main_rune=F('sub_rune')),
                  name='Main rune and Sub rune must be different'
              )
          ]
  def __str__(self):
    return f"{self.id}. {self.champion.champion_name} fragment"


