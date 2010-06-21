module("result")

test("results present", function(){

        S.open("//ssc/ssc.html");
		S('.result').exists(function(){
			ok(true, "results present");
	    });

})

test("create results", function(){
    S("[name=name]").type("Ice")
    S("[name=description]").type("Cold Water")
    S("[type=submit]").click()
    S('.result:nth-child(2)').exists()
    S('.result:nth-child(2) td:first').text(function(text){
        ok(text.match(/Ice/), "Typed Ice");
    });
})

test("edit results", function(){
    S('.result:nth-child(2) a.edit').click();
    S(".result input[name=name]").type(" Water")
    S(".result input[name=description]").type("\b\b\b\b\bTap Water")
    S(".update").click()
    S('.result:nth-child(2) .edit').exists()
    S('.result:nth-child(2) td:first').text(function(text){
        ok(text.match(/Ice Water/), "Typed Ice Water");
    });
    S('.result:nth-child(2) td:nth-child(2)').text(function(text){
        ok(text.match(/Cold Tap Water/), "Typed Ice Water");
    });
})


test("destroy", function(){
    S(".result:nth-child(2) .destroy").click()
    S.confirm(true);
	S('.result:nth-child(2)').missing()
    ok("destroyed");
});