/*!
 * Copyright 2013 视差滚动网页创新小组
 * 代码作者 : Fisher
 */

// 基础加载模块
function $(id) {
	var obj = document.getElementById(id);
	return obj ? obj : false;
};

//获取当前计算之后的CSS
// function getCurrentStyle(node) {
// 	var style = null;
// 	if (window.getComputedStyle) {
// 		style = window.getComputedStyle(node, null);
// 	} else {
// 		style = node.currentStyle;
// 	}
// 	return style;
// }

window.onload = function() {
	Locate.maxPosition = 115;
	Node.setNode($("nav").getElementsByTagName("li"), [0,19, 30, 69, 106]);
	Handle.initialize($("scrollbar_handle"));
	$("scrollbar_track").style.width = (document.documentElement.clientWidth - 470) + "px";
	Handle.step = (document.documentElement.clientWidth - 470 - 50) / Locate.maxPosition;
	ImgScroll.initialize($("imgscroll").getElementsByTagName("ul")[0], null);
	if (window.addEventListener) {
		document.addEventListener('DOMMouseScroll', Locate.mouseUpdatePosition, false); //ff
	}
	document.onmousewheel = Locate.mouseUpdatePosition; //chrome,ie
	
	CreateLayer($("residential_logo"), 70, 0, 0);
	CreateLayer($("container"), Layer.DEFAULT_SPEED, 0, 0);
	CreateLayer($("home_bg"), 50, -50, 0, 1);
	CreateLayer($("introduction_bg"), 50, 0, 15);
	CreateLayer($("hope_words"), -20, 0, 21);
	CreateLayer($("emblem"), 10, 0, 26);
	
};
window.onresize = function() {
	$("scrollbar_track").style.width = (document.documentElement.clientWidth - 470) + "px";
	Handle.step = (document.documentElement.clientWidth - 470 - 50) / Locate.maxPosition; //使浏览器在缩放时动态改变Handle的步长
	Handle.setPositionX(Locate.position * Handle.step); //前面只是改变数据，只会在下次滑动实现，现在可以真正动态更新
};