window.onload = function(){
	mv.app.navMove();
	mv.app.menuOnOff();
	mv.app.movieMenuOnOff();
	mv.app.scrollFade();
	mv.app.sakuraScroll();
	mv.app.scrollImage();
	if( window.navigator.userAgent.toLowerCase().indexOf('mobile')==-1 ){
		mv.app.carousel();
	}else{
		mv.app.carouselMobile();
	}
	
	if( window.navigator.userAgent.toLowerCase().indexOf('mobile')==-1 ){
		mv.app.player();
	}else{
		mv.app.playerMobile();
	}
	mv.app.loadHTML();
	
};

var mv = {};

mv.tools = {};

mv.ui = {};

mv.app = {};

//导航菜单移动到指定部分
mv.app.navMove = function(){
	var oNav = document.getElementsByClassName('nav')[0];
	var aNavs = oNav.getElementsByTagName('a');
	var oNavSwitch = document.querySelector('.nav-switch');
	var oMovie = document.getElementById('movie');
	var oStory = document.getElementById('story');
	var oCharacter = document.getElementById('character');
	var oGallery = document.getElementById('gallery');
	if( document.documentElement.scrollTop ){
		var elem = document.documentElement;
	}else{
		var elem = document.body;
	}
	
	aNavs[0].addEventListener( 'click',function(){
		oNav.classList.remove('nav-on');
		oNavSwitch.classList.remove('nav-switch-on');
		oNav.onOff = true;
		var scrollTop = elem.scrollTop;
		MTween({
			el:elem,
			target: { scrollTop:oMovie.getBoundingClientRect().top + scrollTop },
			time: 1000,
			type: 'easeBoth'	
		});
	} );
	aNavs[1].addEventListener( 'click',function(){
		oNav.classList.remove('nav-on');
		oNavSwitch.classList.remove('nav-switch-on');
		oNav.onOff = true;
		var scrollTop = elem.scrollTop;
		MTween({
			el:elem,
			target: { scrollTop:oStory.getBoundingClientRect().top + scrollTop },
			time: 1000,
			type: 'easeBoth'	
		});
	} );
	aNavs[2].addEventListener( 'click',function(){
		oNav.classList.remove('nav-on');
		oNavSwitch.classList.remove('nav-switch-on');
		oNav.onOff = true;
		var scrollTop = elem.scrollTop;
		MTween({
			el:elem,
			target: { scrollTop:oCharacter.getBoundingClientRect().top + scrollTop },
			time: 1000,
			type: 'easeBoth'	
		});
	} );
	aNavs[3].addEventListener( 'click',function(){
		oNav.classList.remove('nav-on');
		oNavSwitch.classList.remove('nav-switch-on');
		oNav.onOff = true;
		var scrollTop = elem.scrollTop;
		MTween({
			el:elem,
			target: { scrollTop:oGallery.getBoundingClientRect().top + scrollTop },
			time: 1000,
			type: 'easeBoth'	
		});
	} );	
	
};

//导航菜单开关按钮
mv.app.menuOnOff = function(){
	var oSwitch = document.querySelector('.nav-switch');
	var oNav = document.querySelector('.nav');
	var oNavSwitch = document.querySelector('.nav-switch');
	oNav.onOff = true;
	oSwitch.addEventListener('click',function(){
		if(oNav.onOff){
			oNav.classList.add('nav-on');
			oNavSwitch.classList.add('nav-switch-on');
			oNav.onOff = !oNav.onOff;
		}else{
			oNav.classList.remove('nav-on');
			
			oNavSwitch.classList.remove('nav-switch-on');
			oNav.onOff = !oNav.onOff;
		}
		
	});	
};

//movie部分下拉菜单部分
mv.app.movieMenuOnOff = function(){
	var oMovieMenuTitle = document.querySelector('.movie-inner-episode');
	var oMovieMenuMark = document.querySelector('.movie-inner-episode-mark');
	var oMovieInner = document.querySelector('.movie-episode-inner');
	var oMovieMenu = document.querySelector('.movie-inner-episode-content');
	var oMovieMenuClose = document.querySelector('.movie-inner-episode-content-close');
	var onOff = true;
	oMovieMenuTitle.addEventListener('click',function(){
		var innerHeight = oMovieInner.clientHeight;
		if(onOff){
			oMovieMenuMark.classList.add('switch-on');
			MTween({
				el:	oMovieMenu,
				target: { height:innerHeight },
				type: 'easeBoth',
				time: 1000
			});
			onOff = !onOff;
		}else{
			oMovieMenuMark.classList.remove('switch-on');	
			MTween({
				el:	oMovieMenu,
				target: { height:0 },
				type: 'easeBoth',
				time: 1000
			});
			onOff = !onOff;
		}
		
	});
	oMovieMenuClose.addEventListener('click',function(){
		oMovieMenuMark.classList.remove('switch-on');	
		MTween({
			el:	oMovieMenu,
			target: { height:0 },
			type: 'easeBoth',
			time: 1000
		});	
		onOff = true;
	});

};

