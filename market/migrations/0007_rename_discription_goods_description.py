# Generated by Django 4.2.1 on 2023-06-26 04:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0006_goods_discription'),
    ]

    operations = [
        migrations.RenameField(
            model_name='goods',
            old_name='discription',
            new_name='description',
        ),
    ]
