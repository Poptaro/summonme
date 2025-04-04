from django.db import models
from django.core import validators as v
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
  ######NOT CHANGEABLE DIRECTLY BY USER######
  puuid = models.CharField(max_length=255, null=True, blank=True, validators=[v.MaxLengthValidator(78)], default=None)
  account_id = models.CharField(max_length=255, null=True, blank=True, validators=[v.MaxLengthValidator(56)], default=None)

  icon = models.CharField(max_length=255, null=True, blank=True, default=None)

  ######CHANGEABLE DIRECTLY BY USER TO FIND ABOVE######
  game_name = models.CharField(max_length=255, null=True, blank=True, default=None, validators=[v.MaxLengthValidator(16)])
  tag_line = models.CharField(max_length=255, null=True, blank=True, default=None, validators=[v.MinLengthValidator(3), v.MaxLengthValidator(5)])



  REQUIRED_FIELDS = []

  def __str__(self):
    return(f"{self.id} - {self.game_name if self.game_name else "NOGAMENAME"}#{self.tag_line if self.tag_line else "NOTAG"} | Django Username: {self.username} | PUUID:{self.puuid if self.puuid else 'No PUUID'}")