//滚动淡出
mv.app.scrollFade = function(){
	var aUpApp = document.querySelectorAll('.upApp');
	var htmlH = document.documentElement.clientHeight;
	window.addEventListener('scroll',scrollFade);
	window.addEventListener('resize',scrollFade);
	function scrollFade(){
		for(var i=0;i<aUpApp.length;i++){
			var UpTop = aUpApp[i].getBoundingClientRect().top;
			var UpHeight = 100;
			if( UpTop<htmlH-UpHeight&&UpTop>0 ){
				aUpApp[i].classList.add('upAppDone');	
			}else if( UpTop<0 ){
				continue;	
			}	
		}	
	};
};

//樱花立体背景
mv.app.sakuraScroll = function(){
	var sakuraBack = document.querySelectorAll('.sakura-bg-back');
	var sakuraMiddle = document.querySelectorAll('.sakura-bg-middle');
	var sakuraFront = document.querySelectorAll('.sakura-bg-front');
	window.addEventListener('scroll',sakuraScroll);
	window.addEventListener('resize',sakuraScroll);
	
	function sakuraScroll(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var backScroll = scrollTop*1.03632;
		var middleScroll = scrollTop*1.22473;
		var frontScroll = scrollTop*1.41321;
		for(var i=0;i<sakuraBack.length;i++){
			sakuraBack[i].style.backgroundPosition = 'center top ' + Math.round(backScroll) + 'px';	
		}
		for(var i=0;i<sakuraMiddle.length;i++){
			sakuraMiddle[i].style.backgroundPosition = 'center top ' + Math.round(middleScroll) + 'px';	
		}
		for(var i=0;i<sakuraFront.length;i++){
			sakuraFront[i].style.backgroundPosition = 'center top ' + Math.round(frontScroll) + 'px';	
		}
	}
};
//无限滚动图片
mv.app.scrollImage = function(){
	var oScrollImg = document.getElementById('scrollimages');
	var positionX = 0;
	setInterval(function(){
		var speed = positionX - 1 ;
		oScrollImg.style.backgroundPosition = 'left ' + speed + 'px' + ' center';
		positionX = speed;			
	},25);
};
//轮播图PC端
mv.app.carousel = function(){
	var oGallerySlide = document.getElementById('gallery-slide');
	var oGalleryImage = document.getElementById('gallery-images');		
	var oGalleryLeft = document.getElementById('gallery-left');
	var oGalleryRight = document.getElementById('gallery-right');
	var oGalleryDot = document.getElementById('gallery-dots');
	var aDot = oGalleryDot.children;
	var aDotLength = aDot.length;
	var oGalleryCountNumber = document.getElementById('gallery-count-numer');
	var index = 0;
	var galleryW = oGallerySlide.clientWidth;
	css(oGalleryImage,'translateZ',0.01);
	oGalleryLeft.addEventListener('click',function(){
		index--;
		if(index==-1){
			index = 8;
			css(oGalleryImage,'translateX',-index*galleryW);
			index--;	
		}
		MTween({
			el:oGalleryImage,
			target:{ translateX: -index*galleryW },
			type: 'easeBoth',
			time: 1000,
		});
		for( var i=0;i<aDotLength;i++ ){
			aDot[i].className = '';	
		}
		aDot[index%aDotLength].className = 'active';
		oGalleryCountNumber.innerHTML = index%aDotLength+1;
	});
	oGalleryRight.addEventListener('click',function(){
		index++;
		if(index==16){
			index = 7;
			css(oGalleryImage,'translateX',-index*galleryW);
			index++;	
		}
		MTween({
			el:oGalleryImage,
			target:{ translateX: -index*galleryW },
			type: 'easeBoth',
			time: 1000,
		});
		for( var i=0;i<aDotLength;i++ ){
			aDot[i].className = '';	
		}
		aDot[index%aDotLength].className = 'active';
		oGalleryCountNumber.innerHTML = index%aDotLength+1;
	});
	
};
//轮播图移动端
mv.app.carouselMobile = function(){
	var oGallerySlide = document.getElementById('gallery-slide');
	var oGalleryImage = document.getElementById('gallery-images');	
	var oGalleryDot = document.getElementById('gallery-dots');
	var aDot = oGalleryDot.children;	
	var aDotLength = aDot.length;
	var oGalleryCountNumber = document.getElementById('gallery-count-numer');
	var index = 0;
	var galleryW = oGallerySlide.clientWidth;
	var startPoint = 0;
	var startX = 0;
	oGalleryImage.style.width = 16*galleryW + 'px';
	oGalleryImage.addEventListener('touchstart',function(ev){
		oGalleryImage.style.transition = 'none';
		startPoint = ev.changedTouches[0].pageX;
		startX = css(oGalleryImage,'translateX');
		index = Math.round(-startX/galleryW);
		if( index==0 ){
			index = 8;
		}else if( index==15 ){
			index = 7;
		}
		css(oGalleryImage,'translateX',-index*galleryW);
		startX = css(oGalleryImage,'translateX');
	});
	oGalleryImage.addEventListener('touchmove',function(ev){
		ev.preventDefault();
		var newPoint = ev.changedTouches[0].pageX;
		css(oGalleryImage,'translateX',newPoint-startPoint+startX);
	});
	oGalleryImage.addEventListener('touchend',function(ev){
		endX = css(oGalleryImage,'translateX');
		index = Math.round(-endX/galleryW);
		oGalleryImage.style.transition = '0.5s';
		css(oGalleryImage,'translateX',-index*galleryW);
		for( var i=0;i<aDotLength;i++ ){
			aDot[i].className = '';	
		}
		aDot[index%aDotLength].className = 'active';
		oGalleryCountNumber.innerHTML = index%aDotLength+1;
	});
};

