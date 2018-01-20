window.onload = function() {
	/*============================================navigator banner=======================================================*/
	var esUl = getEleByClass(document, "elastic")[0];
	var esLi = esUl.getElementsByTagName("li");
	var esBg = esLi[esLi.length - 1]
	var esi = 0;
	for(esi = 0; esi < esLi.length - 1; esi++) {
		esLi[esi].onmouseover = function() {
			esBounce(esBg, this.offsetLeft);
		}
	}

	/*==============================================Seamless rolling=============================================*/
	noticeFn()

	function noticeFn() { // Seamless rolling
		var oUl = $('.notifyBox ul');
		var aLi = oUl.find('li');
		var width = 20;
		for(var i = 0; i < aLi.length; i++) {
			width += Math.ceil(aLi.eq(i).width()) + 100;
		}
		oUl.width(width);
		var noticeLeft = parseInt(oUl.css('left'));
		var initLeft = 0;
		for(var i = 0; i < 3; i++) {
			initLeft += Math.ceil(aLi.eq(i).width()) + 100;
		}
		var noticeTime = setInterval(noticeMove, 100);
		oUl.on('mouseenter', function() {
			clearInterval(noticeTime);
		});
		oUl.on('mouseleave', function() {
			noticeTime = setInterval(noticeMove, 100)
		});

		function noticeMove() {
			noticeLeft -= 3;
			if(noticeLeft <= -initLeft) {
				noticeLeft = 0;
			}
			oUl.css('left', noticeLeft);
		}
	}

	/*============================================Gaussian blur=======================================================*/
	var oList = document.getElementById("gauss_list");
	var aLi = oList.children;
	var oPrev = document.getElementById("gauss_prev");
	var oNext = document.getElementById("gauss_next");
	var arr = [];
	for(var i = 0; i < aLi.length; i++) {
		var oSpan = aLi[i].children[0];
		arr[i] = {
			left: getEleStyle(aLi[i], "left"),
			opacity: getEleStyle(aLi[i], "opacity"),
			scale: getEleStyle(aLi[i], "-webkit-transform"),
			zIndex: getEleStyle(aLi[i], "z-index"),
			alpha: getEleStyle(oSpan, "opacity")
		};
	}
	oPrev.onclick = function() {
		arr.unshift(arr.pop());
		toStyle();
	};
	oNext.onclick = function() {
		arr.push(arr.shift());
		toStyle();
	};

	function toStyle() {
		for(var i = 0; i < aLi.length; i++) {
			var oSpan = aLi[i].children[0];
			aLi[i].style.left = arr[i].left;
			aLi[i].style.opacity = arr[i].opacity;
			aLi[i].style.WebkitTransform = arr[i].scale;
			aLi[i].style.zIndex = arr[i].zIndex;
			oSpan.style.opacity = arr[i].alpha; //arr[i]={left:getEleStyle(aLi[i],"left"),opacity:getEleStyle(aLi[i],"opacity"),scale:getEleStyle(aLi[i],"-webkit-transform")};
		}
	}
};

/*==============================================3D Carousel=============================================*/
var showcase = $("#rorate_showcase"),
	title = $('#item-title');
showcase.Cloud9Carousel({
	yOrigin: 42,
	yRadius: 48,
	mirror: {
		gap: 12,
		height: 0.2
	},
	autoPlay: 1,
	buttonLeft: $("#nav > .left"),
	buttonRight: $("#nav > .right"),
	bringToFront: true,
	onRendered: rendered,
	onLoaded: function() {
		showcase.css('visibility', 'visible')
		showcase.css('display', 'none')
		showcase.fadeIn(1500)
	}
})

function rendered(carousel) {
	title.text(carousel.nearestItem().element.alt)
	var c = Math.cos((carousel.floatIndex() % 1) * 2 * Math.PI)
	title.css('opacity', 0.5 + (0.5 * c))
}

$('#nav > button').click(function(e) {
	var b = $(e.target).addClass('down')
	setTimeout(function() {
		b.removeClass('down')
	}, 80)
})

$(document).keydown(function(e) {
	switch(e.keyCode) {
		/* left arrow */
		case 37:
			$('#nav > .left').click()
			break

			/* right arrow */
		case 39:
			$('#nav > .right').click()
	}
})

