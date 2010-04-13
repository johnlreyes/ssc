package org.ssc.servlet.beacon.param;

import java.util.Map;

public interface ParamStrategy {

	String getUrlKey();
		
	Object getBeanObject(Map<String, String[]> param);
}
