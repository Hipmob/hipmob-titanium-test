//FirstView Component Constructor
function MainView(win)
{
	var db = Ti.Database.open('notesdb');
	db.execute('CREATE TABLE IF NOT EXISTS notes (_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, created NUMERIC, modified NUMERIC)');
	db.close();
	
	var add_note = require('ui/common/AddNote');
	var view_support = require('ui/common/SupportChat');
		
	// HEADER
	var mainbody = Ti.UI.createView({layout: 'vertical', height: Ti.UI.FILL, top: 0, borderWidth: '1dp', borderColor:'#999',backgroundColor:'white'});
	var headerLabel = Ti.UI.createLabel({
		color:'#000000', 
		top:10,
		textAlign:'center', 
		height:'auto', 
		text: L('title'),
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		} 
	});
	mainbody.add(headerLabel);
	mainbody.add(Ti.UI.createView({height:2,bottom:0,left:0,right:0,borderWidth:1,borderColor:'#000000'}));
	
	// add the table view
	var load_data = function(){
		var db = Ti.Database.open('notesdb');
		var rows = db.execute('SELECT _id, title FROM notes ORDER BY created DESC');
		var data = [];
		while (rows.isValidRow()){
			data.push({ 
				id: rows.fieldByName('_id'), 
				title: rows.fieldByName('title'),
				hasChild: true
			});
			rows.next();
    	}
 		rows.close();
		db.close();
		return data;
	};

	var table = Ti.UI.createTableView({
  		data: load_data(),
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	mainbody.add(table);
	win.add(mainbody);
	var footer = Ti.UI.createView({
		width: Ti.UI.FILL, 
		height: Ti.UI.SIZE, 
		bottom: 0, 
		borderColor: "#000000", 
		borderWidth: '1dp',
		backgroundColor: '#dedede'
	});
	var new_note = Ti.UI.createButton({
		color:'#000000',
		title: L('create'),
		height:'auto',
		width:'50dp',
		right: '5dp',
		top: '5dp',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontWeight: 'bold'
		} 
	});
	footer.add(new_note);
	var support_chat = Ti.UI.createButton({
		color:'#000000',
		title: L('support'),
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: '5dp',
		top: '5dp',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontWeight: 'bold'
		} 
	});
	footer.add(support_chat);
	win.add(footer);
	
	table.addEventListener('click', function(event){
		var new_window = new add_note(event.rowData.id);
		new_window.open();
	});
	
	// events
	new_note.addEventListener('click', function(){
		var new_window = new add_note();
		new_window.open();
	});

	support_chat.addEventListener('click', function(){
		var new_window = new view_support();
		new_window.open();
	})	
	Ti.App.addEventListener('app:newnote', function(){
		table.setData(load_data());
	});
}

module.exports = MainView;
