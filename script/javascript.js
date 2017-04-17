window.onload = function(){
	mv.app.winSize();
	mv.app.fontSize();
	mv.app.lineHeihgt();
	mv.app.onmouseWork();
	mv.app.onmouseShare();
	mv.app.fadeIn();
	mv.app.inputPoint();
	mv.app.cover();
};
/////////////////////////////////////////////////////////////////
var mv = {};
mv.tools = {};
//事件绑定兼容处理
mv.tools.bind = function(obj,evname,fn){
	if (obj.addEventListener) {
		obj.addEventListener(evname, fn, false);
	} else {
		obj.attachEvent('on' + evname, function() {
			fn.call(obj);
		});
	}	
};
//根据class获取元素
mv.tools.getByClass = function(oParent,sClass){
	var aEle = oParent.getElementsByTagName('*');
	var arr = [];
	
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
};
//获取元素样式兼容处理
mv.tools.getStyle = function( obj, attr ) {
	 return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }
//////////////////////////////////////////////////////////////////
mv.ui = {};
//自适应line-height
mv.ui.lineHeight = function(elem,n){
	n = n ? n : 1;
	elem.style.lineHeight = elem.clientHeight/n + 'px';
};
//透明度渐变
mv.ui.opacity = function(obj, num, target, endFn) {
	num = mv.tools.getStyle(obj, 'opacity')*100 < target ? num : -num;
	clearInterval( obj.opacity );
	obj.opacity = setInterval(function () {
		var speed = parseInt(mv.tools.getStyle(obj, 'opacity')*100) + num;
		if ( speed > target && num > 0 || speed < target && num < 0 ) {
			speed = target;
		}
		obj.style.opacity = speed/100;
		obj.style.filter = 'alpha(opacity='+ speed +')';
		if ( speed == target ) {
			clearInterval( obj.opacity );
			endFn && endFn();
		}
	}, 20);
}
mv.ui.textInput = function(obj){
	var text = obj.value;
	obj.onfocus = function(){
		if(this.value == text){this.value = '';}
	}
	obj.onblur = function(){
		if(this.value == ''){this.value = text;}	
	}
};
//元素移动
mv.ui.doMove = function( obj, attr, dir, target, endFn ) {
	dir = parseInt(mv.tools.getStyle( obj, attr )) < target ? dir : -dir;
	clearInterval( obj.timer );
	obj.timer = setInterval(function () {
		var speed = parseInt(mv.tools.getStyle( obj, attr )) + dir;	
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		obj.style[attr] = speed + 'px';
		if ( speed == target ) {
			clearInterval( obj.timer );
			endFn && endFn();
		}
	}, 30);
};
mv.ui.doMove2 = function( obj, attr, dir, target, endFn ) {
	dir = parseInt(mv.tools.getStyle( obj, attr )) < target ? dir : -dir;
	clearInterval( obj.timer2 );
	obj.timer2 = setInterval(function () {
		var speed = parseInt(mv.tools.getStyle( obj, attr )) + dir;	
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		obj.style[attr] = speed + 'px';
		if ( speed == target ) {
			clearInterval( obj.timer2 );
			endFn && endFn();
		}
	}, 30);
};
//绝对位置
mv.ui.boundLeft = function(obj){
	var left = 0;
	var elem = obj;
	var objBL = parseInt(mv.tools.getStyle(obj,'borderLeftWidth'));
	while(elem){
		left += elem.offsetLeft + parseInt(mv.tools.getStyle(obj,'borderLeftWidth'));
		elem = elem.offsetParent;
	}
	left -= objBL;	
	return left;
};
mv.ui.boundTop = function(obj){
	var top = 0;
	var elem = obj;
	var objBT = parseInt(mv.tools.getStyle(obj,'borderTopWidth'));
	while(elem){
		top += elem.offsetTop + parseInt(mv.tools.getStyle(obj,'borderTopWidth'));
		elem = elem.offsetParent;
	}
	top -= objBT;
	return top;
};		


