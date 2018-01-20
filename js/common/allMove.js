/**
 * 依赖utils.js中的css方法
 * @param {Object} t ： 类型
 * @param {Object} e ： 元素
 * @param {Object} n ： 时间
 * @param {Object} r ： 运动形式
 * @param {Object} a ： 回调函数
 */
function move(t, e, n, r, a) {
	if(t) {
		clearInterval(t.iTimer);
		var u = n || 1e3,
			o = {};
		for(var i in e) o[i] = {}, "opacity" == i ? (o[i].b = Math.round(100 * css(t, i)), o[i].c = 100 * e[i] - o[i].b) : (o[i].b = parseInt(css(t, i)), o[i].c = e[i] - o[i].b);
		var r = r || "linear",
			s = (new Date).getTime();
		t.iTimer = setInterval(function() {
			var n = (new Date).getTime() - s;
			n >= u && (n = u);
			for(var i in e) {
				var c = Tween[r](n, o[i].b, o[i].c, u);
				"opacity" == i ? (t.style[i] = c / 100, t.style.filter = "alpha(opacity=" + c + ")") : t.style[i] = c + "px"
			}
			n == u && (clearInterval(t.iTimer), a && a.call(t))
		}, 16)
	}
}

/**
 * 依赖utils.js中的css方法
 * @param {Object} obj 元素对象
 * @param {Object} json 属性key:value
 * @param {Object} d 
 * @param {Object} fx 运动形式
 * @param {Object} fn 回调函数
 * model: service 
 */
function doMove(obj, json, d, fx, fn) {
	clearInterval(obj.iTimer);
	var startTime = +new Date();

	var j = {};

	for(var attr in json) {
		j[attr] = {};
		if(attr == 'opacity') {
			j[attr].b = Math.round(getEleStyle(obj, attr) * 100);
			j[attr].c = json[attr] - j[attr].b;
		} else if(attr == "webkitTransform") {
			j[attr].scaleXb = Math.round(getMatrix(getEleStyle(obj, attr), 0) * 100);
			j[attr].scaleYb = Math.round(getMatrix(getEleStyle(obj, attr), 3) * 100);
			j[attr].translateXb = Math.round(getMatrix(getEleStyle(obj, attr), 4));
			j[attr].translateYb = Math.round(getMatrix(getEleStyle(obj, attr), 5));
			j[attr].scaleXc = getMatrix(json[attr], 0) * 100 - j[attr].scaleXb;
			j[attr].scaleYc = getMatrix(json[attr], 3) * 100 - j[attr].scaleYb;
			j[attr].translateXc = getMatrix(json[attr], 4) - j[attr].translateXb;
			j[attr].translateYc = getMatrix(json[attr], 5) - j[attr].translateYb;
		} else {
			j[attr].b = parseInt(getEleStyle(obj, attr));
			j[attr].c = json[attr] - j[attr].b;
		}

	}

	obj.iTimer = setInterval(function() {

		var t = +new Date() - startTime;
		if(t >= d) {
			t = d;
		}

		for(var attr in json) {
			if(attr == "webkitTransform") {
				var valueSX = Tween[fx](t, j[attr].scaleXb, j[attr].scaleXc, d) / 100;
				var valueSY = Tween[fx](t, j[attr].scaleYb, j[attr].scaleYc, d) / 100;
				var valueTX = Tween[fx](t, j[attr].translateXb, j[attr].translateXc, d);
				var valueTY = Tween[fx](t, j[attr].translateYb, j[attr].translateYc, d);
				obj.style[attr] = "matrix(" + valueSX + ",0,0," + valueSY + "," + valueTX + "," + valueTY + ")";

			} else {
				var value = Tween[fx](t, j[attr].b, j[attr].c, d);
				if(attr == 'opacity') {
					obj.style.opacity = value / 100;
					obj.style.filter = 'alpha(opacity=' + value + ')';
				} else {
					obj.style[attr] = value + 'px';
				}
			}
		}

		if(t == d) {
			clearInterval(obj.iTimer);
			fn && fn();
		}

	}, 30);
}

/**
 * 依赖utils.js中的css方法
 * flash版运动
 * @param {Object} e ： 元素对象
 * 使用方式：
 * 	tweenMove({
		obj: $this.get(0),
		oTarget: {
			width: "240"
		},
		iTime: 200,
		iType: "bounceOut",
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
 * model: index
 */
function tweenMove(e) {
	var t = e.obj,
		a = e.oTarget,
		n = e.iTime,
		r = e.iType,
		s = e.fnEnd,
		c = e.fnDuring,
		o = Tween[r],
		i = 0,
		u = {},
		f = {},
		l = n / 24,
		h = {},
		m = "";
	clearInterval(t.timer);
	for(m in a) u[m] = css(t, m), f[m] = a[m] - u[m], h[m] = 0;
	if(30 > n)
		for(m in a) css(t, m, a[m]);
	else t.timer = setInterval(function() {
		if(l > i) {
			i++;
			for(m in a) h[m] = o(i, u[m], f[m], l), css(t, m, o(i, u[m], f[m], l))
		} else {
			for(m in a) css(t, m, a[m]);
			clearInterval(t.timer), s && s.call(t)
		}
		c && c.call(t, u, h, i, l)
	}, 24)
}

/**
 * 速度版运动
 * @param {Object} obj
 * @param {Object} json
 * @param {Object} fn
 * 使用方式：startMove(this, {width: 200, height: 200, marginLeft: -50, marginTop: -50}, 
 * 	function(){
 * alert(1)
 * });
 */
function startMove(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true; //这一次运动就结束了——所有的值都到达了
		for(var attr in json) {
			//1.取当前的值
			var iCur = 0;

			if(attr == 'opacity') {
				iCur = parseInt(parseFloat(getEleStyle(obj, attr)) * 100);
			} else {
				iCur = parseInt(getEleStyle(obj, attr));
			}

			//2.算速度
			var iSpeed = (json[attr] - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			//3.检测停止
			if(iCur != json[attr]) {
				bStop = false;
			}

			if(attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
				obj.style.opacity = (iCur + iSpeed) / 100;
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}

		if(bStop) {
			clearInterval(obj.timer);

			if(fn) {
				fn();
			}
		}
	}, 30)
}

/**
 * 弹性+摩擦力-滑动的导航栏
 * @param {Object} obj
 * @param {Object} iTarget
 * model: index
 * 使用方式： startMove(oBg, this.offsetLeft);
 */
var navLeft = 0;
var navSpeed = 0;

function esBounce(obj, iTarget) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		navSpeed += (iTarget - obj.offsetLeft) / 5;
		navSpeed *= 0.7;
		navLeft += navSpeed;
		if(Math.abs(navSpeed) < 1 && Math.abs(navLeft - iTarget) < 1) {
			//由于速度无法取整，有小数误差，使得目标无法到达指定位置，所以，将速度限制在一定范围内，比如1，这时再将运动目标的终点设置为预期的终点即可
			clearInterval(obj.timer);
			obj.style.left = iTarget + 'px';
		} else {
			obj.style.left = navLeft + 'px';
		}
		//		document.title=navSpeed;
	}, 30);
}