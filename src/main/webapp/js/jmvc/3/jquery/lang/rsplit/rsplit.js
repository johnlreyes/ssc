steal.plugins('jquery/lang').then(function($){
	jQuery.Native.extend('String',{
		rsplit : function(string, regex) {
			var result = regex.exec(string),retArr = new Array(), first_idx, last_idx, first_bit;
			while (result != null)
			{
				first_idx = result.index; last_idx = regex.lastIndex;
				if ((first_idx) != 0)
				{
					first_bit = string.substring(0,first_idx);
					retArr.push(string.substring(0,first_idx));
					string = string.slice(first_idx);
				}		
				retArr.push(result[0]);
				string = string.slice(result[0].length);
				result = regex.exec(string);	
			}
			if (! string == '')
			{
				retArr.push(string);
			}
			return retArr;
		}
	})
})

