# Generated by Django 5.2 on 2025-04-15 01:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fragments_app', '0004_remove_fragment_main_rune_must_not_equal_sub_rune_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rune',
            name='rune_icon',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='rune',
            name='rune_id',
            field=models.BigIntegerField(unique=True),
        ),
        migrations.AlterField(
            model_name='rune',
            name='rune_name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
