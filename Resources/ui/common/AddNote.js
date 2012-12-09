//FirstView Component Constructor
function AddNote(source)
{	
	var win = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		height: Ti.UI.FILL
	});

	var trimLeft = /^\s+/, trimRight = /\s+$/;
	var trim = function(inp){
		return inp.toString().replace(trimLeft,"").replace(trimRight,"");
	};
	
	var mainbody = Ti.UI.createView({layout: 'vertical', height: Ti.UI.FILL, top: 0, borderWidth: '1dp', borderColor:'#999',backgroundColor:'white'});
	mainbody.add(Ti.UI.createLabel({
		color:'#000000', 
		top: 10,
		left: 5,
		height: Ti.UI.SIZE, 
		width: Ti.UI.FILL,
		text: L('notetitle'),
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		} 
	}));
	var titleinput = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
		top: 10,
		left: 5,
		height: Ti.UI.SIZE, 
		width: Ti.UI.FILL
 	});
	mainbody.add(titleinput);
	
	mainbody.add(Ti.UI.createLabel({
		color:'#000000', 
		top:10,
		left: 5,
		height: Ti.UI.SIZE,
		text: L('notebody'),
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		},
		width: Ti.UI.FILL
	}));
	var bodyinput = Ti.UI.createTextArea({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
		top: 10,
		left: 10,
		height: Ti.UI.FILL,
  		width: Ti.UI.FILL
	});
	mainbody.add(bodyinput);
	win.add(mainbody);
	
	var footer = Ti.UI.createView({
		layout: 'vertical',
		width: Ti.UI.FILL, 
		height: Ti.UI.SIZE, 
		bottom: 0, 
		borderColor: "#000000", 
		borderWidth: '1dp',
		backgroundColor: '#dedede'
	});
	var save_note = Ti.UI.createButton({
		color:'#000000',
		title: L('save'),
		height: Ti.UI.SIZE,
		width:'50dp',
		right: '5dp',
		top: '5dp',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontWeight: 'bold'
		} 
	});
	footer.add(save_note);
	win.add(footer);
	
	if(source){
		var db = Ti.Database.open('notesdb');
		var rows = db.execute('SELECT title, body FROM notes WHERE _id = ?', [source]);
		if(rows.isValidRow()){
			titleinput.value = rows.fieldByName('title');
			bodyinput.value = rows.fieldByName('body');
		}
		rows.close();
		db.close();	
	}
	
	// events
	save_note.addEventListener('click', function(){
		var title = trim(titleinput.value), body = bodyinput.value;
		if(title == ""){
			var alertDialog = Titanium.UI.createAlertDialog({ 
				title: L("createnote"), 
				message: 'Please enter a note title that is not blank',
				buttonNames: ['OK'] 
			}); 
			alertDialog.show(); 
			return;
		}
		var db = Ti.Database.open('notesdb');
		if(source){
			db.execute("UPDATE notes SET title = ?, body = ?, modified = ? WHERE _id = ?", [title, body, new Date().getTime(), source])
		}else{
			db.execute("INSERT INTO notes (title, body, created) VALUES (?, ?, ?)", [title, body, new Date().getTime()])
		}
		db.close();
		win.close();
		Ti.App.fireEvent('app:newnote');
	});	
	return win;
}

module.exports = AddNote;
