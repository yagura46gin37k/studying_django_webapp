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

//プルダウンメニューの変更を監視
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
            if(table.rows[i].cells[0].innerText.trim() == goods_name){
                table.rows[i].style.display = 'table-row';
            } else {
                table.rows[i].style.display = 'none';
            }
        }
    }
});

//tableの表示行のチェックボックスをまとめてチェックする関数
function allCheck() {
    //table要素を取得
    const table = document.getElementById('order_table');
    //table-row状態の行のみチェックする
    for(let i = 1; i < table.rows.length; i++) {
        if(table.rows[i].style.display == 'table-row') {
            document.getElementById('delete_order_' + i).checked = true;
        }
    }
}

//「すべてチェック」ボタンを監視
let all_check_btn = document.getElementById('all-check-btn');
all_check_btn.addEventListener('click', e => {
    e.preventDefault();
    allCheck();
});

const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));    //waitTimeミリ秒だけ待機する関数

//「注文を取り消す」ボタンを監視
const delete_order_btn = document.getElementById('delete_order_btn');
delete_order_btn.addEventListener('click', e => {
    e.preventDefault();
    console.log('delete button pressed');

    const msg_area = document.getElementById('delete_msg');
    const formdata = new FormData(document.getElementById('delete_order_form'));
    const formdata_url = new URLSearchParams(formdata);
    const url = location.href;

    //現在のページにチェック済み項目をPOSTする
    fetch(url, {
        method: 'POST',
        body: formdata_url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'X-CSRFToken': csrftoken,
        },
    }).then(response => {
        return response.json();
    }).then(async response => {
        if(response.result == 'OK') {
            msg_area.insertAdjacentHTML(
                'beforeend', `<div class="alert alert-success">\
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${response.msg}</div>`
            );
            delete_order_btn.disabled = true;   //ボタンを無効化
            await sleep(3000);  //3秒待機
            window.location.href = location.href; //ページを更新
        }
    }).catch(error => {
        console.log(error);
    });
});