////////////////////////////////////////////////////////////////////////
mv.app = {};
//自适应宽高
mv.app.winSize = function(){
	document.body.style.height =  document.body.offsetWidth*4.073125 + 'px';	
	mv.tools.bind(window,'resize',function(){
		document.body.style.height =  document.body.offsetWidth*4.073125 + 'px';			
	});
};
//自适应字体大小
mv.app.fontSize = function(){
	document.body.style.fontSize = 	document.body.offsetWidth*62.5/1600 + '%';
	mv.tools.bind(window,'resize',function(){
		document.body.style.fontSize = 	document.body.offsetWidth*62.5/1600 + '%';		
	});
};
//自适应line-height
mv.app.lineHeihgt = function(){
//header
	var header = document.getElementById('header')
	var headerH2 = header.getElementsByTagName('h2')[0];
	mv.ui.lineHeight(headerH2);
	mv.tools.bind(window,'resize',function(){
		mv.ui.lineHeight(headerH2);		
	});
	
	var oTop = mv.tools.getByClass(header,'top')[0];
	var aATop = oTop.getElementsByTagName('a');
	for(var i=0;i<aATop.length;i++){
		mv.ui.lineHeight(aATop[i]);		
	}
	
	mv.tools.bind(window,'resize',function(){
		for(var i=0;i<aATop.length;i++){
			mv.ui.lineHeight(aATop[i]);		
		}		
	});
	
	var oDivWelcome = mv.tools.getByClass(header,'welcome')[0];
	var oPWelcome = oDivWelcome.getElementsByTagName('p')[0];
	mv.ui.lineHeight(oPWelcome,2);	
	mv.tools.bind(window,'resize',function(){
		mv.ui.lineHeight(oPWelcome,2);		
	})
//content1
	var oContent1 = document.getElementById('content1');
	var oContent1Title = mv.tools.getByClass(oContent1,'title')[0];
	mv.ui.lineHeight(oContent1Title);
	mv.tools.bind(window,'resize',function(){
		mv.ui.lineHeight(oContent1Title);		
	})

//content2
	var oContent2 = document.getElementById('content2');
	var date_class = mv.tools.getByClass(oContent2,'date')[0];
	mv.ui.lineHeight(date_class);
	mv.tools.bind(window,'resize',function(){
		mv.ui.lineHeight(date_class);		
	})
	var page_class = mv.tools.getByClass(oContent2,'page')[0];
	mv.ui.lineHeight(page_class);
	mv.tools.bind(window,'resize',function(){
		mv.ui.lineHeight(page_class);		
	})
	
//content3 
	var oMission = document.getElementById('mission');
	var aMissionH = oMission.getElementsByTagName('h4');
	for(var i=0;i<aMissionH.length;i++){
		mv.ui.lineHeight(aMissionH[i]);	
	}
	mv.tools.bind(window,'resize',function(){
		for(var i=0;i<aMissionH.length;i++){
			mv.ui.lineHeight(aMissionH[i]);		
		}		
	});
//content5
	var oContent5 = document.getElementById('content5');
	var aInput5 = oContent5.getElementsByTagName('input');
	for(var i=0;i<aInput5.length;i++){
		mv.ui.lineHeight(aInput5[i]);	
	}
	mv.tools.bind(window,'resize',function(){
		for(var i=0;i<aInput5.length;i++){
			mv.ui.lineHeight(aInput5[i]);	
		}		
	});
//footer
	var oCopy = document.getElementById('copy');	
	mv.ui.lineHeight(oCopy);
	mv.tools.bind(window,'resize',function(){
		mv.ui.lineHeight(oCopy);		
	});
};

//header work的onmouseover
mv.app.onmouseWork = function(){
	var oContent1 = document.getElementById('content1');
	var work_class = mv.tools.getByClass(oContent1,'work')[0];
	var aContent1A = work_class.getElementsByTagName('a');
	for(var i=0;i<aContent1A.length;i++){
		aContent1A[i].onmouseover = function(){
			this.parentNode.style.backgroundImage = 'url(images/content1-2.png)';
		};
		aContent1A[i].onmouseout = function(){
			this.parentNode.style.backgroundImage = 'url(images/content1-1.png)';
		};		
	}
};

//facebook,google等得onmouseover变色
mv.app.onmouseShare = function(){
	var oContent4 =document.getElementById('content4');	
	var aC4_Li1 = oContent4.getElementsByTagName('li');
	var arr = [];
	for(var i=0;i<aC4_Li1.length;i++){
		var aC4_Li2 =  aC4_Li1[i].getElementsByTagName('li');
		for(var j=0;j<aC4_Li2.length;j++){
			arr.push(aC4_Li2[j]);
		}
	}
	
	for(var i=0;i<arr.length;i++){
		arr[i].index = i;
		arr[i].onmouseover = function(){
			switch(this.index%3){
				case 0:
						this.children[0].children[0].src = 'images/content4img/f2.png';
						break;
				case 1:
						this.children[0].children[0].src = 'images/content4img/t2.png';
						break;
				case 2:
						this.children[0].children[0].src = 'images/content4img/g2.png';
						break;
			}			
		};
		arr[i].onmouseout = function(){
			switch(this.index%3){
				case 0:
						this.children[0].children[0].src = 'images/content4img/f.png';
						break;
				case 1:
						this.children[0].children[0].src = 'images/content4img/t.png';
						break;
				case 2:
						this.children[0].children[0].src = 'images/content4img/g.png';
						break;
			}			
		};
	}
};
//首页大图渐变切换以及各种连锁作用
mv.app.fadeIn = function(){
	var oHeader = document.getElementById('header');
	var oWindow = mv.tools.getByClass(oHeader,'window')[0];
	var oTop = mv.tools.getByClass(oHeader,'top')[0];
	var oWelcome = mv.tools.getByClass(oHeader,'welcome')[0];
	var aLi = oWindow.getElementsByTagName('li');
	var prev = oWindow.children[0];
	var next = oWindow.children[1];
	var timer = null;
	var num = 0;
	//没三秒换一次图
	function tab(){
		mv.ui.opacity(aLi[num],5,0);
		num = num==aLi.length-1 ? 0 : num+1 ;
		mv.ui.opacity(aLi[num],5,100);
	}
	function tabback(){
		mv.ui.opacity(aLi[num],5,0);
		num = num==0 ? aLi.length-1 : num-1;
		mv.ui.opacity(aLi[num],5,100);
	}
	timer =setInterval(tab,3000);
	//箭头鼠标移入，变不透明且停止定时器
	prev.onmouseover = function(){
		clearInterval(timer);
		mv.ui.opacity(this,5,100);	
	};
	next.onmouseover = function(){
		clearInterval(timer);
		mv.ui.opacity(this,5,100);	
	};
	
	//箭头鼠标移开，变透明开始计时器	
	prev.onmouseout = function(){
		timer =setInterval(tab,3000);
		mv.ui.opacity(this,5,50);	
	};
	next.onmouseout = function(){
		timer =setInterval(tab,3000);
		mv.ui.opacity(this,5,50);	
	};
	//箭头点击切换图片
	prev.onclick = function(){
		tabback();	
	};
	next.onclick = function(){
		tab();	
	};
	//heade top部分鼠标移入移出透明度
	oTop.onmouseover = function(){
		mv.ui.opacity(this,5,100);	
	};
	oTop.onmouseout = function(){
		mv.ui.opacity(this,5,50);	
	};
	//header welcome部分鼠标移入移出透明度
	oWelcome.onmouseover = function(){
		mv.ui.opacity(this,5,100);	
	};
	oWelcome.onmouseout = function(){
		mv.ui.opacity(this,5,50);	
	};
	
};

