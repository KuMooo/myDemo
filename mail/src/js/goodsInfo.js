require('../css/goodsInfo.less');
require('./goodsCover.js');

function getId() {
    var idNum;
    var optionList = location.search.slice(1).split('&');
    optionList.forEach(function(ele, index) {
        if(ele.indexOf('id=') !== -1) {
           idNum = ele.slice(3);
        }
    })
    return idNum;
} 


function getGoodsList () { 
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://localhost:8088/src/api/goodsList.json',
        success: function(data) {
            createGoodsInfo(data);
        }
    })
}

function createGoodsInfo (data) {
    var idNum = getId(),
        str = '',
        liStr = '';
        dataList = data.list;
        len = dataList.length;
    for(var i = 0; i<len; i++) {
        
        if(dataList[i].id == idNum) {
            $('.infor_one_img').html(' <img src="'+ dataList[i].imgurl[0] +'">');

            $('.one_name').html(dataList[i].name);

            dataList[i].spectList.sort(finPrice('price'));

            $('.one_price').html('￥' + dataList[i].spectList[0].price + '~' + dataList[i].spectList[dataList[i].spectList.length-1].price );
            
            dataList[i].imgurl.forEach(function (ele, index) {
                str += '<img src="'+ ele +'"/>'
            });
            $('.infor_th').append($(str));
            
            dataList[i].spectList.forEach(function (ele, index) {
                liStr += '<li class="buy_spect_li" data-price="'+ ele.price +'" >'+  ele.spect +'</li>';
            });
            $('.buy_spect_wrap_ul').html($(liStr));
            $('.price_value').html('￥' + dataList[i].spectList[0].price + '~' + dataList[i].spectList[dataList[i].spectList.length-1].price);   
            $('.price_value').attr('value','￥' + dataList[i].spectList[0].price + '~' + dataList[i].spectList[dataList[i].spectList.length-1].price);
            
           
        }       
    }
}

function finPrice(str) {
    return function(a,b){
        return a[str] - b[str];
    }   
}

function bindEvent() {
    $('.infor_two').on('click',function(){
        $('.buy_wrap').css('display','block');
        $('html').css({height:'100%',overflow: 'hidden'});
    })
    $('.buy_gray').on('click',function(){
        $('.buy_wrap').css('display','none');
        $('html').css({height:'100%',overflow: 'visible'});
    })
    $('.infor_fo').on('click',function(){
        $('.infor_two').click(); 
    })
    
}
bindEvent();

getGoodsList ()
console.log (getId());