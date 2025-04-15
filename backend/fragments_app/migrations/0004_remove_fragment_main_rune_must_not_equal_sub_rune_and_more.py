# Generated by Django 5.2 on 2025-04-14 17:11

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fragments_app', '0003_fragment_main_rune_must_not_equal_sub_rune'),
        ('stats_app', '0009_remove_champion_champion_loading_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='fragment',
            name='main_rune_must_not_equal_sub_rune',
        ),
        migrations.AddConstraint(
            model_name='fragment',
            constraint=models.CheckConstraint(condition=models.Q(('main_rune', models.F('sub_rune')), _negated=True), name='Main rune and Sub rune must be different'),
        ),
    ]
