/**
 * Created by oukai on 2017/5/11.
 */
var starBoff = true;
$(".loadBox").css("height", $(window).height());
$(document).on("mousemove", function(ev) {
	ev.preventDefault();
	return false
});

function judge() {
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]: (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	(s = ua.match(/rv:([\d.]+)/)) ? Sys.ie11 = s[1]: "";
	if(Sys.firefox) {
		Sys.firefox = Number(Sys.firefox.substring(0, 2))
	}
	if(Sys.chrome) {
		Sys.chrome = Number(Sys.chrome.substring(0, 2))
	}
	if(Sys.ie || Sys.firefox < 40 || Sys.chrome < 38 || Sys.safari || (Sys.ie11 && !Sys.firefox)) {
		return false
	} else {}
	return Sys
}
var Browser = (function() {
	var userAgent = navigator.userAgent.toLowerCase();
	return {
		get: function() {
			if(userAgent.indexOf("msie") > 0) {
				return "msie"
			}
			if(userAgent.indexOf("firefox") > 0) {
				return "firefox"
			}
			if(userAgent.indexOf("chrome") > 0) {
				return "chrome"
			}
		}
	}
})();
var OS = (function() {
	var userAgent = navigator.userAgent.toLowerCase();
	return {
		get: function() {
			if(userAgent.indexOf("mac os") > 0) {
				return "mac"
			}
			if(userAgent.indexOf("win") > 0) {
				return "win"
			}
		}
	}
})();
var loadAni = {
	init: function() {
		var _this = this;
		_this.t = [];
		for(var i = 1; i < 101; i++) {
			_this.t.push(i)
		}
		_this.timer2 = null;
		_this.n = 0;
		_this.time = 200;
		_this.lastPosition = [];
		_this.penBox = document.getElementById("penBox");
		_this.pen = document.getElementById("pen");
		_this.note = document.getElementById("note");
		_this.c = document.getElementById("c");
		_this.c.height = "400";
		_this.c.width = "600";
		_this.C1 = c.getContext("2d");
		_this.C1.strokeStyle = "#dd657c";
		_this.offsetY = -3;
		if(OS.get() == "win" && Browser.get() == "chrome") {
			if(judge().chrome == 45) {
				_this.offsetY = -3
			} else {
				_this.offsetY = -3
			}
		}
		_this.position = [
			[369, 143],
			[369, 143, 369, 143, 369, 260, 369, 260, 1],
			[369, 260, 369, 260, 367, 265, 364, 268, 4],
			[364, 268, 364, 268, 341, 268, 338, 268, 2],
			[338, 268, 335, 268, 330, 265, 330, 259, 4],
			[330, 259, 330, 253, 330, 199, 330, 199, 2],
			[330, 199, 330, 199, 320, 259, 320, 259, 1],
			[320, 259, 320, 259, 319, 268, 311, 268, 3],
			[311, 268, 303, 268, 301, 268, 301, 268, 4],
			[301, 268, 301, 268, 295, 268, 293, 259, 2],
			[293, 259, 291, 250, 283, 199, 283, 199, 1],
			[283, 199, 283, 199, 283, 259, 283, 259, 1],
			[283, 259, 283, 259, 284, 268, 275, 268, 3],
			[275, 268, 266, 268, 253, 268, 253, 268, 1],
			[253, 268, 253, 268, 245, 268, 245, 258, 3],
			[245, 258, 245, 248, 245, 142, 245, 142, 1],
			[245, 142, 245, 142, 245, 135, 253, 135, 3],
			[253, 135, 261, 135, 291, 135, 291, 135, 1],
			[291, 135, 291, 135, 297, 136, 299, 145, 3],
			[299, 145, 301, 154, 307, 194, 307, 194, 1],
			[307, 194, 307, 194, 315, 143, 315, 143, 1],
			[315, 143, 315, 143, 317, 135, 324, 135],
			[324, 135, 331, 135, 364, 135, 364, 135],
			[364, 135, 364, 135, 371, 144, 375, 150, 2],
			[375, 150, 379, 156, 384, 160, 390, 159, 3],
			[390, 159, 396, 158, 401, 151, 401, 149, 3],
			[401, 149, 401, 147, 405, 134, 419, 134, 2],
			[419, 134, 433, 134, 438, 144, 439, 150, 2],
			[439, 150, 440, 156, 438, 165, 429, 171, 2],
			[429, 171, 420, 177, 410, 170, 407, 168, 2],
			[407, 168, 404, 166, 395, 161, 389, 169, 2],
			[389, 169, 382, 179, 388, 207, 383, 227, 2],
			[383, 227, 378, 247, 367, 276, 330, 298],
			[330, 298, 293, 320, 250, 315, 219, 298],
			[219, 298, 188, 281, 164, 249, 162, 202],
			[162, 202, 160, 155, 194, 111, 231, 98],
			[231, 98, 268, 85, 303, 88, 326, 102],
			[326, 102, 349, 116, 363, 130, 369, 143]
		];
		_this.getlastPosition()
	},
	getlastPosition: function() {
		var _this = this;
		var i = 1;
		var n = 1;
		start();

		function start() {
			var X = _this.getposition({
				position: _this.position[n],
				t: _this.t[i] / 100
			})[0] + _this.offsetY;
			var Y = _this.getposition({
				position: _this.position[n],
				t: _this.t[i] / 100
			})[1];
			_this.lastPosition.push([X, Y]);
			i += _this.position[n][8] || 1;
			if(i > 100) {
				n++;
				i = 1
			}
			if(n >= _this.position.length) {
				_this.drawLine()
			} else {
				start()
			}
		}
	},
	getposition: function(option) {
		var _this = this;
		var position = option.position;
		var t = option.t;
		var Ix = position[0] * ((1 - t) * (1 - t)) + position[2] * 2 * (1 - t) * t + position[4] * (t * t);
		var Iy = position[1] * ((1 - t) * (1 - t)) + position[3] * 2 * (1 - t) * t + position[5] * (t * t);
		var Jx = position[2] * ((1 - t) * (1 - t)) + position[4] * 2 * (1 - t) * t + position[6] * (t * t);
		var Jy = position[3] * ((1 - t) * (1 - t)) + position[5] * 2 * (1 - t) * t + position[7] * (t * t);
		var Ex = Ix * (1 - t) + Jx * t;
		var Ey = Iy * (1 - t) + Jy * t;
		return [Ex, Ey]
	},
	drawLine: function() {
		var _this = this;
		_this.C1.beginPath();
		_this.C1.moveTo(_this.position[0][0] + _this.offsetY, this.position[0][1])
	},
	move: function(num) {
		var _this = this;
		clearInterval(_this.timer2);
		_this.timer2 = setInterval(function() {
			_this.n = parseInt(_this.n);
			_this.pen.style.left = _this.lastPosition[_this.n][0] + "px";
			_this.pen.style.top = _this.lastPosition[_this.n][1] - 62 + "px";
			_this.note.style.left = _this.lastPosition[_this.n][0] - 30 + "px";
			_this.note.style.top = _this.lastPosition[_this.n][1] + 15 + "px";
			_this.C1.lineTo(_this.lastPosition[_this.n][0], _this.lastPosition[_this.n][1]);
			_this.C1.stroke();
			_this.n += 4;
			if(_this.n > 1) {
				_this.penBox.style.display = "block"
			}
			if(_this.n >= num) {
				clearInterval(_this.timer2)
			}
			if(_this.n >= 2500) {
				clearInterval(_this.timer2);
				$(".loadBox").css("display", "none");
				$(".body").css("display", "block");
				if(starBoff) {
					star();
					starBoff = false
				}
				setTimeout(function() {
					var oNav = document.getElementsByTagName("nav")[0];
					var box = oNav.getElementsByClassName("box")[0];
					var oUl = oNav.getElementsByTagName("ul")[0];
					var aLi = oUl.getElementsByTagName("li");
					var leftNum = aLi[initNum].offsetLeft;
					var topNum = aLi[0].offsetTop;
					box.style.left = leftNum + "px";
					box.style.top = topNum + "px";
					box.style.width = aLi[initNum].offsetWidth + "px"
				}, 12)
			}
			_this.note.innerHTML = "<span>" + parseInt((_this.n / 2500 * 100)) + "</span><em>%</em>"
		}, _this.time / _this.lastPosition.length)
	}
};
loadAni.init();

