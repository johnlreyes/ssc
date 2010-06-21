module("Model: SSC.Models.Result")

test("findAll", function(){
	stop(2000);
	SSC.Models.Result.findAll({}, function(results){
		start()
		ok(results)
        ok(results.length)
        ok(results[0].name)
        ok(results[0].description)
	});
	
})

test("create", function(){
	stop(2000);
	new SSC.Models.Result({name: "dry cleaning", description: "take to street corner"}).save(function(result){
		start();
		ok(result);
        ok(result.id);
        equals(result.name,"dry cleaning")
        result.destroy()
	})
})
test("update" , function(){
	stop();
	new SSC.Models.Result({name: "cook dinner", description: "chicken"}).
            save(function(result){
            	equals(result.description,"chicken");
        		result.update({description: "steak"},function(result){
        			start()
        			equals(result.description,"steak");
        			result.destroy();
        		})
            })

});
test("destroy", function(){
	stop(2000);
	new SSC.Models.Result({name: "mow grass", description: "use riding mower"}).
            destroy(function(result){
            	start();
            	ok( !SSC.Models.Result.store.findOne(result.id) ,"Store no longer has field" )
            })
})