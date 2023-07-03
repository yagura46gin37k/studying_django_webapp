from typing import Any, Dict
from django.shortcuts import render

# Create your views here.
from django.views import generic
from django.shortcuts import render, redirect
from .models import Goods, Order
from .forms import OrderCreateFormSet

# Orderを複数登録するための関数ビュー
def add_order(request):
    # 新規登録用のformだけを用意する(queryset=Order.objects.none())
    formset = OrderCreateFormSet(
        request.POST or None,
        queryset=Order.objects.none(),
        initial=[{'goods': g} for g in Goods.objects.all()],
    )
    
    # 送信ボタンが押された際の処理
    if request.method == 'POST' and formset.is_valid():
        formset.save()
        return redirect('market:order_list')
    
    # テンプレートに渡すコンテキストを設定
    # 二つのイテラブルを同じインデックスで参照したいのでzipする
    context = {
        'formset': formset, # フォームの個数を|lengthで把握するため
        'obj_list': zip(formset, Goods.objects.all()),
    }

    return render(request, 'market/order_formset.html', context)
 
# 注文一覧ビュー
class OrderListView(generic.ListView):
    template_name = 'market/order_list.html'
    # Orderモデルのうち、注文者だけを取り出し、重複を削除し、テンプレートに渡す
    queryset = Order.objects.values('ordered_by').order_by('ordered_by').distinct()

# 商品一覧ビュー
class GoodsListView(generic.ListView):
    template_name = 'market/goods_list.html'
    model = Goods

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Orderモデルを(イテレータとして)すべて取得し、order_listとしてテンプレートに渡す
        order_obj = Order.objects.all()
        context['order_list'] = order_obj
        return context

# 注文詳細ビュー
class OrderedListView(generic.ListView):
    template_name = 'market/ordered_list.html'
    # model = Order
    context_object_name = 'order_list'

    # urlから受け取ったパラメータを使ってOrderをフィルタリング
    def get_queryset(self):
        param = self.kwargs['ordered_by']
        return Order.objects.filter(ordered_by=param)

    # urlから受け取ったパラメータ（注文者の名前）をコンテキストに追加
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['ordered'] = self.kwargs['ordered_by']
        return context

# いろいろ試すためのビュー
class TestView(generic.TemplateView):
    template_name = 'market/testpage.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        goods_obj = Goods.objects.all()
        ctx['goods_list'] = goods_obj
        return ctx
    