function Loader(source) {
	this.source = source;
	this.count = this.source.length;
	this.loaded = 0;
	this.status = 0;
	this.loadSuccessList = [];
	this.loadErrorList = [];
	this.loadOutTime = 5000;
	this.loadedHandler = function() {}
}
Loader.prototype = {
	constructor: Loader,
	start: function() {
		if(this.count) {
			this.load()
		} else {
			this.status = 2
		}
	},
	load: function() {
		var _this = this;
		for(var i = 0; i < this.count; i++) {
			var image = new Image();
			image.index = i;
			image.style.display = "none";
			image.onload = function() {
				_this.loadSuccessList.push(this.src);
				_this.loadedHandle(this)
			};
			image.onerror = function() {
				_this.loadErrorList.push(this.src);
				_this.loadedHandle(this)
			};
			image.timer = ~ function(that) {
				setTimeout(function() {
					_this.loadErrorList.push(that.src);
					_this.loadedHandle(that)
				}, _this.loadOutTime)
			}(image);
			image.src = this.source[i];
			document.body.appendChild(image)
		}
	},
	loadedHandle: function(t) {
		clearTimeout(t.timer);
		t.onload = t.onerror = null;
		this.loaded++;
		this.loadedHandler(t);
		try {
			document.body.removeChild(t)
		} catch(err) {}
	}
};
var imageArr = ["index-icon.png", "disk.png", "S2.png", "S.png", "C.png", "5.png", "L.png", "M2.png", "T.png", "H.png", "js.png", "M.png", "ruler.png", "pen.png", "compasses.png", "clip.png", "bg.jpg", "disk_small.png", "black.png", "table.png", "table_active.png", "light2.png", "cloth/flag.png", "newClass.png", "more.png", "dashed_top.png", "dashed_bottom.png", "dashed_middle.png", "circle.png", "people.png", "paper.png", "note.png", "new.png", "more_1.png", "dian.png", "time.png", "timeBg.png", "title.png", "works.png", "image_frame.png", "little_people.png", "say.png", "good.png", "video.png", "video_frame.png", "video_icon.png", "us.png", "contact.png", "qq.png", "code.png", "bg.gif", "mark.png", "close.png", "confirm.png", "cancel.png", "mark2.png", "nav_bg.gif", "miaov-all.png", "footerBg.png", "icon.png", "staff.png", "loginBgTop.png", "loginClose.png", "loginCloseHover.png", "loginBgCenter.png", "loginInpBg.png", "loginErrBg.png", "closeError.png", "loginInpBg.png", "loginBtn.png", "selectBg.png", "loginBgBottom.png", "selectBg.png", "regBtn.png", "5-121204193R7.gif", "mark.png", "backTop.png", "talkBg.png", "talkBg2.png", "talkBg3.png", "loginClose.png", "loginCloseHover.png"];
var imageSource = [];
var loadBg = document.getElementById("loadBg");
var pen = document.getElementById("pen");
var loadRoute = document.getElementById("loadRoute");
var currentLoadSource = ["../images/loadBg.png", "../images/loadPen.png", "../images/loadRoute.png"];
for(var i = 0; i < imageArr.length; i++) {
	imageSource.push("../images/" + imageArr[i])
}
if(!document.cookie.match("loaded")) {
	var loader1 = new Loader(currentLoadSource);
	loader1.loadedHandler = function(t) {
		switch(t.index) {
			case 0:
				loadBg.style.background = "url(" + t.src + ") no-repeat center";
				break;
			case 1:
				pen.src = t.src;
				break;
			case 2:
				loadRoute.src = t.src;
				break
		}
		if(this.loaded == this.count) {
			var loader = new Loader(imageSource);
			loader.loadedHandler = function(t) {
				var num = this.loaded / this.count;
				setTimeout(function() {
					loadAni.move(2500 * num)
				}, 100);
				if(num == 1) {
					document.cookie = "loaded=1"
				}
			};
			loader.start()
		}
	};
	loader1.start()
} else {
	if(starBoff) {
		star();
		starBoff = false
	}
	$(".loadBox").css("display", "none");
	$(".body").css("display", "block")
};

