# Generated by Django 5.2 on 2025-04-11 17:44

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0004_user_favorite_champs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='favorite_champs',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, default=list, size=300),
        ),
    ]
