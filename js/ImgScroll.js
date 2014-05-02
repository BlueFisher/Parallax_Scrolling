/*!
 * Copyright 2013 视差滚动网页创新小组
 * 代码作者 : Fisher
 */

// 跑马灯图片滚动模块
ImgScroll = {
	"imgUl": null, // ul的img列表
	"img": null,
	"buttom": null,
	"sum": 0,
	"currentNo": 0, // 当前的img，从0开始
	"imgWidth": 0,
	"clear": null, // 作为setTimeOut的全局变量
	"initialize": function(thisUl, buttom) {
		this.imgUl = thisUl;
		this.img = thisUl.getElementsByTagName("img");
		this.buttom = buttom;
		this.sum = this.img.length;
		this.imgWidth = this.img[0].width;
		this.scrollStart(0);
		this.imgUl.onmousemove = this.mousemove;
		this.imgUl.onmouseout = this.mouseout;
	},
	"scrollStart": function(arg) {
		clearTimeout(this.clear);
		//this.buttom[this.currentNo].style.background = "blue";
		this.img[this.currentNo].style.opacity = 0.25;
		switch (arg) {
			case "left":
				this.currentNo--; //--为整体向右
				break;
			case "right":
				this.currentNo++; //--为整体向左
				break;
			default:
				this.currentNo = arg;
		}
		if (this.currentNo < 0) {
			this.currentNo = this.sum - 1;
		} else if (this.currentNo > this.sum - 1) {
			this.currentNo = 0;
		}
		this.imgUl.style.left = (-this.currentNo * this.imgWidth) + "px";
		//this.buttom[this.currentNo].style.background = "red";
		this.img[this.currentNo].style.opacity = 1;
		this.clear = setTimeout(function() {
			ImgScroll.scrollStart(ImgScroll.currentNo + 1)
		}, 2000);
	},
	"mousemove": function() {
		clearTimeout(ImgScroll.clear);
	},
	"mouseout": function() {
		ImgScroll.clear = setTimeout(function() {
			ImgScroll.scrollStart(ImgScroll.currentNo + 1)
		}, 2000);
	},
}