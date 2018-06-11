require('../css/index.less');
require('jquery');

function getGoodsList () { 
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://localhost:8088/src/api/goodsList.json',
        success: function(data) {
            creatList(data);
        }
    })
}
getGoodsList();


function creatList(data) {
    console.log(data);
    var  str = "";
    data.list.forEach(function(ele,index){
        str += '  \
        <a href="http://localhost:8088//goodsInfo.html?id='+ ele.id +'"><div class="goods_item">\
            <img src="'+ ele.imgurl[0] +'" alt="">\
            <p class="item_name">'+ ele.name +'</p>\
            <p class="item_price">'+ ele.spectList[0].price +'</p>\
        </div></a>'
    })
    $('.tab_content').html(str);
}