/*==============================================Slideshow=============================================*/
var aA = $(".table").find("a"); // 幻灯片 圆角
var aLi = $(".blackBox").find("li"); // 幻灯片ul
var aNum = 0;
var tableTimer = setInterval(table, 5000); // 初始化执行幻灯片动画
for(var i = 0; i < aA.length; i++) { // 点击圆角触发动画
	aA.get(i).index = i;
	aA.eq(i).on("click", function() {
		clearInterval(tableTimer);
		tableTimer = setInterval(table, 5000);
		aA.eq(aNum).removeClass("active");
		$(this).addClass("active");
		tweenMove({
			obj: aLi.get(aNum),
			oTarget: {
				opacity: "0"
			},
			iTime: 200,
			iType: "linear"
		});
		aLi.eq(aNum).removeClass("active");
		aNum = this.index;
		tweenMove({
			obj: aLi.get(aNum),
			oTarget: {
				opacity: "100"
			},
			iTime: 200,
			iType: "linear"
		});
		aLi.eq(aNum).addClass("active")
	})
}

function table() { // 幻灯片动画函数
	aA.eq(aNum).removeClass("active");
	tweenMove({
		obj: aLi.get(aNum),
		oTarget: {
			opacity: "0"
		},
		iTime: 200,
		iType: "linear"
	});
	aLi.eq(aNum).removeClass("active");
	aNum++;
	if(aNum >= aA.length) {
		aNum = 0
	}
	aA.eq(aNum).addClass("active");
	tweenMove({
		obj: aLi.get(aNum),
		oTarget: {
			opacity: "100"
		},
		iTime: 200,
		iType: "linear"
	});
	aLi.eq(aNum).addClass("active")
};

/*===================================Contact us ============================================*/
var $contact = $("#contact");
var $cuBox = $("#contact .cuBox");
var $psBox = $("#contact .psBox");
$cuBox.on("mouseenter", function() { // 联系我们
	this.bOff = false;
	var $this = $(this);
	clearTimeout($this.get(0).iTimer);
	tweenMove({
		obj: $this.get(0),
		oTarget: {
			width: "240"
		},
		iTime: 200,
		iType: "linear",
		fnEnd: function() {
			tweenMove({
				obj: $this.get(0),
				oTarget: {
					height: "410"
				},
				iTime: 400,
				iType: "backOut1"
			})
		}
	})
});
$cuBox.on("mouseleave", function() {
	var $this = $(this);
	clearTimeout($this.get(0).iTimer);
	$this.get(0).iTimer = setTimeout(function() {
		tweenMove({
			obj: $this.get(0),
			oTarget: {
				height: "48"
			},
			iTime: 400,
			iType: "linear",
			fnEnd: function() {
				tweenMove({
					obj: $this.get(0),
					oTarget: {
						width: "116"
					},
					iTime: 200,
					iType: "linear",
					fnEnd: function() {
						$this.get(0).open = false
					}
				})
			}
		})
	}, 1000)
});
$psBox.on("mouseenter", function() {
	this.bOff = false;
	var $this = $(this);
	clearTimeout($this.get(0).iTimer);
	tweenMove({
		obj: $this.get(0),
		oTarget: {
			width: "240"
		},
		iTime: 200,
		iType: "linear",
		fnEnd: function() {
			tweenMove({
				obj: $this.get(0),
				oTarget: {
					height: "160"
				},
				iTime: 300,
				iType: "backOut"
			})
		}
	})
});
$psBox.on("mouseleave", function() {
	var $this = $(this);
	clearTimeout($this.get(0).iTimer);
	$this.get(0).iTimer = setTimeout(function() {
		tweenMove({
			obj: $this.get(0),
			oTarget: {
				height: "48"
			},
			iTime: 300,
			iType: "linear",
			fnEnd: function() {
				tweenMove({
					obj: $this.get(0),
					oTarget: {
						width: "116"
					},
					iTime: 200,
					iType: "linear"
				})
			}
		})
	}, 1000)
})


/*==============================================canvas up=============================================*/
var oCloth = $(".cloth");
var num = 0;
setTimeout(function() {
	var iTimer = setInterval(function() {
		num++;
		oCloth.css("backgroundPosition", "-" + num * 400 + "px,0"); // 中间右上角最新开班信息
		if(num >= 45) {
			clearInterval(iTimer)
		}
	}, 80);
	move($(".board").get(0), { // 中间右下角 幻灯片
		opacity: "1"
	}, 300, "linear", function() {
		move(oCloth.get(0), {
			top: "-240"
		}, 2500, "backOut", function() {
			move($(".newClass").get(0), {
				opacity: "1"
			}, 500, "linear")
		})
	})
}, 1500);


