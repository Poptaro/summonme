# Generated by Django 5.2 on 2025-04-08 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stats_app', '0003_alter_ddragon_unique_together_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ddragon',
            name='champion_id',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
