package org.ssc.servlet.beacon.param;

import java.util.Map;

import org.ssc.model.PageSpeedModel;
import org.ssc.model.parser.PageSpeedParamParser;

public class PageSpeedStrategy implements ParamStrategy {

	private static final String URL_KEY = "u";

	public String getUrlKey() {
		return URL_KEY;
	}
	
	@Override
	public Object getBeanObject(Map<String, String[]> paramMap) {
		PageSpeedModel model = PageSpeedParamParser.parse(paramMap);
		return model;
	}
}
