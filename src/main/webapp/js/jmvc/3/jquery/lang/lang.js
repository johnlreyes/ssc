steal.then(function(){
	


// Several of the methods in this plugin use code adapated from Prototype
//  Prototype JavaScript framework, version 1.6.0.1
//  (c) 2005-2007 Sam Stephenson

jQuery.String = {};
jQuery.String.strip = function(string){
	return string.replace(/^\s+/, '').replace(/\s+$/, '');
};


jQuery.Function = {};
jQuery.Function.params = function(func){
	var ps = func.toString().match(/^[\s\(]*function[^(]*\((.*?)\)/)[1].split(",");
	if( ps.length == 1 && !ps[0]) return [];
	for(var i = 0; i < ps.length; i++) ps[i] = jQuery.String.strip(ps[i]);
	return ps;
};

/**
 * @class jQuery.Native
 */
jQuery.Native ={};
jQuery.Native.
/**
 * 
 * @param {Object} class_name
 * @param {Object} source
 */
extend = function(class_name, source){
	if(!jQuery[class_name]) jQuery[class_name] = {};
	var dest = jQuery[class_name];
	for (var property in source){
		dest[property] = source[property];
	}
};


/* 
 * @class jQuery.String
 * When not in no-conflict mode, JMVC adds the following helpers to string
 */
jQuery.Native.extend('String', 
/* @Static*/
{
    /*
     * Capitalizes a string
     * @param {String} s the string to be lowercased.
     * @return {String} a string with the first character capitalized, and everything else lowercased
     */
	capitalize : function(s, cache) {
		return s.charAt(0).toUpperCase()+s.substr(1);
	},
    /**
     * Returns if a string has another string inside it.
     * @param {String} string String that is being scanned
     * @param {String} pattern String that we are looking for
     * @return {Boolean} true if the string has pattern, false if otherwise
     */
	include : function(s, pattern){
		return s.indexOf(pattern) > -1;
	},
    /**
     * Returns if string ends with another string
     * @param {String} s String that is being scanned
     * @param {String} pattern What the string might end with
     * @return {Boolean} true if the string ends wtih pattern, false if otherwise
     */
	endsWith : function(s, pattern) {
	    var d = s.length - pattern.length;
	    return d >= 0 && s.lastIndexOf(pattern) === d;
	},
    /**
     * Capitalizes a string from something undercored. Examples:
     * @codestart
     * jQuery.String.camelize("one_two") //-> "oneTwo"
     * "three-four".camelize() //-> threeFour
     * @codeend
     * @param {String} s
     * @return {String} a the camelized string
     */
	camelize: function(s){
		var parts = s.split(/_|-/);
		parts[0] = parts[0].charAt(0).toLowerCase()+parts[0].substr(1);
		for(var i = 1; i < parts.length; i++)
			parts[i] = jQuery.String.capitalize(parts[i]);
		return parts.join('');
	},
    /**
     * Like camelize, but the first part is also capitalized
     * @param {String} s
     * @return {String}
     */
	classize: function(s){
		var parts = s.split(/_|-/);
		for(var i = 0; i < parts.length; i++)
			parts[i] = jQuery.String.capitalize(parts[i]);
		return parts.join('');
	},
    /**
     * Like [jQuery.Native.String.static.classize|classize], but a space separates each 'word'
     * @codestart
     * jQuery.String.niceName("one_two") //-> "One Two"
     * @codeend
     * @param {String} s
     * @return {String}
     */
	niceName: function(s){
		var parts = s.split(/_|-/);
		for(var i = 0; i < parts.length; i++)
			parts[i] = jQuery.String.capitalize(parts[i]);
		return parts.join(' ');
	},
    /*
     * @function strip
     * @param {String} s returns a string with leading and trailing whitespace removed.
     */
	strip : jQuery.String.strip,
    regexps : {
        colons : /::/,
        words: /([A-Z]+)([A-Z][a-z])/g,
        lowerUpper : /([a-z\d])([A-Z])/g,
        dash : /([a-z\d])([A-Z])/g
    },
    underscore : function(s){
        var regs = jQuery.String.regexps;
        return s.replace(regs.colons, '/').
                 replace(regs.words,'$1_$2').
                 replace(regs.lowerUpper,'$1_$2').
                 replace(regs.dash,'_').toLowerCase()
    }
});

//Date Helpers, probably should be moved into its own class

/* 
 * @class jQuery.Array
 * When not in no-conflict mode, JMVC adds the following helpers to array
 */
jQuery.Native.extend('Array',
/* @static*/
{ 
	/**
	 * Searchs an array for item.  Returns if item is in it.
	 * @param {Object} array
	 * @param {Object} item an item that is matched with ==
	 * @return {Boolean}
	 */
    include: function(a, item){
		for(var i=0; i< a.length; i++){
			if(a[i] == item) return true;
		}
		return false;
	}
});



/* 
 * @class jQuery.Function
 * When not in no-conflict mode, JMVC adds the following helpers to function
 */
jQuery.Native.extend('Function', 
/* @static*/
{
	/**
	 * Binds a function to another object.  The object the function is binding
	 * to is the second argument.  Additional params are added to the callback function.
	 * @codestart
	 * //basic example
	 * var callback1 = jQuery.Function.bind(function(){alert(this.library)}, {library: "include"});
	 * //shows with prepended args
	 * var callback2 = jQuery.Function.bind(
	 *     function(version, os){
	 *         alert(this.library+", "+version+", "+os);
	 *     },
	 *     {library: "include"},
	 *     "1.5")
	 * @codeend
	 * @param {Function} f The function that is being bound.
	 * @param {Object} obj The object you want to bind to.
	 * @return {Function} the wrapping function.
	 */
    bind: function(f, obj) {
	  var args = jQuery.makeArray(arguments);
	  args.shift();args.shift();
	  var __method = f, object = arguments[1];
	  return function() {
	    return __method.apply(object, args.concat(jQuery.makeArray(arguments) )  );
	  }
	},
	params: jQuery.Function.params
});



})