from django import template

register = template.Library()

# 掛け算を行うタグを作成
# デコレータにより、multiply関数はregister.filterに引数として渡される
@register.filter
def multiply(v1, v2):
    return v1 * v2