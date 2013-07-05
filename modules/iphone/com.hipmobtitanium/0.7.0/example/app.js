// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
    backgroundColor:'#ffffff',
    navBarHidden:true,
    height: Ti.UI.FILL
});

var hipmob = require("com.hipmobtitanium");

// manage: 2ea7d86854df4ca185af84e68ea72fe1 
var chatView = hipmob.createHipmobChatView({
	top: 0,
	left: 0,
	height: Ti.UI.FILL,
	width: Ti.UI.FILL,
	appId: "2ea7d86854df4ca185af84e68ea72fe1",
	name: "My Name",
	email: "myname@hipmob.com",
	context: "starting up with Appcelerator",
	placeholder: "Start chatting"
    });
win.add(chatView);

var on_connected = function(e){
    chatView.context = "Now connected";
};
var on_operator_online = function(e){
    chatView.context = "Operator online";
};
var on_operator_offline = function(e){
    chatView.context = "Operator online";
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
chatView.addEventListener(hipmob.EVENT_KEYBOARD_SHOW, function(data){
	chatView.animate({ height: win.rect.height - data.height, duration: data.duration*1000 });
    });
chatView.addEventListener(hipmob.EVENT_KEYBOARD_HIDE, function(data){
	chatView.animate({ height: win.rect.height, duration: data.duration*1000 });
    });

win.open();
