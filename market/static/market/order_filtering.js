//POST送信を行うためのCSRFトークン処理
const getCookie = name => {
    if(document.cookie && document.cookie != '') {
        for(const cookie of document.cookie.split(';')) {
            const [key, value] = cookie.trim().split('=')
            if(key === name) {
                return decodeURIComponent(value);
            }
        }
    }
};
const csrftoken = getCookie('csrftoken');

const goods_list = document.getElementById('goods_select');

goods_list.addEventListener('change', e => {
    //選択された文字列を取得
    const goods_name = goods_list[goods_list.selectedIndex].text;
    console.log('selected: ' + goods_name);

    //選ばれたgoods以外の行を非表示にする
    const table = document.getElementById('order_table');
    //「すべて」を選んだ場合は全行を表示
    if(goods_name == 'すべて') {
        for(let i = 1; i < table.rows.length; i++) {
            table.rows[i].style.display = 'table-row';
        }
    //それ以外を選んだ場合は先頭行と選んだgoodsの行を表示し、ほかを非表示に
    } else {
        for(let i = 1; i < table.rows.length; i++) {
            if(table.rows[i].cells[0].innerText == goods_name){
                table.rows[i].style.display = 'table-row';
            } else {
                table.rows[i].style.display = 'none';
            }
        }
    }

    //わざわざDBにアクセスする必要が無かった　無念
    /*
    //そのidを取得
    const selected_goods_id = goods_list[selected_goods_index].id;
    //fetchでidをもとに絞り込んだデータを取得し、表を書き換える
    const url = location.href;
    fetch(url, {
        method: 'POST',
        body: `goods_id=${selected_goods_id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'X-CSRFToken': csrftoken,
        },
    }).then(response => {
        return response.json();
    }).then(response => {
        //TODO: 受け取ったデータを使って表を書き換える処理
        //受け取ったデータを変数に格納
        const order_list = response.order_list;
        console.log(order_list);
        //table要素を取得し、ヘッダ以外の行を削除
        let table = document.getElementById('order_table');
        while(table.rows.length > 1) {
            table.deleteRow(1);
        }
        //受け取ったデータをもとに表を作り直す

    }).catch(error => {
        console.log(error);
    });
    */
});