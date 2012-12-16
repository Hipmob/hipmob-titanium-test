//Application Window Component Constructor
function ApplicationWindow() {
	//create component instance
	var win = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true,
		height: Ti.UI.FILL
	});
	
	var mainview = require('ui/common/MainView');
	new mainview(win);
	return win;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