// ajax请求数据
//$.ajax({
//	type: "get",
//	url: "http://2017.miaov.com/study/ajax/latestvideo",
//	dataType: "jsonp",
//	jsonp: "callback"
//}).success(function(data) {
//	var oVideo = document.getElementById("video");
//	for(var i = 0; i < data.length; i++) {
//		var oli = document.createElement("li");
//		var oH = document.createElement("h3");
//		var oA = document.createElement("a");
//		var oP = document.createElement("p");
//		oA.href = "http://2017.miaov.com";
//		oA.className = "qin";
//		oA.target = "_blank";
//		oA.innerHTML = data[i].name.substring(0, 12) + '...';
//		oH.appendChild(oA);
//		oli.appendChild(oH);
//		var sP = "";
//		if(data[i].video.length > 4) {
//			data[i].video = data[i].video.slice(-4)
//		}
//		for(var j = 0; j < data[i].video.length; j++) {
//			if(j == 0) {
//				sP += data[i].video[j].episode
//			} else {
//				sP += "、" + data[i].video[j].episode
//			}
//		}
//		sP = "更新了" + sP + "集";
//		oP.innerHTML = sP;
//		oli.appendChild(oP);
//		oVideo.appendChild(oli)
//	}
//});

//function star() {
//	var oCloth = $(".cloth"); // 中间右上角 最新开班信息
//	var num = 0;
//};