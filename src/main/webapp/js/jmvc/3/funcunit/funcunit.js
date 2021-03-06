//what we need from jQuery
steal.plugins('funcunit/qunit',
	'funcunit/qunit/rhino',
	'jquery',
	'jquery/lang/json',		
	'funcunit/synthetic'
	)
//Now describe FuncUnit
.then(function(){
	
	
var window = (function(){return this }).call(null),
	oldFunc = window.FuncUnit;

/**
 * @constructor FuncUnit
 * @tag core
 * FuncUnit provides powerful functional testing as an add on to qUnit.  The same tests can be run 
 * in the browser, or with Selenium.  It also lets you run basic qUnit tests in EnvJS.
 * 
 * <h2>Example:</h2>
 * Here's how you might tests an Auto Suggest
@codestart
test("FuncUnit Results",function(){
	S('#auto_suggest').click().type("FuncUnit")
	
	S('.result').exists().size(function(size){
	equal(size, 5,"there are 5 results")
	})
});
@codeend
 * 
 * <h2>Setting up with JavaScriptMVC</h2>
 * <p>When you create a plugin or application with code generators, JavaScriptMVC makes a testing skeleton for you.
 * You just have to add to the test file it creates.
 * But, it's useful to know how to setup a testing page on your own.  Here's how:
 * </p>
 * 
 * <ol>
 * 	<li>Create a JS file (ex: mytest.js) for your tests inside JMVC's root directory.  The skeleton should like:
@codestart
steal.plugins('funcunit').then(function(){
  test("page opens", function(){
    $.open("//path/to/myPage.html"); //referenced from jmvc root folder
    ok(true,"page Loaded");
  })
})
@codeend
 *  </li>
 *  <li>Create an HTML file (mytest.html).  The skeleton should look like:
@codestart
&lt;html>
  &lt;head>
    &lt;link rel="stylesheet" 
             type="text/css" 
             href="..<b>/path/to/</b>funcunit/qunit/qunit.css" />
    &lt;title>FuncUnit Test&lt;/title>
  &lt;/head>
  &lt;body>
    &lt;h1 id="qunit-header">FuncUnit Test Suite&lt;/h1>
    &lt;h2 id="qunit-banner">&lt;/h2>
    &lt;div id="qunit-testrunner-toolbar">&lt;/div>
    &lt;h2 id="qunit-userAgent">&lt;/h2>
    &lt;ol id="qunit-tests">&lt;/ol>
    &lt;script type='text/javascript' 
        src='..<b>/path/to/</b>steal/steal.js?<b>path/to</b>/mytest.js'>
    &lt;/script>
  &lt;/body>
&lt;/html>
@codeend
Make sure you reference qunit and steal correctly.  The path to your test page (mytest.js)
should be given from the jmvc root folder.

 * </li>
 *  <li>Open your html page (mytest.html) in a browser.  Did it pass?  If not check the paths.</li>
 *  <li>If you aren't running from the filesystem, you need to change funcunit/settings.js to point to the JMVC
 *  root folder on your server:
@codestart
FuncUnit= {jmvcRoot: "http://localhost/scripts/" }
@codeend
 *  </li>
 *  <li>Now run your test.
@codestart text
envjs path/to/mytest.html
@codeend
</li>
 * </ol>
 * <h2>Writing Tests</h2>
 * <p>Writing tests is super easy and follows this pattern:</p>
<ol>
  <li>Open a page with [FuncUnit.static.open S.open].
@codestart
S.open("//myapp/myapp.html")
@codeend
  </li>
  <li>Do some things
@codestart
//click something
S('#myButton').click()

//type something
S('#myInput').type("hello")
@codeend
  </li>

  <li>Wait for those things to complete
@codestart
//Wait until it is visible
S('#myMenu').visible()

//wait until something exists
S('#myArea').exists()

//waits a second
S.wait(1000);



@codeend
  </li>
  <li>Check your results
@codestart
//Wait until it is visible
S('#myMenu').offset(function(offset){
  equals(500,offset.left,"menu is in the right spot");
})

//wait until something exists
S('#myArea').height(function(height){
   equals(500,height,"my area is the right height");
})
@codeend
  </li>
</ol>
 * 
 * @init
 * selects something in the other page
 * @param {Object} s
 * @param {Object} c
 */
FuncUnit = function(s, c){
	return new FuncUnit.init(s, c)
}
/**
 * @Static
 */
$.extend(FuncUnit,oldFunc)
/**
 * @attribute href
 * The location of the page running the tests on the server and where relative paths passed in to [FuncUnit.static.open] will be 
 * referenced from.
 * <p>This is typically where the test page runs on the server.  It can be set before calls to [FuncUnit.static.open]:</p>
@codestart
test("opening something", function(){
  S.href = "http://localhost/tests/mytest.html"
  S.open("../myapp")
  ...
})
@codeend
 */
// href comes from settings
/**
 * @attribute jmvcRoot
 * jmvcRoot should be set to url of JMVC's root folder.  
 * <p>This is used to calculate JMVC style paths (paths that begin with  //).
 * This is the prefered method of referencing pages if
 * you want to test on the filesystem and test on the server.</p>
 * <p>This is usually set in the global config file in <code>funcunit/settings.js</code> like:</p>
@codestart
FuncUnit = {jmvcRoot: "http://localhost/script/" }
@codeend
 */
// jmvcRoot comes from settings
FuncUnit.
/**
 * Opens a page.  It will error if the page can't be opened before timeout. 
 * <h3>Example</h3>
@codestart
//a full url
S.open("http://localhost/app/app.html")

//from jmvc root (FuncUnit.jmvcRoot must be set)
S.open("//app/app.html")
@codeend

 * <h3>Paths in Selenium</h3>
 * Selenium runs the testing page from the filesystem and by default will look for pages on the filesystem unless provided a full
 * url or information that can translate a partial path into a full url. FuncUnit uses [FuncUnit.static.jmvcRoot] 
 * and [FuncUnit.static.href] to 
 * translate partial paths.
<table>
  <tr>
  	<th>path</th>
  	<th>jmvcRoot</th>
  	<th>href</th>
  	<th>resulting url</th>
  </tr>
  <tr>
    <td>//myapp/mypage.html</td>
    <td>null</td>
    <td>null</td>
    <td>file:///C:/development/cookbook/public/myapp/mypage.html</td>
  </tr>
  <tr>
    <td>//myapp/mypage.html</td>
    <td>http://localhost/</td>
    <td></td>
    <td>http://localhost/myapp/mypage.html</td>
  </tr>
  <tr>
    <td>http://foo.com</td>
    <td></td>
    <td></td>
    <td>http://foo.com</td>
  </tr>
  <tr>
  	<td>../mypage.html</td>
    <td></td>
    <td>http://localhost/myapp/funcunit.html</td>
    <td>http://localhost/mypage.html</td>
  </tr>
</table>
 * 
 * @param {String} path a full or partial url to open.  If a partial is given, 
 * @param {Function} callback
 * @param {Number} timeout
 */
open = function(path, callback, timeout){
	var fullPath = FuncUnit.getAbsolutePath(path)
	FuncUnit.add(function(success, error){ //function that actually does stuff, if this doesn't call success by timeout, error will be called, or can call error itself
		//page = window.open(path);
		FuncUnit._open(fullPath, error);
		FuncUnit._onload(function(){
			FuncUnit._opened();
			success()
		}, error);
	}, callback, "Page " + path + " not loaded in time!", timeout);
};

FuncUnit.getAbsolutePath = function(path){
	var fullPath, 
		root = FuncUnit.jmvcRoot || steal.root.path;
	
	if (/^\/\//.test(path)) {
		fullPath = new steal.File(path.substr(2)).joinFrom(root);
	}
	else {
		fullPath = path;
	}
	
	if(/^http/.test(path))
		fullPath = path;
	return fullPath;
}

FuncUnit.window = {
	document: {}
};
FuncUnit._opened = function(){};
(function(){
	var queue = [], incallback = false;
	FuncUnit.add = function(f, callback, error, timeout){
		if (incallback) {
			queue.unshift({
				method: f,
				callback: callback,
				error: error,
				timeout: timeout
			});
		}
		else {
			queue.push({
				method: f,
				callback: callback,
				error: error,
				timeout: timeout
			});
		}
		
		
		if (queue.length == 1) {
			stop();
			setTimeout(FuncUnit._done, 13)
		//();
		}
	}
	FuncUnit._done = function(){
		if (queue.length > 0) {
			var next = queue.shift();
			var timer = setTimeout(function(){
				ok(false, next.error);
				FuncUnit._done();
			}, next.timeout || 10000)
			
			next.method(function(){
				//mark in callback so the next set of add get added to the front
				clearTimeout(timer);
				incallback = true;
				if (next.callback) 
					next.callback.apply(null, arguments);
				incallback = false;
				FuncUnit._done();
			}, function(message){
				clearTimeout(timer);
				ok(false, message);
				FuncUnit._done();
			});
		}
		else {
			start();
		}
	}
	FuncUnit.
	/**
	 * waits a timeout
	 * @param {Object} time
	 * @param {Object} cb
	 */
	wait = function(time, cb){
		time = time || 10000
		FuncUnit.add(function(success, error){
			setTimeout(success, time)
		}, cb, "Couldn't wait!", time * 2)
	}
	
	FuncUnit._repeat = function(script, callback){
		var f = script;
		if (typeof script == "string") {
			script = script.replace(/\n/g, "\\n")
			f = function(){
				with (opener) {
					var result = eval("(" + script + ")")
				}
				return result;
			}
		}
		if (callback) {
			var interval = null;
			var time = new Date();
			interval = setInterval(function(){
				if (callback.failed) {
					clearInterval(interval);
				}
				else {
					var result = null;
					try {
						result = f()
					} 
					catch (e) {
					}
					
					if (result) {
						clearInterval(interval);
						callback();
					}
				}
			}, 1);
			
		}
		else {
			var result = f();
			return result;//this.convert( result);
		}
	}
	

	
	
	FuncUnit.makeArray = function(arr){
		var narr = [];
		for (var i = 0; i < arr.length; i++) {
			narr[i] = arr[i]
		}
		return narr;
	}
	FuncUnit.
	/**
	 * Converts a string into a Native JS type.
	 * @param {Object} str
	 */
	convert = function(str){
		//if it is an object and not null, eval it
		if (str !== null && typeof str == "object") {
			return object;
		}
		str = String(str);
		switch (str) {
			case "false":
				return false;
			case "null":
				return null;
			case "true":
				return true;
			case "undefined":
				return undefined;
			default:
				if (/^\d+\.\d+$/.test(str) || /^\d+$/.test(str)) {
					return 1 * str;
				}
				
				return str;
		}
	}
	/**
	 * @prototype
	 */
	//list of jQuery functions we want
	FuncUnit.funcs = [
	
	'synthetic', 
	/**
	 * @function size
	 * Calls back with the size
	 */
	'size', 
	'data', 
	/**
	 * @function attr
	 */
	'attr', 
	'removeAttr', 
	'addClass', 
	/**
	 * @function hasClass
	 */
	'hasClass', 
	'removeClass', 
	'toggleClass', 
	/**
	 * @function html
	 */
	'html', 
	/**
	 * @function text
	 */
	'text', 
	/**
	 * @function val
	 */
	'val', 
	/**
	 * @function empty
	 */
	'empty', 
	/**
	 * @function css
	 */
	'css', 
	/**
	 * @function offset
	 */
	'offset',
	/**
	 * @function offsetParent
	 */ 
	'offsetParent', 
	/**
	 * @function position
	 */ 
	'position',
	/**
	 * @function scrollTop
	 */ 
	'scrollTop', 
	/**
	 * @function scrollLeft
	 */
	'scrollLeft', 
	/**
	 * @function height
	 */
	'height', 
	/**
	 * @function width
	 */
	'width', 
	/**
	 * @function innerHeight
	 */
	'innerHeight', 
	/**
	 * @function innerWidth
	 */
	'innerWidth', 
	/**
	 * @function outerHeight
	 */
	'outerHeight', 
	/**
	 * @function outerWidth
	 */
	'outerWidth']
	FuncUnit.makeFunc = function(fname){
		FuncUnit.init.prototype[fname] = function(){
			//assume last arg is callback
			var args = FuncUnit.makeArray(arguments), callback;
			if (typeof args[args.length - 1] == "function") {
				callback = args.pop();
			}
			
			args.unshift(fname)
			args.unshift(this.context)
			args.unshift(this.selector)
			
			FuncUnit.add(function(success, error){
				var ret = FuncUnit.$.apply(FuncUnit.$, args);//  (selector,fname)
				success(ret)
			}, callback, "Can't get text of " + this.selector)
			return this;
		}
	}
	FuncUnit.makeWait = function(fname){
		var caps = fname.substr(0,1).toUpperCase()+fname.substr(1);
		FuncUnit.init.prototype["wait"+caps] = function(){
			//assume last arg is callback
			var args = FuncUnit.makeArray(arguments), 
				callback,
				tester;
			if (typeof args[args.length - 1] == "function") {
				tester = args.pop();
			}
			if (typeof args[args.length - 1] == "function") {
				callback = tester;
				tester = args.pop();
			}
			args.unshift(fname)
			args.unshift(this.context)
			args.unshift(this.selector)
			
			FuncUnit.add(function(success, error){
				FuncUnit._repeat(function(){
					var ret = FuncUnit.$.apply(FuncUnit.$, args);
					return tester(ret)
				}, success)
			}, callback, "wait"+caps +" on " + this.selector)
			return this;
		}
	}
})();





FuncUnit.init = function(s, c){
	this.selector = s;
	this.context = c == null ? FuncUnit.window.document : c;
}
FuncUnit.init.prototype = {
	/**
	 * Waits until an element exists
	 * @param {Object} cb
	 * @param {Object} timeout
	 */
	exists: function(cb, timeout){
		var selector = this.selector, context = this.context;
		FuncUnit.add(function(success, error){
			FuncUnit._repeat(function(){
				//return jQuery(selector, page.document).length
				return FuncUnit.$(selector, context, "size");
			}, success)
		}, cb, "Could not find " + this.selector, timeout)
	},
	/**
	 * Waits until an object is missing
	 * @param {Object} cb
	 * @param {Object} timeout
	 */
	missing: function(cb, timeout){
		var selector = this.selector, context = this.context;
		FuncUnit.add(function(success, error){
			FuncUnit._repeat(function(){
				//return jQuery(selector, page.document).length
				return !FuncUnit.$(selector, context, "size");
			}, success)
		}, cb, "Could not find " + this.selector, timeout)
	},
	/**
	 * Waits until an object is visible
	 * @param {Object} cb
	 * @param {Object} timeout
	 */
	visible: function(cb, timeout){
		var selector = this.selector, context = this.context;
		FuncUnit.add(function(success, error){
			FuncUnit._repeat(function(){
				//return jQuery(selector, page.document).length
				return FuncUnit.$(selector+":visible", context, "size");
			}, success)
		}, cb, "Could not find " + this.selector+":visible", timeout)
	},
	/**
	 * Waits until an object is invisible
	 * @param {Object} cb
	 * @param {Object} timeout
	 */
	invisible: function(cb, timeout){
		var selector = this.selector, context = this.context;
		FuncUnit.add(function(success, error){
			FuncUnit._repeat(function(){
				//return jQuery(selector, page.document).length
				return !FuncUnit.$(selector+":visible", context, "size");
			}, success)
		}, cb, "Could not find " + this.selector+":visible", timeout)
	},
	/**
	 * Types text into the object
	 * @param {Object} text
	 * @param {Object} callback
	 */
	type: function(text, callback){
		var selector = this.selector, context = this.context;
		FuncUnit.add(function(success, error){
			for (var c = 0; c < text.length; c++) {
				FuncUnit.$(selector, context, "synthetic", "key", text.substr(c, 1))
			}
			
			setTimeout(success, 13)
		}, callback, "Could not type " + text + " into " + this.selector)
	},
	/**
	 * Clicks an object
	 * @param {Object} options
	 * @param {Object} callback
	 */
	click: function(options, callback){
		var selector = this.selector, context = this.context;
		FuncUnit.add(function(success, error){
			FuncUnit.$(selector, context, "synthetic", "click", options, FuncUnit.window)
			setTimeout(success, 13)
		}, callback, "Could not click " + this.selector)
		return this;
	}
};


(function(){
	for (var i = 0; i < FuncUnit.funcs.length; i++) {
		FuncUnit.makeFunc(FuncUnit.funcs[i])
		FuncUnit.makeWait(FuncUnit.funcs[i])
	}
})();
S = FuncUnit;


})
//now add drivers
.then('resources/selenium_start',
'drivers/selenium',
'drivers/standard')