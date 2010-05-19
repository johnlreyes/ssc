package org.ssc.controller.beacon.param;

import java.util.Map;

public interface ParamStrategy {

	String getUrlKey();
		
	Object getBeanObject(Map<String, String[]> param);
}
