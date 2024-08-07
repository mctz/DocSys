var RemoteStorageIgnoreMange = (function () {
    /*全局变量*/
    var reposId;
	
	function reposRemoteStorageIgnoreMangePageInit(_reposId)
	{
		console.log("reposRemoteStorageIgnoreMangePageInit _reposId:" + _reposId);
		reposId = _reposId;
		showReposRemoteStorageIngoreList();		
	}
	
	function addDocToRemoteStorageIgnoreList()
	{
		console.log("addDocToRemoteStorageIgnoreList() ignorePath:" + ignorePath);
		var node = {};
		node.path =  $("#ignorePath").val();
		node.name = "";
		console.log("addDocToRemoteStorageIgnoreList() path:" + node.path + "name:" + node.name);
		setRemoteStorageIgnore(node, 1);
	}
	
	function removeDocFromRemoteStorageIgnoreList(index)
	{
		console.log("removeDocFromRemoteStorageIgnoreList() index:" + index);
		var node = {};
		node.path = $("#IgnoreEntrySelect" + index).val();
		node.name = "";
		console.log("removeDocFromRemoteStorageIgnoreList() path:" + node.path + "name:" + node.name);
		setRemoteStorageIgnore(node, 0);
	}

	function setRemoteStorageIgnore(node, ignore)
	{
		console.log("setRemoteStorageIgnore()");
	    $.ajax({
	        url : "/DocSystem/Doc/setRemoteStorageIgnore.do",
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
					showReposRemoteStorageIngoreList();
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
	
	function showReposRemoteStorageIngoreList(){
	   	console.log("showReposRemoteStorageIngoreList() reposId:" + reposId);
	   	var path = "";
	   	var name = "";
	   	
	    $.ajax({
	            url : "/DocSystem/Doc/getRemoteStorageIgnoreList.do",
	            type : "post",
	            dataType : "json",
	            data : {
	                reposId : reposId,
	                path : path,
	                name : name,
	            },
	            success : function (ret) {
	            	console.log("getRemoteStorageIgnoreList ret:", ret);
	                if( "ok" == ret.status ){
	                    showList(ret.data);
	                }
	                else
	                {
	                	alert(_Lang("获取远程存储忽略列表失败", ":", ret.msgInfo));
	                }
	            },
	            error : function () {
	               alert(_Lang('获取远程存储忽略列表失败', ':', '服务器异常'));
	            }
    	});

		//绘制列表
		function showList(data){
			console.log(data);
			var c = $("#reposRemoteStorageIgnoreList").children();
			$(c).remove();
			if(data.length==0){
				$("#reposRemoteStorageIgnoreList").append("<p>" + _Lang("暂无数据") + "</p>");
			}
			
			for(var i=0;i<data.length;i++){
				var d = data[i];
				var opBtn = "		<a href='javascript:void(0)' onclick='RemoteStorageIgnoreMange.removeDocFromRemoteStorageIgnoreList(" + i + ");' class='mybtn-primary'>" + _Lang("移除")+ "</a>";
													
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
					+"			<a id='IgnoreEntryStatus"+i+"' href='javascript:void(0)'>" + _Lang("远程存储已关闭") + "</a>"
					+"		</span>"
					+"	</i>"
					+"	<i class='cell operation w10'>"
					+		opBtn
					+"	</i>"
					+"</li>";				
				$("#reposRemoteStorageIgnoreList").append(se);
			}
		}
	}
	//开放给外部的调用接口
    return {
        init: function(_reposId){
        	reposRemoteStorageIgnoreMangePageInit(_reposId);
        },
        addDocToRemoteStorageIgnoreList: function(){
        	addDocToRemoteStorageIgnoreList();
        },
        removeDocFromRemoteStorageIgnoreList: function(index){
        	removeDocFromRemoteStorageIgnoreList(index);
        },
    };
})();
