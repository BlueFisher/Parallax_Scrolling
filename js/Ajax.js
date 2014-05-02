/*!
 * Copyright 2013 视差滚动网页创新小组
 * 代码作者 : Fisher
 */

// Ajax实现模块

Ajax = {
	"xmlHttp": "",
	"json": "",
	"createXMLHttpRequest" : function(){
		if (window.ActiveXObject) {
			this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			this.xmlHttp = new XMLHttpRequest();
		}
	},
	"startRequest": function(url){
		this.createXMLHttpRequest();
		try {
			this.xmlHttp.onreadystatechange = this.handleStateChange;
			this.xmlHttp.open("GET", url, false);
			this.xmlHttp.send();
		} catch (exception) {
			alert("xmlHttp Fail");
		}
	},
	"handleStateChange": function(){
		if (Ajax.xmlHttp.readyState == 4) {
			if (Ajax.xmlHttp.status == 200 || Ajax.xmlHttp.status == 0) {
				var result = Ajax.xmlHttp.responseText;
				Ajax.json = eval("(" + result + ")");
			}
		}
	}
}