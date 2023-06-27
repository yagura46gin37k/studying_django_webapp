from django import forms
from .models import Order, Goods

# Orderを登録するためのフォーム
class OrderCreateForm(forms.ModelForm):
    # モデルの入力対象フィールドを設定
    class Meta:
        model = Order
        fields = ('goods', 'amount', 'ordered_by')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['goods'].disabled = True # goodsフィールドを編集不可にする
        self.fields['amount'].widget.attrs.update({'class': 'amountfield'})

    # amountが0より大きな値でない時はエラーを出す
    # バリデーション用関数はclean_[要素名]で関数定義
    def clean_amount(self):
        amount = self.cleaned_data['amount']
        if amount <= 0:
            raise forms.ValidationError('数量は1以上の整数にしてください')
        return amount

# モデルフォームセット
# フォームはGoodsのレコードの数だけ作成する
OrderCreateFormSet = forms.modelformset_factory(
    Order, form=OrderCreateForm, extra=Goods.objects.all().count()
)