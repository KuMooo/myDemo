require('../css/goosCover.less');
var num = 1, value, dvalue, choice=false,price_value=$('.price_value').html();

function bindEventSpect () {
    $('.buy_spect_wrap_ul').on('click', '.buy_spect_li',function() {
        choice=true;
        $('.buy_spect_li').removeClass('active');
        $(this).addClass('active');
        dvalue=$(this).attr('data-price');
        $('.price_value').html((dvalue * num).toFixed(1));
        $('.buy_ok a').html('确定')
    })
    $('.buy_spect_wrap_ul').on('click', '.active',function() {
        choice=false;
        $('.buy_spect_li').removeClass('active');
        $('.price_value').html($('.price_value').attr('value'));
    })

    $('.buy_number_add').on('click',function(){
        ++num;
        $('.buy_number_value').html(num);
        $('.price_value').html((dvalue * num).toFixed(1));
    })
    $('.buy_number_decrease').on('click',function(){
        if(num !== 1){
            --num;
        $('.buy_number_value').html(num);
        $('.price_value').html((dvalue * num).toFixed(1));
        }    
    })

    $('.buy_ok').on('click',function() {
        if(choice){
            window.open('http://localhost:8088/submit.html')
        }
        else {
            $('.buy_ok a').html('请选择规格')
        }
        
    })
}
bindEventSpect ();