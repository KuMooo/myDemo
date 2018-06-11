//实现渲染
(function ($, root) {
    function renderInfo(info) {
        var html = '<div class="song-name">' + info.song + '</div>\
       <div class="singer-name">'+ info.singer + '</div>\
       <div class="album-name">'+ info.album + '</div>';
        $('.song-info').html(html);
    }

    var $scope= $(document.body);
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            root.blurImg(img,$scope);
            $('.img-wrapper').html(img);
        }
    }

    function renderIslike(islike) {
        if(islike){
            $('.like-btn').addClass("liking");
        }else {
            $('.like-btn').removeClass("liking");
        }
    }
    root.render= function (data){
        renderInfo(data);
        renderImg(data.image);
        renderIslike(data.islike);
    }


})(window.Zepto, window.player || (window.player={}))
//通过window.player暴露函数