/*==============================================Pop-ups=============================================*/
if($(".banner").data("off")) { // Pop-ups
	function close() {
		tweenMove({
			obj: $(".banner").get(0),
			oTarget: {
				"opacity": "0"
			},
			iTime: 500,
			iType: "easeOut"
		});
		tweenMove({
			obj: $(".bannerMark").get(0),
			oTarget: {
				"opacity": "0"
			},
			iTime: 500,
			iType: "easeOut",
			fnEnd: function() {
				$(".banner").css("display", "none");
				$(".bannerMark").css("display", "none")
			}
		})
	}
	$(".banner").css("display", "block").find(".close").click(close);
	$(".bannerMark").css("display", "block").click(close);
	tweenMove({
		obj: $(".banner").get(0),
		oTarget: {
			"opacity": "100"
		},
		iTime: 500,
		iType: "easeOut"
	});
	tweenMove({
		obj: $(".bannerMark").get(0),
		oTarget: {
			"opacity": "60"
		},
		iTime: 500,
		iType: "easeOut"
	})
};


/*==============================================Strings rolling=============================================*/
bomb();
function bomb() {
	var qin = $(".qin"); // 琴弦文字效果
	/*for(var i = 0; i < qin.length; i++) {
		var aHtml = qin.eq(i).html().split("");
		for(var j = 0; j < aHtml.length; j++) {
			aHtml[j] = "<span>" + aHtml[j] + "</span>"
		}
		qin.eq(i).html(aHtml.join(""))
	}*/
	var aSpan = $(".qin span");
	for(var i = 0; i < aSpan.length; i++) {
		aSpan.eq(i).css("left", aSpan.eq(i).position().left + "px")
	}
	aSpan.css("position", "absolute");
	var iStartTop = aSpan.position().top;
	var iMinTop = -18;
	var iMaxTop = 18;
	var obj = null;
	aSpan.on("mouseenter", aaa);

	function aaa(ev) { // 琴弦动画效果函数
		this.parentNode.onmouseout = null;
		this.parentNode.onmousemove = null;
		var ev = ev || event;
		var iStartY = ev.clientY;
		obj = $(this);
		this.parentNode.onmousemove = function(ev) {
			$(this).find("span").off("mouseenter", aaa);
			$(this).find("span").on("mouseenter", bbb);
			var iMouseY = ev.clientY;
			var iTop = iStartTop + (iMouseY - iStartY);
			var aSpan = $(this).find("span");
			var iIndex = obj.index();
			aSpan.stop();
			if(iTop < iMinTop || iTop > iMaxTop) {
				aSpan.animate({
					top: iStartTop
				}, 500, "easeOutElastic");
				$(this).find("span").on("mouseenter", aaa);
				$(this).find("span").off("mouseenter", bbb);
				this.onmouseleave = null;
				this.onmousemove = null
			} else {
				for(var i = 0; i < aSpan.length; i++) {
					if(iMouseY > iStartY) {
						var iSpanTop = iTop - Math.abs(i - iIndex);
						if(iSpanTop < iStartTop) {
							iSpanTop = iStartTop
						}
					} else {
						if(iMouseY < iStartY) {
							var iSpanTop = iTop + Math.abs(i - iIndex);
							if(iSpanTop > iStartTop) {
								iSpanTop = iStartTop
							}
						}
					}
					aSpan.eq(i).css("top", iSpanTop + "px")
				}
			}
			this.onmouseleave = function() {
				aSpan.animate({
					top: iStartTop
				}, 500, "easeOutElastic");
				$(this).find("span").on("mouseenter", aaa);
				$(this).find("span").off("mouseenter", bbb);
				this.onmouseleave = null;
				this.onmousemove = null
			}
		}
	}

	function bbb() {
		obj = $(this)
	}
}


/*============================================enlarge img=======================================================*/
var itemUl = getEleByClass(document, "enlarge")[0];
var itemLi = itemUl.getElementsByTagName("li");
var itemImg = itemUl.getElementsByTagName("img")
var iMinZindex = 2;
var itemi = 0;
//1.布局转换
for(itemi = 0; itemi < itemImg.length; itemi++) {
	itemImg[itemi].style.left = itemLi[itemi].offsetLeft + 'px';
	itemImg[itemi].style.top = itemLi[itemi].offsetTop + 'px';
}
for(itemi = 0; itemi < itemImg.length; itemi++) {
	itemImg[itemi].style.position = 'absolute';
	itemImg[itemi].style.margin = '0';
}
//2.加事件
for(itemi = 0; itemi < itemImg.length; itemi++) {
	itemImg[itemi].onmouseover = function() {
		this.style.zIndex = iMinZindex++;
		startMove(this, {
			width: 130,
			height: 130,
			marginLeft: -15,
			marginTop: -15
		});
	};
	itemImg[itemi].onmouseout = function() {
		startMove(this, {
			width: 100,
			height: 100,
			marginLeft: 0,
			marginTop: 0
		});
	};
}