//播放器
mv.app.player = function(){
	var oPlayer = document.getElementById('player');
	var oVedio = document.getElementById('v1');
	var oPlayer1 = document.getElementById('player1');
	var oPlayer2 = document.getElementById('player2');
	var oClose = document.querySelector('.glyphicon-remove');
	var oPlay = document.querySelector('#play');
	var oVolumeDown = document.querySelector('#volume-down');
	var oVolumeControl = document.querySelector('#volume-control');
	var oNowTime = document.querySelector('.nowtime');
	var oAllTime = document.querySelector('.alltime');
	var oSchedule = document.querySelector('.schedule');
	var oControl = document.querySelector('.control');
	var oFullscreen = document.getElementById('fullscreen');
	var oScheduleControl = oSchedule.children[0];
	var oRate = oVolumeControl.children[0];
	var onOff = true;
	var timer = null;
	
	oVedio.onmousemove = function(){
		clearInterval(this.timer);
		oControl.classList.remove('hidden');
		this.timer = setTimeout(function(){
			oControl.classList.add('hidden');	
		},2000);
	};
	oVedio.onmouseout = function(){
		clearInterval(this.timer);
		oControl.classList.remove('hidden');
	};
	oPlayer1.addEventListener('click',function(){
		oPlayer.style.display = 'block';
		oVedio.src = 'vedio/カップヌードルCM 「HUNGRY DAYS 魔女の宅急便 篇」 30秒.mp4';
		oVedio.load();
	});
	oPlayer2.addEventListener('click',function(){
		oPlayer.style.display = 'block';
		oVedio.src = 'vedio/カップヌードルCM 「HUNGRY DAYS 予告 篇」30秒.mp4';
		oVedio.load();
	});
	oClose.addEventListener('click',function(){
		oPlayer.style.display = 'none';	
		oVedio.src = '';
	});
	
	oVedio.oncanplay = function(){
		var oScheduleW = oSchedule.clientWidth;
		var volumeW = oVolumeControl.clientWidth;
		var	allTime = oVedio.duration;
		oAllTime.innerHTML = changeTime(allTime);
		console.log(1);
		//播放键
		oPlay.onclick = play;
		oVedio.onclick = play;
		//静音键
		oVolumeDown.onclick = function(){
			if(oVedio.muted){
				oVedio.muted = false;
				this.className = 'glyphicon glyphicon-volume-down';
			}else{
				oVedio.muted = true;
				this.className = 'glyphicon glyphicon-volume-off';
			}	
		};
		//音量控制
		oVolumeControl.onmousedown= function(ev){
			var ev = ev || event;
			var disX = ev.clientX - this.offsetLeft;
			oRate.style.width = disX + 'px';
			var This = this;
			oVedio.volume = Math.round(disX/volumeW*10)/10;
			document.onmousemove = function(ev){
				var disX = ev.clientX - This.offsetLeft;
				if(disX<0){
					disX = 0;				
				}else if(disX>volumeW){
					disX = volumeW;	
				}
				if(disX==0){
					oVedio.muted = true;
					oVolumeDown.className = 'glyphicon glyphicon-volume-off';	
				}else{
					oVedio.muted = false;
					oVolumeDown.className = 'glyphicon glyphicon-volume-down';	
				}
				oRate.style.width = disX + 'px';
				oVedio.volume = Math.round(disX/volumeW*10)/10;
			};
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;	
			};
			return false;
		};
		
		function changeTime(iNum){
			iNum = parseInt( iNum );
			var iH = toZero(Math.floor(iNum/3600));
			var iM = toZero(Math.floor(iNum%3600/60));
			var iS = toZero(Math.floor(iNum%60));
			return iH + ':' +iM + ':' + iS;
		}
		function toZero(num){
			if(num<=9){
				return '0' + num;
			}
			else{
				return '' + num;
			}
		}
		
		//全屏
		oFullscreen.onclick = function(){
			if(oVedio.webkitRequestFullScreen){
				oVedio.webkitRequestFullScreen();
			}else{
				oVedio.mozRequestFullScreen();
			}
		};
		//播放进度条
	
		oSchedule.onmousedown= function(ev){
			var ev = ev || event;
			var disX = ev.clientX - this.offsetLeft;
			oVedio.pause();
			clearInterval(timer);
			oScheduleControl.style.width = disX + 'px';
			var nowTime = (disX/oScheduleW)*allTime;
			oNowTime.innerHTML = changeTime(nowTime);
			var This = this;
			document.onmousemove = function(ev){
				disX = ev.clientX - This.offsetLeft;
				if(disX<0){
					disX = 0;				
				}else if(disX>oScheduleW){
					disX = oScheduleW;	
				}
				oScheduleControl.style.width = disX + 'px';
				var nowTime = (disX/oScheduleW)*allTime;
				oNowTime.innerHTML = changeTime(nowTime);
			};
			document.onmouseup = function(){
				oVedio.currentTime = parseInt(disX/oScheduleW*allTime);
				oVedio.play();	
				nowTimeRatio();
				document.onmousemove = document.onmouseup = null;
			};
			return false;
		};
		
		function nowTimeRatio(){
			timer = setInterval(function(){
				var nowTime = oVedio.currentTime;
				oScheduleControl.style.width = parseInt(nowTime/allTime*oScheduleW) + 'px';
				oNowTime.innerHTML = changeTime(nowTime);
			},1000);	
		}
		
		function play(){
			if(oVedio.paused){
				oVedio.play();
				oPlay.className = 'glyphicon glyphicon-pause';
				nowTimeRatio();
			}else{
				oVedio.pause();
				oPlay.className = 'glyphicon glyphicon-play';
				clearInterval(timer);
			}	
		}
	};
};
mv.app.playerMobile = function(){
	var oPlayer = document.getElementById('player');
	var oVedio = document.getElementById('v1');
	var oPlayer1 = document.getElementById('player1');
	var oPlayer2 = document.getElementById('player2');
	var oClose = document.querySelector('.glyphicon-remove');
	oVedio.innerHTML = '';
	oVedio.controls = true;
	oPlayer1.addEventListener('click',function(){
		oPlayer.style.display = 'block';
		oVedio.src = 'vedio/カップヌードルCM 「HUNGRY DAYS 魔女の宅急便 篇」 30秒.mp4';
		oVedio.load();
	});
	oPlayer2.addEventListener('click',function(){
		oPlayer.style.display = 'block';
		oVedio.src = 'vedio/カップヌードルCM 「HUNGRY DAYS 予告 篇」30秒.mp4';
		oVedio.load();
	});	
	oClose.addEventListener('click',function(){
		oPlayer.style.display = 'none';	
		oVedio.src = '';
	});
};

