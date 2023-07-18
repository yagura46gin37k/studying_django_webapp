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
    console.log('list changed');
    //上から何番目の項目を選択しているか取得
    const selected_goods_index = goods_list.selectedIndex;
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
        //table要素を取得し、ヘッダ以外の行を削除
        let table = document.getElementById('order_table');
        while(table.rows.length > 1) {
            table.deleteRow(1);
        }
        //受け取ったデータをもとに表を作り直す

    }).catch(error => {
        console.log(error);
    });
});