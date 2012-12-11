//FirstView Component Constructor
function SupportChat()
{	
	var win = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		height: Ti.UI.FILL
	});

	var hipmob = require("hipmobtitanium");
	var trimLeft = /^\s+/, trimRight = /\s+$/;
	var trim = function(inp){
		return inp.toString().replace(trimLeft,"").replace(trimRight,"");
	};
	
	// manage: 2ea7d86854df4ca185af84e68ea72fe1 
	// ha: 488b7ecc3a764176b50717278c6a9ea0
	var chatView = hipmob.createHipmobChatView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		appId: "2ea7d86854df4ca185af84e68ea72fe1",
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
