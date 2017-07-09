/* 
getStyle	获取样式兼容
getPosition 获取绝对位置
bind 		事件绑定兼容
drag		拖拽
onWheel		滚轮事件兼容
setCookie	设置cookie
getCookie	获取cookie
removeCookie删除cookie
*/
function getStyle( obj, attr ){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
}

function getPosition( obj ){
	var left = 0;
	var elem = obj;
	var div3B = parseInt(getComputedStyle(obj).borderLeftWidth);
	while(elem){
		left += elem.offsetLeft + parseInt(getComputedStyle(elem).borderLeftWidth)
		elem = elem.offsetParent;
	}
	left -= div3B;	
	return left;
}

function bind(obj, evname, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evname, fn, false);
	} else {
		obj.attachEvent('on' + evname, function() {
			fn.call(obj);
		});
	}
}

function drag(obj) {
	obj.onmousedown = function(ev) {
		var ev = ev || event;
		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;
		if ( obj.setCapture ) {
			obj.setCapture();
		}
		document.onmousemove = function(ev) {
			var ev = ev || event;
			obj.style.left = ev.clientX - disX + 'px';
			obj.style.top = ev.clientY - disY + 'px';
		}
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			if ( obj.releaseCapture ) {
				obj.releaseCapture();
			}
		}
		return false;
	}
}

function onWheel( obj,fn ){
	obj.onmousewheel = fn1;
	if (obj.addEventListener) {
		obj.addEventListener('DOMMouseScroll', fn1, false);
	}
	function fn1(ev) {
		var ev = ev || event;
		var b = true;
		if (ev.wheelDelta) {
			b = ev.wheelDelta > 0 ? true : false;
		} else {
			b = ev.detail < 0 ? true : false;
		}
		fn( b );
		if (ev.preventDefault) {
			ev.preventDefault();
		}
		return false;
	}
}

function setCookie(key, value, t) {
	var oDate = new Date();
	oDate.setDate( oDate.getDate() + t );
	document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}

function getCookie(key) {
	var arr1 = document.cookie.split('; ');
	for (var i=0; i<arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if ( arr2[0] == key ) {
			return decodeURI(arr2[1]);
		}
	}
}

function removeCookie(key) {
	setCookie(key, '', -1);
}