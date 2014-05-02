/*
 * Copyright 2013 视差滚动网页创新小组
 * 代码作者 : Fisher
 * 视差滚动核心模块
 */

// Layer类
function Layer(obj, leftSpeed, topSpeed, startPosition) {
	this.obj = obj;
	this.hLeft = 0;
	this.hTop = 0;
	this.leftSpeed = leftSpeed; // 每次滚动左移leftSpeed px
	this.topSpeed = topSpeed; // 每次滚动上升topSpeedpx
	this.startPosition = startPosition;
	this.setPosition(0, 0);
};
Layer.DEFAULT_SPEED = 100;
Layer.prototype.setPosition = function(left, top) {
	this.hLeft = left;
	this.hTop = top;
	this.obj.style.webkitTransform = "translate(" + left + "px, " + top + "px)";
	this.obj.style.transform = "translate(" + left + "px, " + top + "px)";
};

// 更简单的创建Layer
var scrollDiv = [];

function CreateLayer(obj, leftSpeed, topSpeed, startPosition) {
	scrollDiv.push(new Layer(obj, leftSpeed, topSpeed, startPosition));
}

// 所有关于定位的对象 用JSON模拟静态类
Locate = {
	"dragble": true,
	// 当前位置
	"position": 0,
	"maxPosition": 0,
	// 判断鼠标滚轮向上滚1向下滚-1
	"UporDown": function(event) {
		detail = event.detail ? event.detail / 3 : -event.wheelDelta / 120; // 前支持FF 后支持Chrome IE
		return detail > 0 ? Math.ceil(detail) : Math.floor(detail); // 支持笔记本的触摸板
	},
	"mouseUpdatePosition": function(event) {
		if (Locate.dragble) {
			Locate.positionCenter(parseInt(Locate.position) + Locate.UporDown(event)); // parseInt 是在drag以后恢复整数值
		}
	},
	"updatePosition": function(position) {
		for (i = 0; i < Node.nodeInfo.length - 1; i++) {
			if (position >= Node.nodeInfo[i].nodeValue && position < Node.nodeInfo[i + 1].nodeValue) { // 当在两个nodeValue中间时改变
				Node.changeStyle(i);
				break;
			}
		}
		for (i in scrollDiv) {
			var left = 0;
			var top = 0;
			if (scrollDiv[i].startPosition <= position) {
				if (Locate.position < scrollDiv[i].startPosition) {
					left = (scrollDiv[i].startPosition - position).toFixed(2) * scrollDiv[i].leftSpeed + scrollDiv[i].hLeft;
					top = (scrollDiv[i].startPosition - position).toFixed(2) * scrollDiv[i].topSpeed + scrollDiv[i].hTop;
				} else {
					left = (Locate.position - position).toFixed(2) * scrollDiv[i].leftSpeed + scrollDiv[i].hLeft;
					top = (Locate.position - position).toFixed(2) * scrollDiv[i].topSpeed + scrollDiv[i].hTop;
				}
			} else {
				left = 0;
				top = 0;
			}
			scrollDiv[i].setPosition(left, top);
		}
		Locate.position = position;
	},
	/**
	 * 关于定位 节点 滚动条的控制中心
	 * @param  {Number} Locate.position (不是 Pulley.left)
	 * 更新Loacate Node and Handle的位置
	 */
	"positionCenter": function(position) {
		if (position >= 0 && position <= Locate.maxPosition) {
			Locate.updatePosition(position);
			Handle.setPositionX(position * Handle.step);
		} else if (position < 0) { // 在position处于0到1之间并且想归位0时能够归位0
			Locate.updatePosition(0);
			Handle.setPositionX(0);
		}
		// DEBUG //
		$("debug").getElementsByTagName("p")[0].innerHTML = Locate.position;
		// DEBUG //
	}
};

// 导航栏的节点
Node = {
	"nodeInfo": [ /*{nodeObj : nodeObj , nodeValue : nodeValue}*/ ],
	"currentNode": 0,
	"setNode": function(elementArray, nodeArray) {
		obj = elementArray;
		for (i = 0; i < nodeArray.length; i++) {
			Node.nodeInfo.push({
				nodeObj: obj[i],
				nodeValue: nodeArray[i]
			});
			obj[i].onclick = (function(x) {
				return function() {
					Locate.positionCenter(nodeArray[x]);
				}
			})(i)
		}
		Node.nodeInfo.push({
			nodeObj: null,
			nodeValue: nodeArray[i - 1] + 1
		}); // 为了判断在updatePosition时是否在两个node中间
	},
	"changeStyle": function(No) {
		Node.nodeInfo[Node.currentNode].nodeObj.className = "";
		Node.nodeInfo[No].nodeObj.className = "current";
		Node.currentNode = No;
	}
};