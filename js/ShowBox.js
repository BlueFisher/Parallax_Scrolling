/*!
 * Copyright 2013 视差滚动网页创新小组
 * 代码作者 : Fisher
 */

// 弹出窗口代码模块

ShowBox = {
	"show": function(src, mode) {
		Locate.dragble = false;
		$("showbox_cover").className = "cover_show";
		$("showbox").className = "showbox_show";
		Ajax.startRequest(src);
		var json = Ajax.json;
		var newContainer = document.createElement("div");
		newContainer.id = "b_container";
		if (json.b_container_width != null) {
			newContainer.style.width = json.b_container_width + "px";
		}
		$("showbox").appendChild(newContainer);
		
		var text = "";
		if (mode == "picshow") {
			for (i = 1; i <= json.block.length; i++) {
				var temp = (i % 4) == 0 ? 4 : i % 4;
				text += "<div class=\"b_block col_" + temp + "\"><a href=\"javascript:;\"><img src=\"" + json.imgUrl + i + ".jpg\" alt=\"\"></a><div class=\"b_content\"><h1 class=\"center\">" + json.block[i - 1].name + "<span class=\"h2\">" + json.block[i - 1].college + "</span></h1><p class=\"center\">邮箱：" + json.block[i - 1].email + "</p><p>" + json.block[i - 1].intro + "</p></div></div>";
			}
		} else if (mode == "table") {
			text += "<div id=\"title\"><p>" + json.title + "</p></div><table>";
			for (i = 1; i <= json.item.length; i++) {
				text += "<tr><td><a href=\"" + json.item[i - 1].href + "\" target=\"_blank\">" + json.item[i - 1].title + "</a></td><td>" + json.item[i - 1].date + "</td></tr>";
			}
			text += "</table><div id=\"more\"><a href=\"javascript:;\">更多...</a></div>"
		} else if (mode == "namecard") {
			for (i = 1; i <= json.card.length; i++) {
				text += "<div class=\"name_card\"><div class=\"wrapper\"><h2>" + json.card[i - 1].name + "<span>-" + json.card[i - 1].job + "</span></h2><p class=\"address\">办公地点：" + json.card[i - 1].address + "</p><p class=\"email\">电子邮箱：" + json.card[i - 1].email + "</p></div></div>"
			}
		}
		newContainer.innerHTML = text;
	},
	"hide": function() {
		Locate.dragble = true;
		$("showbox_cover").className = "cover_hidden";
		$("showbox").className = "showbox_hidden";
		$("showbox").removeChild($("b_container"));
	},
	"stopPropagation": function(event) {
		event.stopPropagation(); // 阻止事件传播
	}
}

// var ajax;
// var json;

// function startRequest(url) {
// 	ajax = new XMLHttpRequest();
// 	try {
// 		ajax.onreadystatechange = handleStateChange;
// 		ajax.open("GET", url, false);
// 		ajax.send();
// 	} catch (exception) {
// 		alert("xmlHttp Fail");
// 	}
// }

// function handleStateChange() {
// 	if (ajax.readyState == 4) {
// 		if (ajax.status == 200 || ajax.status == 0) {
// 			var result = ajax.responseText;
// 			json = eval("(" + result + ")");
// 		}
// 	}
// }