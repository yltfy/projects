//var bottomToTopTime = null;
//var bottomToTop = 0;
//$(window).scroll(function() {
//	if(bottomToTop != 1) { //如果b=1那么，当前的scroll事件是被定时器所触发，如果不等于1，那么就是非定时器的其他任何一个操作触发该事件
//		clearInterval(bottomToTopTime);
//	}
//	bottomToTop = 2; //换成别的值，这样就可以区别事件是被定时器触发的还是被别的事件触发的
//
//	if($(window).scrollTop() >= 100) {
//		$(".backTop").show();
//	} else if($(window).scrollTop() <= 100) {
//		$(".backTop").hide();
//	}
//});
//$(".backTop").on("click", function() {
//	var _this = $(this);
//	clearInterval(bottomToTopTime);
//	var iCur = iSpeed = 0;
//	bottomToTopTime = setInterval(function() {
//		iCur = document.documentElement.scrollTop || document.body.scrollTop; //当前鼠标滚动后距离顶部的值
//		iSpeed = Math.floor((0 - iCur) / 8);
//		if(iCur == 0) {
//			clearInterval(bottomToTopTime); //运动到顶部了
//		} else {
//			document.documentElement.scrollTop = document.body.scrollTop = iCur + iSpeed;
//		}
//		bottomToTop = 1; //这个1的作用是佐证b=1的时候，是定时器触发了鼠标滚动事件
//	}, 60);
//})

var backTop = document.getElementById('backTop');
var backTopTimer = null;
var backTopb = 0;

setTop();

window.onscroll = function() {
	if((getScrollTop() + getWindowHeight() + 5) >= getDocHeight()) {

	} else {
		if((document.documentElement.scrollTop || document.body.scrollTop) >= 100) {
			backTop.style.display = "block"
		}
		if((document.documentElement.scrollTop || document.body.scrollTop) <= 100) {
			backTop.style.display = "none"
		}
		if(backTopb != 1) { //如果b=1那么，当前的scroll事件是被定时器所触发，如果不等于1，那么就是非定时器的其他任何一个操作触发该事件
			clearInterval(backTopTimer);
		}
		backTopb = 2; //换成别的值，这样就可以区别事件是被定时器触发的还是被别的事件触发的	
		setTop();
	}

}

backTop.onclick = function() {
	clearInterval(backTopTimer);
	var iCur = iSpeed = 0;
	backTopTimer = setInterval(function() {
		iCur = document.documentElement.scrollTop || document.body.scrollTop; //当前鼠标滚动后距离顶部的值
		iSpeed = Math.floor((0 - iCur) / 8);
		if(iCur == 0) {
			clearInterval(backTopTimer); //运动到顶部了
		} else {
			document.documentElement.scrollTop = document.body.scrollTop = iCur + iSpeed;
		}
		backTopb = 1; //这个1的作用是佐证b=1的时候，是定时器触发了鼠标滚动事件
	}, 30);

}

function setTop() {
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	backTop.style.top = scrollTop + document.documentElement.clientHeight - backTop.offsetHeight + 'px';
}

//滚动条在Y轴上的滚动距离
function getScrollTop() {　　
	var scrollTop = 0,
		bodyScrollTop = 0,
		documentScrollTop = 0;　　
	if(document.body) {　　　　
		bodyScrollTop = document.body.scrollTop;　　
	}　　
	if(document.documentElement) {　　　　
		documentScrollTop = document.documentElement.scrollTop;　　
	}　　
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
	return scrollTop;
}

//文档的总高度
function getDocHeight() {　　
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

//浏览器视口的高度
function getWindowHeight() {　　
	var windowHeight = 0;　　
	if(document.compatMode == "CSS1Compat") {　　　　
		windowHeight = document.documentElement.clientHeight;　　
	} else {　　　　
		windowHeight = document.body.clientHeight;　　
	}　　
	return windowHeight;
}

//window.onscroll = function() {　　
//	if(getScrollTop() + getWindowHeight() == getDocHeight()) {　　　　
//		alert("you are in the bottom!");　　
//	}
//};