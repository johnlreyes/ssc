steal.plugins('jquery').then(function(){
	var liveHandler = null, event = jQuery.event;
	
	
	/**
	 * Finds event handlers of a given type on an element.
	 * @param {Object} el
	 * @param {Object} types
	 * @param {Object} selector
	 */
	event.find  = function(el, types, selector){
		var events = $.data(el, "events"), handlers = [];
		
		
		
		
		if(!events) return handlers;
		
		if(selector){
			if( !events.live) return [];
			var live = events.live, handlers = [];

			for (var t = 0; t < live.length; t++) {
				var liver = live[t];
				if(  liver.selector == selector &&  $.inArray(liver.origType, types  ) !== -1 ){
					handlers.push(liver.origHandler || liver.handler)
				}
			}
		}else{
			for(var t =0; t< types.length; t++){
				var type = types[t], 
					typeHandlers,
					all = type.indexOf(".") < 0,
					namespaces,
					namespace; 
				if ( !all ) {
					namespaces = type.split(".");
					type = namespaces.shift();
					namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
				}
				typeHandlers = ( events[type] || [] ).slice(0)
				
				for(var h = 0; h <typeHandlers.length; h++ ){
					var handle = typeHandlers[h];
					if(handle.selector == selector && (all || namespace.test( handle.namespace ))  )
						handlers.push(handle.origHandler || handle.handler)
				}
			}
			
			
		}
		return handlers;
	}
    event.findBySelector = function(el, types){
        var events = $.data(el, "events"), 
            selectors = {}, 
            add = function(selector, event, handler){
                var select = selectors[selector] ||  (selectors[selector] = {}),
                    events = select[event] || (select[event] = []);
                events.push(handler)
            };

		if(!events) return selectors;
		//first check live:
        $.each(events.live||[],function(i, live){
            if($.inArray(live.origType, types  ) !== -1){
                add(live.selector, live.origType,live.origHandler || live.handler )
            }
        })
        //then check straight binds
        
		for(var t =0; t< types.length; t++){
			var type = types[t], 
				typeHandlers,
				all = type.indexOf(".") < 0,
				namespaces,
				namespace; 
			if ( !all ) {
				namespaces = type.split(".");
				type = namespaces.shift();
				namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
			}
			typeHandlers = ( events[type] || [] ).slice(0)
			
			for(var h = 0; h <typeHandlers.length; h++ ){
				var handle = typeHandlers[h];
				if(!handle.selector && (all || namespace.test( handle.namespace ))  )
					add("", type, handle.origHandler || handle.handler )
			}
		}
		return selectors;
    }
	$.fn.respondsTo = function(events){
		if(!this.length){
			return false;
		}else{
			//add default ?
			return event.find(this[0], $.isArray(events) ? events : [events]).length > 0;
		}
	}
	$.fn.triggerHandled = function(event, data){
		event = ( typeof event == "string" ? $.Event(event) : event);
		this.trigger(event, data)
		return event.handled
	}
	/**
	 * Only attaches one event handler for all types ...
	 * @param {Array} types llist of types that will delegate here
	 * @param {Object} startingEvent the first event to start listening to
	 * @param {Object} onFirst a function to call 
	 */
	event.setupHelper = function(types, startingEvent, onFirst){
		if(!onFirst) {
			onFirst = startingEvent;
			startingEvent = null;
		}
		var add = function(handleObj){
			
			var selector = handleObj.selector || "";
			if (selector) {
				var bySelector = event.find(this, types, selector);
				if (!bySelector.length) {
					$(this).delegate(selector,startingEvent, onFirst );
				}
			}
			else {
				//var bySelector = event.find(this, types, selector);
				event.add(this, startingEvent, onFirst, {
					selector: selector,
					delegate: this
				})
			}
			
		}
		var remove = function(handleObj){
			var selector = handleObj.selector || ""
			if (selector) {
				var bySelector = event.find(this, types, selector);
				if (!bySelector.length) {
					$(this).undelegate(selector,startingEvent, onFirst );
				}
			}
			else {
				event.remove(this, startingEvent, onFirst, {
					selector: selector,
					delegate: this
				})
			}
		}
		$.each(types, function(){
			event.special[this] = {
				add:  add,
				remove: remove,
				setup : function(){}
			}
		})
	}
	
	
	
})