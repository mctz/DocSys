//StackMdEditor类
var StackMdEditor = (function () {
	var commonEditor; //It will be set when callback from commonEditor
	
	var editor;		  		//编辑器句柄
	var isReadOnly = true;	//true: 只读模式
	var docInfo;			//docInfo
	var content = "";		//编辑器内容
	var switchEditModeOnly = false;	//编辑器状态切换回调控制变量
    
	var isReady = false; //用于处理编辑器初始化期间的一些异常事件
	
	var setContent = function(content)
	{	
		//TODO: 目前没有接口，通过onChange事件带回来的
		//因此没法设置
	};
	
	var getContent = function()
	{	
		//TODO: 目前没有接口，通过onChange事件带回来的
		return content;
	};
	
	var setEditMode = function(mode)
	{
		switchEditModeOnly = true;
		setStaticEditReaOnly(mode);
	};
	
	var onLoadDocument = function(docInfo){
		console.log("onLoadDocument() docInfo:", docInfo);	
		this.docInfo = docInfo;
		checkAndSetIsReadOnly(docInfo);
	};
	
	var initEditor = function(docText, tmpSavedDocText, docInfo)
	{
		//如果传入了docInfo，那么docInfo在初始化的时候就进行设置
  		console.log("StackMdEditor initEditor() docInfo:", docInfo);
  		console.log("StackMdEditor initEditor() docText:", docText);
  		
  		if(docInfo)
  		{
  			this.docInfo = docInfo;
  		}
 
  		if(docText)
  		{
  			content = docText;
  		}

		// 传入staticedit插件地址和文件内容，获取staticedit插件指定路径
		var url = getStaticEditUrl("/DocSystem/web/static/stackedit/dist/index.html", content);
		// 获取iframe并设置其src路径，渲染stackEdit编辑器，加载待修改markdown文件
		var stackEditIframeEl = $(".stackedit-iframe");
		stackEditIframeEl.prop("src",url);

		//监听stackeidtor发来的消息
		window.addEventListener('message', messageHandler);
	};
	
	/**
	 * staticEdit消息事件处理
	 *
	 * @param event 事件对象
	 */
	function messageHandler(event) {
		console.log("StackMdEditor messageHandler() event:", event);
		switch (event.data.type) 
		{
			case 'ready':
				isReady = true;
				if(this.docInfo)
				{
					onLoadDocument(this.docInfo);
				}
				
				// iframe 页面加载完成,设置当前页面为只读
				setStaticEditReaOnly(false);
				
				commonEditor.appReady();
				break;
			case 'fileChange':
				console.log("StackMdEditor fileChange");
				if(isReady == true)
				{
					//TODO: fileChange事件以后不要直接把内容带回来
					var newContent = event.data.payload.content.text;
					if(content != newContent)
					{
						//console.log("StackMdEditor fileChange content:", content);
						//console.log("StackMdEditor fileChange newContent:", newContent);
						content = newContent;
						commonEditor.contentChangeHandler();
					}
				}
				break;
			case 'close':
				console.log("StackMdEditor close");
				//收到iframe的关闭消息
				var artDialog = top.dialog.get(window);
				artDialog.close();
				break;
			case 'saveChange':
				console.log("StackMdEditor saveChange");
				if(isReady == true)
				{
					commonEditor.saveDoc();
				}
				break;
			case 'changeView':
              	console.log("StackMdEditor changeView() switchEditModeOnly:" + switchEditModeOnly);
				if(switchEditModeOnly == true)
				{
					switchEditModeOnly = false;
				}
				else
				{		        
					console.log("messageHandler() changeView flag:", event.data.flag);
					//flag需要能够区分按键
					if(event.data.flag)
					{
				      	commonEditor.exitEdit(2);
					}
					else
					{
				      	commonEditor.enableEdit(2);
					}
				}
				break;
			case 'uploadImages':
				console.log("StackMdEditor uploadImages");
				var images = event.data.payload.content.images;
				if (images && images.length > 0) {
					// 仅上传第一个传输过来的图片
					uploadMarkdownPic(images[0]);
				}
				break;
			default:
				break;
		}
	}
	
	//抽象编辑器的以下接口, 通过config参数传递给CommonEditor
	var config = {
		"initEditor": initEditor,
		"setContent": setContent,
		"getContent": getContent,
		"setEditMode": setEditMode,			
		"onLoadDocument": onLoadDocument,
	};
	
	function init(mode, docInfo)
	{
		console.log("StackMdEditor init() mode:", mode);
		commonEditor = new MxsdocAPI.CommonEditor(config);
		switch(mode)
		{
		case "ArtDialog":
			commonEditor.initForArtDialog();
			break;
		case "NewPage":
			commonEditor.initForNewPage();
			break;
		case "BootstrapDialog":
			commonEditor.initForBootstrapDialog(docInfo);
			break;
		case "VDoc":
			commonEditor.initForVDoc();
			break;
		}					
	}
	
	function checkAndSetIsReadOnly(docInfo)
	{
		if(docInfo.docType == 2)
		{
			isReadOnly = false;
			return;
		}
		
		if(docInfo.isZip && docInfo.isZip == 1)
		{
			isReadOnly = true;
			return;
		}
		if(docInfo.isHistory && docInfo.isHistory == 1)
		{
			isReadOnly = true;
			return;
		}
	}
	
	/**
	 * 图片上传
	 */
	function uploadMarkdownPic(file) {
		var xhr = new XMLHttpRequest();
		var form = new FormData();
		form.append("editormd-image-file", file);
		//上传表单
		var imgName =  file.lastModified + "_" + file.name;
		var path = base64_urlsafe_encode(docInfo.path);
		var name = base64_urlsafe_encode(docInfo.name);
		var imageUploadURL = "/DocSystem/Doc/uploadMarkdownPic.do?reposId=" + docInfo.vid + "&docId=" + docInfo.docId + "&path="+ path + "&name="+ name + "&imgName=" + imgName;
		if(docInfo.shareId) {
			imageUploadURL="&shareId="+docInfo.shareId;
		}
		xhr.open("post", imageUploadURL);
		xhr.send(form);
		//设置异步上传状态变化回调处a理函数
		xhr.onreadystatechange = function() {
			if(xhr.status == 200) {
				if(xhr.readyState != 4) {
					//文件上传未结束
					return;
				}
				//上传成功！
				var ret = JSON.parse(xhr.responseText);
				if(1 == ret.success) {
					var stackeditEl = $(".stackedit-iframe");
					if (stackeditEl !== undefined) {
						var origin = window.location.protocol + '//' + window.location.host;
						var imgUrl = origin + ret.url;
						stackeditEl[0].contentWindow.postMessage({"type":"uploadCompleted","imgUrl":imgUrl},"*");
					}
				}
				else {
					//上传失败
					console.error("上传失败：" + ret.msgInfo);
				}
			}else{
				if(xhr.status < 300) {
					//不是真正的异常
					return;
				}
				//上传失败
				console.error("系统异常: 上传异常！");
			}
		};
	}

	/**
	 * stackEdit插件加载路径初始化，在原始路径上拼装文件信息，域信息
	 *
	 * @param url 插件路径
	 * @param doc_text 文档内容
	 * @return 拼装后携带文件内容的url路径
	 */
	function getStaticEditUrl(url,doc_text) {
		var origin = window.location.protocol + '//' + window.location.host;
		var params = {
			origin: origin,
			//fileName: fileName,
			contentText: doc_text,
			silent: false
		};
		var serializedParams = Object.keys(params).map(function (key) {
			return key + '=' + encodeURIComponent(params[key] || '');
		}).join('&');
		var hash = '#' + serializedParams;
		return url+hash;
	}

	/**
	 * 设置编辑器的编辑状态为只读
	 *
	 * @param editFlag false代表编辑状态，true代表只读状态
	 */
	function setStaticEditReaOnly(editFlag) {
		var stackeditEl = $(".stackedit-iframe");
		if (stackeditEl !== undefined) {
			stackeditEl[0].contentWindow.postMessage({"type":"toggleEditor","flag":editFlag},"*")
		}
	}

	/**
	 * 设置编辑器的保存按钮的开启和禁用
	 *
	 * @param editFlag false代表编辑状态，true代表只读状态
	 */
	function disabledEditState(editFlag) {
		var stackeditEl = $(".stackedit-iframe");
		if (stackeditEl !== undefined) {
			stackeditEl[0].contentWindow.postMessage({"type":"updateEditState","flag":editFlag},"*")
		}
	}
	
	//开放给外部的调用接口
	return {
		init: function(mode, docInfo){
			init(mode, docInfo);					
		},
	    ctrlZ: function(){
	    	commonEditor.ctrlZ();
	    },
	    ctrlY: function(){
	    	commonEditor.ctrlY();
	    },
	    enableEdit: function(){
	    	commonEditor.enableEdit(1);
	    },	    
	    exitEdit: function(mode){
	    	commonEditor.exitEdit(1);
	    },
	    saveDoc: function(){
	    	commonEditor.saveDoc();
	    },
	}
})();