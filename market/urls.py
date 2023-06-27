from django.urls import path
from . import views

app_name = 'market'

urlpatterns = [
    # path('order_new', views.OrderCreateView.as_view(), name='order_new'),
    path('order_list', views.OrderListView.as_view(), name='order_list'),
    path('goods_list', views.GoodsListView.as_view(), name='goods_list'),
    path('ordered_list/<str:ordered_by>', views.OrderedListView.as_view(), name='ordered_list'),
    path('order_formset', views.add_order, name='order_formset'),
]