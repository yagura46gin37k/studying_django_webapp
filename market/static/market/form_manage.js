//注文者の名前欄を一括設定する関数
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

//Fetch APIを用いてAjaxの送信を行う
//まずはCSRFの処理から
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

const submit_button = document.getElementById('ajax_order_validation');
const formset = document.querySelector('#order_formset');   //formsetの要素を取得
const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));    //waitTimeミリ秒だけ待機する関数

//order_formset.htmlの送信ボタンを監視
submit_button.addEventListener('click', e => {  //submitだとpreventdefaultが機能せずにページが遷移してしまう(非同期処理だかららしい)
    e.preventDefault();                         //デフォルトの挙動（ページ遷移）をキャンセル
    console.log('submit button pressed');

    const message_area = document.getElementById('messages'); //メッセージを表示する場所
    const formset_data = new FormData(formset);
    const formset_data_url = new URLSearchParams(formset_data);

    fetch(validation_url, {
        method: 'POST',
        body: formset_data_url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'X-CSRFToken': csrftoken,
        },
    }).then(response => {
        return response.json();                     //サーバ側からの返答をjson形式に
    }).then(async response => {                     //このresponseは直前のthenの返り値(response.json())
        if(response.result == 'OK') {
            message_area.insertAdjacentHTML(
                'beforeend', `<div class="alert alert-success">\
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${response.msg}</div>`
            );
            for(i = 0; i < formset_count; i++){     //入力欄を編集不可にする
                document.getElementById('id_form-'+ i + '-amount').disabled = true;
                document.getElementById('id_form-'+ i + '-ordered_by').disabled = true;
            }
            await sleep(5000);                      //5秒待機
            window.location.href = redirect_url;    //注文者一覧のページへリダイレクト
        } else if(response.result == 'NG') {
            message_area.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">' + response.msg + '</div>');
        }
    }).catch(error => {
        console.log(error);
    });
});
