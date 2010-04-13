package org.ssc.model.parser;

import java.util.Map;

import org.ssc.model.YSlow2Model;

public class YSlow2ParamParser {

	private final static String[][] PARAM_INFO = 
	{ 
		{ "u", ParamEnum.VARCHAR.toString()}, 
		{ "w", ParamEnum.INT.toString() }, 
		{ "o", ParamEnum.INT.toString() },
		{ "i", ParamEnum.VARCHAR.toString() },
		{ "lt", ParamEnum.INT.toString() },
		
		{ "ynumreq", ParamEnum.INT.toString() },
		{ "ycdn", ParamEnum.INT.toString() },
		{ "yexpires", ParamEnum.INT.toString() },
		{ "ycompress", ParamEnum.INT.toString() },
		{ "ycsstop", ParamEnum.INT.toString() },
		{ "yjsbottom", ParamEnum.INT.toString() },
		{ "yexpressions", ParamEnum.INT.toString() },
		{ "yexternal", ParamEnum.INT.toString() },
		{ "ydns", ParamEnum.INT.toString() },
		{ "yminify", ParamEnum.INT.toString() },
		{ "yredirects", ParamEnum.INT.toString() },
		{ "ydupes", ParamEnum.INT.toString() },
		{ "yetags", ParamEnum.INT.toString() },
		{ "yxhr", ParamEnum.INT.toString() },
		{ "yxhrmethod", ParamEnum.INT.toString() },
		{ "ymindom", ParamEnum.INT.toString() },
		{ "yno404", ParamEnum.INT.toString() },
		{ "ymincookie", ParamEnum.INT.toString() },
		{ "ycookiefree", ParamEnum.INT.toString() },
		{ "ynofilter", ParamEnum.INT.toString() },
		{ "yimgnoscale", ParamEnum.INT.toString() },
		{ "yfavicon", ParamEnum.INT.toString() },
		{ "details", ParamEnum.VARCHAR.toString() },
	};

	public static YSlow2Model parse(Map<String, String[]> paramMap) {
		YSlow2Model returnValue = new YSlow2Model();
		ParamToBean.parse(returnValue, paramMap, PARAM_INFO);
		return returnValue;
	}

}
