# Generated by Django 5.2 on 2025-04-14 18:14

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stats_app', '0009_remove_champion_champion_loading_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='champion',
            unique_together={('ddragon', 'user')},
        ),
    ]
