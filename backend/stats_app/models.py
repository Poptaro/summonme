from django.db import models
from user_app.models import User

# Create your models here.
class DDragon(models.Model):
  champion_id = models.IntegerField(unique=True)
  champion_name = models.CharField(max_length=255, unique=True)
  champion_title = models.CharField(max_length=255)
  champion_splash = models.CharField(max_length=255)
  champion_square = models.CharField(max_length=255)

  def __str__(self):
    return f"{self.champion_id}. {self.champion_name}"

class Champion(models.Model):
  champion_id = models.IntegerField()
  champion_level = models.IntegerField(default=0)
  champion_points = models.BigIntegerField(default=0)
  
  champion_name = models.CharField(max_length=255, unique=True)
  champion_title = models.CharField(max_length=255)
  champion_splash = models.CharField(max_length=255)
  champion_square = models.CharField(max_length=255)

  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="champion")

  class Meta:
    unique_together = ("champion_id", "user")

