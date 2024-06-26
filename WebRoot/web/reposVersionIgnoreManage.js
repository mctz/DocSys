var VersionIgnoreMange = (function () {
    /*全局变量*/
    var reposId;
	
	function reposVersionIgnoreMangePageInit(_reposId)
	{
		console.log("reposVersionIgnoreMangePageInit _reposId:" + _reposId);
		reposId = _reposId;
		showReposVersionIngoreList();		
	}
	
	function addDocToVersionIgnoreList()
	{
		console.log("addDocToVersionIgnoreList() ignorePath:" + ignorePath);
		var node = {};
		node.path =  $("#ignorePath").val();
		node.name = "";
		console.log("addDocToVersionIgnoreList() path:" + node.path + "name:" + node.name);
		setVersionIgnore(node, 1);
	}
	
	function removeDocFromVersionIgnoreList(index)
	{
		console.log("removeDocFromVersionIgnoreList() index:" + index);
		var node = {};
		node.path = $("#IgnoreEntrySelect" + index).val();
		node.name = "";
		console.log("removeDocFromVersionIgnoreList() path:" + node.path + "name:" + node.name);
		setVersionIgnore(node, 0);
	}

	function setVersionIgnore(node, ignore)
	{
		console.log("setVersionIgnore()");
	    $.ajax({
	        url : "/DocSystem/Doc/setVersionIgnore.do",
	        type : "post",
	        dataType : "json",
	        data : {
	            reposId : gReposId,
	        	path: node.path,
	        	name: node.name,
	        	ignore: ignore,
	        },
	        success : function (ret) {
	            if( "ok" == ret.status ){
					//刷新列表
					showReposVersionIngoreList();
	            	bootstrapQ.msg({
							msg : _Lang('设置成功！'),
							type : 'success',
							time : 2000,
						    });
	            }
	            else
	            {
	            	showErrorMessage(_Lang("设置失败", ":", ret.msgInfo));
	            }
	        },
	        error : function () {
	           	showErrorMessage(_Lang('设置失败', ':', '服务器异常'));
	        }
		});
	}
	
	function showReposVersionIngoreList(){
	   	console.log("showReposVersionIngoreList() reposId:" + reposId);
	   	var path = "";
	   	var name = "";
	   	
	    $.ajax({
	            url : "/DocSystem/Doc/getVersionIgnoreList.do",
	            type : "post",
	            dataType : "json",
	            data : {
	                reposId : reposId,
	                path : path,
	                name : name,
	            },
	            success : function (ret) {
	            	console.log("getVersionIgnoreList ret:", ret);
	                if( "ok" == ret.status ){
	                    showList(ret.data);
	                }
	                else
	                {
	                	alert(_Lang('获取版本忽略列表失败', ':', ret.msgInfo));
	                }
	            },
	            error : function () {
	               alert(_Lang('获取版本忽略列表失败', ':', '服务器异常'));
	            }
    	});

		//绘制列表
		function showList(data){
			console.log(data);
			var c = $("#reposVersionIgnoreList").children();
			$(c).remove();
			if(data.length==0){
				$("#reposVersionIgnoreList").append("<p>" + _Lang("暂无数据") + "</p>");
			}
			
			for(var i=0;i<data.length;i++){
				var d = data[i];
				var opBtn = "		<a href='javascript:void(0)' onclick='VersionIgnoreMange.removeDocFromVersionIgnoreList(" + i + ");' class='mybtn-primary'>" + _Lang("移除") + "</a>";
													
				var se = "<li value="+ i +">"
					+"	<i class='cell select w5'>"
					+"		<input class='IgnoreEntrySelect' id='IgnoreEntrySelect"+i+"' value='" + d.path + d.name + "' type='checkbox' onclick='onSelectIgnoreItem()'/>"
					+"	</i> "
					+"	<i class='cell path w15'>"
					+"		<span class='path'>"
					+"			<a id='IgnoreEntry"+i+"' href='javascript:void(0)'>/" + d.path + d.name + "</a>"
					+"		</span>"
					+"	</i>"
					+"	<i class='cell status w15'>"
					+"		<span class='status'>"
					+"			<a id='IgnoreEntryStatus"+i+"' href='javascript:void(0)'>" + _Lang("版本已忽略") + "</a>"
					+"		</span>"
					+"	</i>"
					+"	<i class='cell operation w10'>"
					+		opBtn
					+"	</i>"
					+"</li>";				
				$("#reposVersionIgnoreList").append(se);
			}
		}
	}
	//开放给外部的调用接口
    return {
        init: function(_reposId){
        	reposVersionIgnoreMangePageInit(_reposId);
        },
        addDocToVersionIgnoreList: function(){
        	addDocToVersionIgnoreList();
        },
        removeDocFromVersionIgnoreList: function(index){
        	removeDocFromVersionIgnoreList(index);
        },
    };
})();
