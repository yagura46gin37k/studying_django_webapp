function setName(mode){
    let name = document.getElementById('order_name');
    // for文でinput要素をすべて取得し、nameを設定する
    if(mode == 0) {
        for(i = 0; i < formset_count; i++){
            document.getElementById('id_form-'+ i + '-ordered_by').value = name.value;
        }
    } else if(mode == 1) {
        //注文数が入力済みの箇所だけnameを設定する
        for(i = 0; i < formset_count; i++){
            if(document.getElementById('id_form-' + i + '-amount').value != '') {
                document.getElementById('id_form-'+ i + '-ordered_by').value = name.value;
            }
        }
    }
}