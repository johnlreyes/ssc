module("controller")
test("subscribe testing works", function(){
	
	var ta = $("<div/>").appendTo( $("#qunit-test-area") )
	
	ta.html("click here")
	ok(true,"an assert is run")
	var clicks = 0, destroys = 0;
	var subscribes = 0;
	$.Controller.extend("MyTest",{
		click : function(){
			clicks++
		},
		"a.b subscribe" : function(){
			subscribes++
		},
		destroy : function(){
			
			this._super()
			destroys++;
		}
	})
	ta.my_test();
	ta.trigger("click")
	equals(clicks,1, "can listen to clicks")
	
	
	OpenAjax.hub.publish("a.b",{})
	equals(subscribes,1, "can subscribe")
	var controllerInstance = ta.controller('my_test')
	ok( controllerInstance.Class == MyTest, "can get controller" )
	controllerInstance.destroy()
	
	equals(destroys,1, "destroy called once")
	ok(!ta.controller(), "controller is removed")
	
	OpenAjax.hub.publish("a.b",{})
	equals(subscribes,1, "subscription is torn down")
	ta.trigger("click")
	equals(clicks,1, "No longer listening")
	
	ta.my_test();
	ta.trigger("click")
	OpenAjax.hub.publish("a.b",{})
	equals(clicks,2, "can listen again to clicks")
	equals(subscribes,2, "can listen again to subscription")
	
	ta.remove();
	
	ta.trigger("click")
	OpenAjax.hub.publish("a.b",{})
	equals(clicks,2, "Clicks stopped")
	equals(subscribes,2, "Subscribes stopped")
})


test("document and main controllers", function(){
	var a = $("<div id='test'><span/></div>").appendTo($("#qunit-test-area")),
		a_inner = a.find('span'),
		b = $("<div><span/></div>").appendTo($("#qunit-test-area")),
		b_inner = b.find('span'),
		doc_outer_clicks = 0,
		doc_inner_clicks = 0,
		main_outer_clicks = 0,
		main_inner_clicks = 0;

	$.Controller.extend("TestController", { onDocument: true }, {
		click : function(){
			doc_outer_clicks++;
		},
		"span click" : function(){
			doc_inner_clicks++;
		}
	})

	a_inner.trigger("click");
	equals(doc_outer_clicks,1,"document controller handled (no-selector) click inside listening element");
	equals(doc_inner_clicks,1,"document controller handled (selector) click inside listening element");

	b_inner.trigger("click");
	equals(doc_outer_clicks,1,"document controller ignored (no-selector) click outside listening element");
	equals(doc_inner_clicks,1,"document controller ignored (selector) click outside listening element");

	$(document.documentElement).controller('test').destroy();

	$.Controller.extend("MainController", { onDocument: true }, {
		click : function(){
			main_outer_clicks++;
		},
		"span click" : function(){
			main_inner_clicks++;
		}
	})

	b_inner.trigger("click");
	equals(main_outer_clicks,1,"main controller handled (no-selector) click");
	equals(main_inner_clicks,1,"main controller handled (selector) click");

	$(document.documentElement).controller('main').destroy();

	a.remove();
	b.remove();
})


test("bind to any special", function(){
	jQuery.event.special.crazyEvent = {
		
	}
	var called = false;
	jQuery.Controller.extend("WeirdBind",{
		crazyEvent : function(){
			called = true;
		}
	})
	var a = $("<div id='crazy'></div>").appendTo($("#qunit-test-area"))
	a.weird_bind();
	a.trigger("crazyEvent")
	ok(called, "heard the trigger")
})