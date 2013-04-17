//FirstView Component Constructor
function SupportChat()
{	
	var win = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		height: Ti.UI.FILL
	});

	var hipmob = require("com.hipmobtitanium");
	var trimLeft = /^\s+/, trimRight = /\s+$/;
	var trim = function(inp){
		return inp.toString().replace(trimLeft,"").replace(trimRight,"");
	};
	
	var appId = "<insert your own Hipmob app id here>";
	if(appId == "<insert your own Hipmob app id here>"){
		alert("Please edit the Resources/ui/common/SupportChat.js file and insert a valid Hipmob App ID into the appId variable.")
		win.close();
		return;
	}
	//var appId = "7152ce24a16d42eb8d30b5fe4c01f911";
	var chatView = hipmob.createHipmobChatView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		appId: appId,
		name: "Femi",
		email: "femi@hipmob.com",
		context: "starting up with Appcelerator"
	});
	win.add(chatView)
	var on_connected = function(e){
    	chatView.setContext("Now connected");
	};
	var on_operator_online = function(e){
    	chatView.setContext("Operator online");
	};
	var on_operator_offline = function(e){
    	chatView.setContext("Operator online");
	};
	var on_disconnected = function(e){
		var dialog = Ti.UI.createAlertDialog({
    		message: 'Disconnected!',
    		ok: 'OK',
    		title: 'Hipmob' });
    	dialog.show();
    	setTimeout(function(){ dialog.hide(); }, 2000);
    	chatView.removeListener(hipmob.EVENT_DISCONNECTED, on_disconnected);
	};
	var on_url = function(e){
		var dialog = Ti.UI.createAlertDialog({
    		message: 'URL Received ['+e.url+']!',
    		ok: 'OK',
    		title: 'Hipmob' });
    	dialog.show();
    	setTimeout(function(){ dialog.hide(); }, 5000);
	};
	win.addEventListener('open', function(){
		chatView.addListener(hipmob.EVENT_CONNECTED, on_connected);
		chatView.addListener(hipmob.EVENT_DISCONNECTED, on_disconnected);
		chatView.addListener(hipmob.EVENT_OPERATOR_ONLINE, on_operator_online);
		chatView.addListener(hipmob.EVENT_OPERATOR_OFFLINE, on_operator_offline);
		chatView.addListener(hipmob.EVENT_URL_RECEIVED, on_url);
		chatView.start();
	});
	win.addEventListener('close', function(){
		chatView.removeListener(hipmob.EVENT_CONNECTED, on_connected);
		chatView.stop();
	});
	
	return win;
}

module.exports = SupportChat;
