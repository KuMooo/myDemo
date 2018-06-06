document.write("<script language='javascript' src='tools.js'></script>");

var timer = null;
var sliderPage = document.getElementsByClassName('sliderPage')[0];
var moveWidth = sliderPage.children[0].offsetWidth;
var num = sliderPage.children.length - 1;
var leftBtn = document.getElementsByClassName('leftBtn')[0];
var rightBtn = document.getElementsByClassName('rightBtn')[0];
var oSpanArray=document.getElementsByClassName('sliderIndex')[0].getElementsByTagName('span');
var lock = true;
var index = 0;

leftBtn.onclick = function () {
    autoMove('right->left');
}

rightBtn.onclick = function () {
    autoMove('left->right');
}

for(var i=0; i < oSpanArray.length; i++) {
    (function (myIndex) {
    oSpanArray[i].onclick = function (){
        lock = false;
        clearTimeout(timer);
        index = myIndex;
        startMove(sliderPage,{left: -index * moveWidth},function(){
            lock = true;
            timer = setTimeout(autoMove,1500);
            changeIndex(index);
        })
    }
    })(i)
    
}

function autoMove(direction) {
    if (lock) {
        lock = false;
        clearTimeout(timer);
        if (!direction || direction == 'left->right') {
            index++;
            startMove(sliderPage, { left: sliderPage.offsetLeft - moveWidth }, function () {
                if (sliderPage.offsetLeft == -num * moveWidth) {
                    index = 0;
                    sliderPage.style.left = '0px';
                }
                timer = setTimeout(autoMove, 1500);
                lock = true;
                changeIndex(index);
            });
        } else if (direction == 'right->left') {
            if (sliderPage.offsetLeft == 0) {
                sliderPage.style.left = - num * moveWidth + 'px';
                index = num;
            }
            index--;
            startMove(sliderPage, { left: sliderPage.offsetLeft + moveWidth }, function () {
                timer = setTimeout(autoMove, 1500);
                lock = true;
                changeIndex(index);
            })
        }
    }

}

function changeIndex (_index) {
    for (var i = 0;i < oSpanArray.length;i++ ) {
        oSpanArray[i].className = '';

    }
    oSpanArray[_index].className = 'active' ;
}


timer = setTimeout(autoMove, 1500)
