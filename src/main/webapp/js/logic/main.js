Ext.onReady(function(){
 
	Ext.BLANK_IMAGE_URL = 'js/extjs/resources/images/default/s.gif';
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		id: 'sscview',
		renderTo: document.body,
		items: [northComponent, westComponent ,centerComponent, eastComponent, southComponent]
	}); 
 
});


var myReader = new Ext.data.JsonReader({
			root: 'rows',
			fields: [
				{name: 'url'},
				{name: 'score'},
				{name: 'last30days'},
				{name: 'passing'},
				{name: 'lastanalysis'}
			]
		});

var store = new Ext.data.GroupingStore({
	url: 'json/scoresummary.do',
	reader: myReader
});

store.load();
 


var northComponent = {
	region: "north",
	xtype: 'panel',
	border: false,
	height: 50
};

var centerComponent = {
	region: 'center',
	id: 'movietabs',
	xtype: 'tabpanel',
	activeTab: 0,
	items: 
	[{
		title: 'Score Summary',
		xtype: 'grid',
		store: store,
		autoExpandColumn: 'url',
		columns: [
			{header: "URL",  id: 'url'},
			{header: "Score", width: 100},
			{header: "Last 30 Days", width: 100},
			{header: "Passing", width: 100},
			{header: "Last Analysis", width: 100}
	    ],		
		view: new Ext.grid.GroupingView(),
		sm: new Ext.grid.RowSelectionModel({
			singleSelect: true
		})
	},
	{
		title: 'Configurations',
		layout: 'accordion',
		defaults: {bodyStyle:'padding:5px;font-family:Arial;font-size:10pt;'},
		layoutConfig: {animate: true},
		items: [{
			title: 'FireBug',
			autoLoad: 'html/configuration/firebug.html'
		},{
			title: 'PageSpeed',
			autoLoad: 'html/configuration/pagespeed.html'
		},{
			title: 'YSlow',
			autoLoad: 'html/configuration/yslow.html'
		}]
	}]
};

var westComponent = {
	region: 'west',
	xtype: 'panel',
	split: false,
	collapsible: false,
	bodyStyle:'padding:5px;',
	width: 50,
	minSize: 50,
	border: false
};

var eastComponent = {
	region: 'east',
	xtype: 'panel',
	bodyStyle:'padding:5px;font-family:Arial;font-size:10pt;',
	split: false,
	collapsed: false,
	collapsible: false,
	width: 50,
	border: false
};

var southComponent = {
	region: 'south',
	xtype: 'panel',
	bodyStyle:'padding:5px;font-family:Arial;font-size:10pt;',
	split: false,
	collapsed: false,
	collapsible: false,
	height: 50,
	border: false
};
