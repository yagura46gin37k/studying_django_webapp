# Generated by Django 4.2.1 on 2023-06-13 05:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0003_order_order_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='order_id',
        ),
    ]
