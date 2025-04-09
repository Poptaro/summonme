from django.contrib import admin
from .models import Champion, DDragon

# Register your models here.
admin.site.register([Champion, DDragon])