//开场动画
mv.app.loadHTML = function(){
	var oLoad = document.getElementById('load');
	var oMask = document.getElementById('mask');
	var oMainvisual = document.getElementById('mainvisual');
	var oDiv = oMask.children[0];
	var oImg = new Image();
	var num = 0;
	xunlei();
	function xunlei(){
		oImg.src = date[num];
		oImg.onload = function(){
			num++;
			if(num<date.length){
				xunlei();
			}else{
				MTween({
					el: oLoad,
					target: {opacity:0},
					type: 'linear',
					time:2000,
					callBack:function(){
						this.style.display = 'none';
						setTimeout(
							function(){
								MTween({
									el:oDiv,
									target:{width:'400',height:'400'},
									type: 'linear',
									time:2000,
									callBack:function(){
										setTimeout(function(){
											oDiv.style.transition = '2s linear';
											oDiv.className = 'scale-div';
											setTimeout(function(){
												if(document.documentElement.scrollTop){
													document.documentElement.scrollTop = 0;
												}else{
													document.body.scrollTop = 0;
												}
												MTween({
													el:oMask,
													target:{opacity:'0'},
													type:'linear',
													time:1000,
													callBack:function(){
														this.style.display = 'none';	
													}
												});
												MTween({
													el:oMainvisual,
													target:{opacity:'100'},
													type:'linear',
													time:1000	
												});	
											},1500);
										},1500);
									}	
								});
						},1000);
					}	
				});	
			}
			
		};
		
	}	
};
