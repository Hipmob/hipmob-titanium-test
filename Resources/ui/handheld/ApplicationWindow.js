//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	//var FirstView = require('ui/common/FirstView');
		
	//create component instance
	var win = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true,
		layout: 'vertical'
	});
		
	var mainview = require('ui/common/MainView');
	new mainview(win);
	return win;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
