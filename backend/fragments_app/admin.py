from django.contrib import admin
from .models import Rune, Item, Fragment

# Register your models here.
admin.site.register([Rune, Item, Fragment])