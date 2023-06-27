from django.contrib import admin

# Register your models here.
from .models import Goods, Order

admin.site.register([Goods, Order])