//FirstView Component Constructor
function SupportChat()
{
	var android = Ti.Platform.osname == 'android';
	var iphone = Ti.Platform.osname == 'iphone';
	var win = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		height: Ti.UI.FILL
	});

	var trimLeft = /^\s+/, trimRight = /\s+$/;
	var trim = function(inp){
		return inp.toString().replace(trimLeft,"").replace(trimRight,"");
	};
	
	//var appId = "<insert your own Hipmob app id here>";
	var appId = "7152ce24a16d42eb8d30b5fe4c01f911";
	if(appId == "<insert your own Hipmob app id here>"){
		alert("Please edit the Resources/ui/common/SupportChat.js file and insert a valid Hipmob App ID into the appId variable.")
		win.close();
		return;
	}
	var hipmob = false;
	if(android || iphone) hipmob = require("com.hipmobtitanium");
	
	//var appId = "7152ce24a16d42eb8d30b5fe4c01f911";
	var chatView = hipmob.createHipmobChatView({
		top: 0,
		left: 0,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		appId: appId,
		name: "Femi",
		email: "femi@hipmob.com",
		context: "starting up with Appcelerator",
		placeholder: "Start chatting"
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
    	chatView.removeEventListener(hipmob.EVENT_DISCONNECTED, on_disconnected);
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
		chatView.addEventListener(hipmob.EVENT_CONNECTED, on_connected);
		chatView.addEventListener(hipmob.EVENT_DISCONNECTED, on_disconnected);
		chatView.addEventListener(hipmob.EVENT_OPERATOR_ONLINE, on_operator_online);
		chatView.addEventListener(hipmob.EVENT_OPERATOR_OFFLINE, on_operator_offline);
		chatView.addEventListener(hipmob.EVENT_URL_RECEIVED, on_url);
		chatView.start();
	});
	win.addEventListener('close', function(){
		chatView.removeEventListener(hipmob.EVENT_CONNECTED, on_connected);
		chatView.stop();
	});
	
	// handles keyboard show/hide
	if(iphone){
		chatView.addEventListener(hipmob.EVENT_KEYBOARD_SHOW, function(data){
			chatView.animate({height: win.rect.height - data.height, duration: data.duration * 1000 });
		});
		chatView.addEventListener(hipmob.EVENT_KEYBOARD_HIDE, function(data){
			chatView.animate({ height: win.rect.height, duration: data.duration * 1000 });
		});
	}
	return win;
}

module.exports = SupportChat;
