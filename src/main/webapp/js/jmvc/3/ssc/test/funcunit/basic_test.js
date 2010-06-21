module("ssc test", { 
	setup: function(){
        S.open("//ssc/ssc.html");
	}
})

test("Copy Test", function(){
	S("h1").text(function(val){
		equals(val, "Welcome to JavaScriptMVC 3.0!","welcome text");
	})
})