
var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList;
var index = 0;
var audio = new root.audioControl();


function bindEvent() {


    $scope.on("play:change",function(event,index) {
        audio.getAudio(songList[index].audio);
        if(audio.status == "play") {
            audio.play();
            root.process.start();
        }
        root.process.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        root.process.updata(0);
    })

    $scope.on("click",".play-btn",function() {
        if(audio.status == "play") {
            audio.pause();
            root.process.stop();
        }else {
            audio.play();
            root.process.start();
        }
        $(this).toggleClass("pause")
    })

    $scope.on('click', ".prev-btn", function () {
        var index = controlManger.prev();
        $scope.trigger("play:change",index);
    })

    $scope.on('click', ".next-btn", function () {
        var index = controlManger.next();
        $scope.trigger("play:change",index);
    })
}

function bindTouch() {
    var $slider = $scope.find('.slider-pointer');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on("touchstart",function() {
        root.process.stop();
    }).on('touchmove',function(e) {

        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per<0 || per>1){
            per = 0;
        }
        root.process.updata(per);
    }).on("touchend",function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per<0 || per>1){
            per = 0;
        }
        var curDuration = songList[controlManger.index].duration;
        var curTime = per * curDuration;
        audio.playTo(curTime);
        root.process.start(per);
        $scope.find(".play-btn").addClass("pause");
    })
}

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            root.render(data[0]);
            songList = data;
            bindEvent();
            controlManger =new root.controlManger(data.length);
            $scope.trigger("play:change",0);
            bindTouch();
        },
        error: function () {
            console.log('error');
        }
    })
}


getData("../mock/data.json");