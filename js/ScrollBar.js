/*!
 * Copyright 2014 视差滚动网页创新小组
 * 代码作者 : Fisher
 */

// 导航栏的滚动条滑块
Handle = {
	"dragble": false,
	"obj": null,
	"left": 0,
	"top": 0,
	"step": 0,
	"initialize": function(obj) {
		Handle.obj = obj;
		Handle.obj.onmousedown = Handle.mousedown;
		Handle.obj.ondragstart = Handle.dragstart;
	},
	setPositionX: function(left) {
		left = left.toFixed(2);
		Handle.obj.style.left = left + "px";
		Handle.left = left;
	},
	"mousemove": function(event) {
		if (Handle.dragble) {
			Locate.positionCenter(((event.pageX - startX) / Handle.step).toFixed(2));
		}
	},
	"mousedown": function(event) {
		startX = event.pageX - Handle.left;
		Handle.dragble = true;
		document.onmousemove = Handle.mousemove;
		document.onmouseup = Handle.mouseup;
		for (i in scrollDiv) {
			scrollDiv[i].obj.style.transition = "none";
		}
	},
	"mouseup": function() {
		Handle.dragble = false;
		for (i in scrollDiv) {
			scrollDiv[i].obj.style.transition = "all 0.3s ease";
		}
	},
	"dragstart": function() {
		return false;
	},
}