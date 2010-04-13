package org.ssc.servlet.beacon.param;

import java.util.Map;

import org.ssc.model.YSlow2Model;
import org.ssc.model.parser.YSlow2ParamParser;

public class YSlow2Strategy implements ParamStrategy {

	private static final String URL_KEY = "u";

	public String getUrlKey() {
		return URL_KEY;
	}
	
	@Override
	public Object getBeanObject(Map<String, String[]> paramMap) {
		YSlow2Model model = YSlow2ParamParser.parse(paramMap);
		return model;
	}
}
