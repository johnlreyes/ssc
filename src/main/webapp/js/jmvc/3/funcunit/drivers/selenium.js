steal(function(){
	if (navigator.userAgent.match(/Rhino/) && !window.build_in_progress) {

		// configuration defaults
		FuncUnit.serverHost = FuncUnit.serverHost || "localhost";
		FuncUnit.serverPort = FuncUnit.serverPort || 4444;
		if(!FuncUnit.browsers){
			if(FuncUnit.jmvcRoot)
				FuncUnit.browsers = ["*firefox", "*iexplore", "*safari", "*googlechrome"]
			else {
				FuncUnit.browsers = ["*firefox"]
				if(java.lang.System.getProperty("os.name").indexOf("Windows") != -1){
					FuncUnit.browsers.push("*iexplore")
				}
			}
		}
		
		FuncUnit.startSelenium();

		(function(){
			var browser = 0;
			
			QUnit.done = function(failures, total){
				FuncUnit.selenium.close();
				FuncUnit.selenium.stop();
				FuncUnit.endtime = new Date().getTime();
				var formattedtime = (FuncUnit.endtime - FuncUnit.starttime) / 1000;
				print("\nALL DONE " + failures + ", " + total + (FuncUnit.showTimestamps? (' - ' 
						+ formattedtime + ' seconds'): ""))
				browser++;
				if (browser < FuncUnit.browsers.length) {
					print("\nSTARTING " + FuncUnit.browsers[browser])
					FuncUnit.selenium = new DefaultSelenium(FuncUnit.serverHost, 
						FuncUnit.serverPort, FuncUnit.browsers[browser], window.location);
					FuncUnit.starttime = new Date().getTime();
					FuncUnit.selenium.start();
					QUnit.restart();
				} else {
					if (java.lang.System.getProperty("os.name").indexOf("Windows") != -1) {
						runCommand("cmd", "/C", 'taskkill /fi "Windowtitle eq selenium" > NUL')
					}
				}
			}
			
			
			print("\nSTARTING " + FuncUnit.browsers[0])
			FuncUnit.selenium = new DefaultSelenium(FuncUnit.serverHost, 
				FuncUnit.serverPort, FuncUnit.browsers[0], window.location);
			FuncUnit.starttime = new Date().getTime();
			FuncUnit.selenium.start();
			FuncUnit._open = function(url){
				this.selenium.open(url);
			};
			FuncUnit._onload = function(success, error){
				setTimeout(function(){
					FuncUnit.selenium.getEval("selenium.browserbot.getCurrentWindow().focus();selenium.browserbot.getCurrentWindow().document.documentElement.tabIndex = 0;");
					success();
				}, 1000)
			};
			var convertToJson = function(arg){
				return arg === FuncUnit.window ? "selenium.browserbot.getCurrentWindow()" : jQuery.toJSON(arg)
				
			}
			FuncUnit.prompt = function(answer){
				this.selenium.answerOnNextPrompt(answer);
			}
			FuncUnit.confirm = function(answer, callback){
				var self = this;
				FuncUnit.add(function(success, error){
					var confirm = FuncUnit.selenium.getConfirmation();
					if(answer)
						FuncUnit.selenium.chooseOkOnNextConfirmation();
					else
						FuncUnit.selenium.chooseCancelOnNextConfirmation();
					setTimeout(success, 13)
				}, callback, "Could not confirm")
			}
			FuncUnit.$ = function(selector, context, method){
				var args = FuncUnit.makeArray(arguments);
				for (var a = 0; a < args.length; a++) {
					if (a == 1) { //context
						if (args[a] == FuncUnit.window.document) {
							args[a] = "_doc()"
						}
						else 
							if (typeof args[a] == "number") {
								args[a] = "_win()[" + args[a] + "].document"
							}
							else 
								if (typeof args[a] == "string") {
									args[a] = "_win()['" + args[a] + "'].document"
								}
					}
					else 
						args[a] = convertToJson(args[a]);
				}
				var response = FuncUnit.selenium.getEval("jQuery.wrapped(" + args.join(',') + ")");
				return eval("(" + response + ")")//  q[method].apply(q, args);
			}
			
			
			
		})();
	}
});