//content5表单输入提示
mv.app.inputPoint = function(){
	var oContent5 = document.getElementById('content5');
	var aInput5 = oContent5.getElementsByTagName('input');	
	for(var i=0;i<aInput5.length-1;i++){
		mv.ui.textInput(aInput5[i]);	
	}
	
};
//footer部分图片遮罩层 
//这个效果暂时舍弃
/*mv.app.cover =  function(){
	var footer = document.getElementById('footer');
	var oUl = footer.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	for(var i=0;i<aLi.length;i++){
		aLi[i].onOff =true;
		aLi[i].onmouseover = function(ev){
			if(!this.onOff){return;}
			var scrollleft=document.documentElement.scrollLeft||document.body.scrollLeft;
			var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
			var ev = ev||event;
			var clientx = ev.clientX + scrollleft;
			var clienty = ev.clientY + scrolltop;
			var left = mv.ui.boundLeft(this);
			var top = mv.ui.boundTop(this);
			var clientwidth = this.clientWidth;
			var clientheight = this.clientHeight;
			var dirX = clientwidth/10;
			var dirY = clientheight/10;
			var targetX = this.clientWidth;
			var targetY =this.clientHeight;
			var obj = this.children[1];
			if(clientx < left+20){
				this.onOff = false;
				obj.style.top = '0';
				obj.style.left = '-100%';
				mv.ui.doMove(obj,'left',dirX,0);	
			}
			if(clientx > left+clientwidth-20){
				this.onOff = false;
				obj.style.top = '0';
				obj.style.left = '100%';
				mv.ui.doMove(obj,'left',dirX,0);	
			}
			if(clienty < top+20){
				this.onOff = false;
				obj.style.top = '-100%';
				obj.style.left = '0';
				mv.ui.doMove(obj,'top',dirY,0);	
			}
			if(clienty > top+clientheight-20){
				this.onOff = false;
				obj.style.top = '100%';
				obj.style.left = '0';
				mv.ui.doMove(obj,'top',dirY,0);	
			}
		};
		
		
		
	}
	
}*/


mv.app.cover = function(){
	var footer = document.getElementById('footer');	
	var oUl = footer.getElementsByTagName('ul')[0];
	var oCover = footer.getElementsByTagName('div')[0];
	var aLi =oUl.getElementsByTagName('li');
	var onOff = true;
	oUl.onmouseover = function(){
		oCover.style.display = 'block';	
	};
	oUl.onmouseout = function(){
		oCover.style.display = 'none';
	};
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i].onmouseover = function(ev){
			var ev = ev||event;
			clearInterval(oCover.timer1);
			clearInterval(oCover.timer2);
			var X = ((this.index%4)/4)*oUl.clientWidth;
			var Y = Math.floor((this.index)/4)/2*oUl.clientHeight;
			var coverPositionX = parseInt(mv.tools.getStyle(oCover,'left'));
			var coverPositionY =parseInt(mv.tools.getStyle(oCover,'top'));
			var dirX = X-coverPositionX>0 ? X-coverPositionX : coverPositionX-X;
			var dirY = Y-coverPositionY>0 ? Y-coverPositionY : coverPositionY-Y;
			mv.ui.doMove(oCover,'left',dirX/8,X);
			mv.ui.doMove2(oCover,'top',dirY/8,Y);
		};
		aLi[i].onmouseout = function(){
			
		};
	}
	
};
