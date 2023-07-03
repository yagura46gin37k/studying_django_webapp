from django.db import models

# Create your models here.
from django.utils import timezone

# 商品を表すモデル
class Goods(models.Model):
    name = models.CharField(
        verbose_name='商品名',
        max_length=200
    )
    price = models.IntegerField(
        verbose_name='単価'
    )
    description = models.TextField(
        verbose_name='説明',
        max_length=500
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = ('商品')
        verbose_name_plural = ('商品')

# 注文を表すモデル
class Order(models.Model):
    date = models.DateTimeField(
        verbose_name='注文日時',
        auto_now=True
    )
    goods = models.ForeignKey(
        'Goods',
        verbose_name='注文商品',
        on_delete=models.CASCADE
    )
    amount = models.IntegerField(
        verbose_name='注文数'
    )
    
    ordered_by = models.CharField(
        verbose_name='注文者',
        max_length=50
    )

    def __str__(self):
        return str(self.ordered_by) + ': ' + str(self.goods) + '*' + str(self.amount)
    
    class Meta:
        verbose_name = ('注文')
        verbose_name_plural = ('注文')
