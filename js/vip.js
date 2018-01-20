window.onload = function() {
	var oMain = document.getElementById('main');
	var oSvg = document.getElementById('svg');
	var oCircle_wrap = document.getElementById('circle_wrap');
	var oCircle = oCircle_wrap.children[0];
	var oWrap = document.getElementById('wrap');
	var oCircle_dot = document.getElementById('circle_dot');
	var oCircle_line = document.getElementById('circle_line');

	var num = 0;
	var r = 270;
	var l = oCircle.getBoundingClientRect().left + oCircle.offsetWidth / 2 - oMain.offsetParent.offsetLeft * 1.4;
	var t = oCircle.getBoundingClientRect().top + oCircle.offsetHeight / 2 + oMain.offsetParent.offsetTop * 0.2;
	var iStartX = oMain.offsetParent.offsetLeft;
	var iStartY = oMain.offsetParent.offsetTop;

	for(var i = 0; i < 180; i++) {
		var oDot = document.createElement('div');
		oDot.style.left = Math.cos(num * Math.PI / 180) * r + l + 'px';
		oDot.style.top = Math.sin(num * Math.PI / 180) * r + t + 'px';
		oCircle_dot.appendChild(oDot);
		num += 2;
	}

	for(var i = 0; i < 12; i++) {
		for(var j = 0; j < 50; j++) {
			var oDot = document.createElement('div');
			oDot.style.left = Math.cos(i * 30 * Math.PI / 180) * j * 6 + l + 'px';
			oDot.style.top = Math.sin(i * 30 * Math.PI / 180) * j * 6 + t + 'px';
			oCircle_line.appendChild(oDot);
		}
	}

	oWrap.onmouseenter = function() {
		document.onmousemove = function(ev) {
			var ev = ev || window.event;
			var y = (t - (ev.clientY - iStartY)) * 0.1;
			var x = (l - (ev.clientX - iStartX)) * 0.1;
			if(y > 20) {
				y = 20;
			} else if(y < -20) {
				y = -20;
			}
			if(x > 20) {
				x = 20;
			} else if(x < -20) {
				x = -20;
			}
			oMain.style.transform = 'rotateX(' + y + 'deg) rotateY(' + x + 'deg)';
		}
	}
	oWrap.onmouseleave = function() {
		oMain.style.transform = 'rotateX(0deg) rotateY(0deg)';
		document.onmousemove = null;
	}
	create_data(child_data);
	create_data(child_data1);
	create_data(child_data2);
	create_data(child_data3);
	create_data(child_data4);
	create_data(child_data5);
	create_data(child_data6);
	create_data(child_data7);

	function create_data(data) {

		for(var i = 0; i < data.length; i++) {
			var oG = createTag('g', {
				style: 'corsur:pointer'
			});
			if(data[i].text) {
				var oText = createTag('text', {
					x: data[i].text.x,
					y: data[i].text.y,
					fill: 'rgba(255,255,255,0.6)',
					'font-size': 14,
					transform: 'rotate(' + data[i].text.rotate + ',' + data[i].text.x + ',' + data[i].text.y + ')'
				});
				oText.innerHTML = data[i].text.cont;
				oG.appendChild(oText);
			}
			if(data[i + 1] && data[i + 1].circle.line != 'none') {
				oG.appendChild(createTag('line', {
					x1: data[i].circle.x,
					y1: data[i].circle.y,
					x2: data[i + 1].circle.x,
					y2: data[i + 1].circle.y,
					'stroke': 'rgba(205,228,232,0.6)',
					'stroke-width': '2'
				}));
			}
			if(data[i].circle && data[i].circle.dot !== 'none') {
				oG.appendChild(createTag('circle', {
					cx: data[i].circle.x,
					cy: data[i].circle.y,
					r: data[i].circle.size,
					'fill': 'rgba(205,228,232,1)',
					'stroke': 'rgba(227,158,158,1)',
					'stroke-width': '3'
				}));
			}
			oSvg.appendChild(oG);
		}
	}

	function createTag(tag, objAttr) {
		var oTag = document.createElementNS('http://www.w3.org/2000/svg', tag);
		for(var attr in objAttr) {
			oTag.setAttribute(attr, objAttr[attr]);
		}
		return oTag;
	}

	function getStyle(obj, attr) {
		return obj.currentStyle ? obj.currentStyle(attr) : getComputedStyle(obj, false)[attr];
	}
	
}