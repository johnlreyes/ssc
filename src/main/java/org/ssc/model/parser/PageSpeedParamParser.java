package org.ssc.model.parser;

import java.util.Map;

import org.ssc.model.PageSpeedModel;

public class PageSpeedParamParser {

	private final static String[][] PARAM_INFO = 
	{ 
		{ "u", ParamEnum.VARCHAR.toString()}, 
		
		{ "w", ParamEnum.INT.toString() }, 
		{ "o", ParamEnum.FLOAT.toString() },
		{ "l", ParamEnum.INT.toString() },
		{ "r", ParamEnum.INT.toString() },
		{ "t", ParamEnum.INT.toString() },
		{ "v", ParamEnum.VARCHAR.toString() },
		
		{ "pMinifyCSS", ParamEnum.FLOAT.toString() },
		{ "pMinifyJS", ParamEnum.FLOAT.toString() },
		{ "pOptImgs", ParamEnum.FLOAT.toString() },
		{ "pImgDims", ParamEnum.FLOAT.toString() },
		{ "pCombineJS", ParamEnum.FLOAT.toString() },
		{ "pCombineCSS", ParamEnum.FLOAT.toString() },
		{ "pBrowserCache", ParamEnum.FLOAT.toString() },
		{ "pProxyCache", ParamEnum.FLOAT.toString() },
		{ "pNoCookie", ParamEnum.FLOAT.toString() },
		{ "pParallelDl", ParamEnum.FLOAT.toString() },
		{ "pCssSelect", ParamEnum.FLOAT.toString() },
		{ "pDeferJS", ParamEnum.FLOAT.toString() },
		{ "pGzip", ParamEnum.FLOAT.toString() },
		{ "pMinRedirect", ParamEnum.FLOAT.toString() },
		{ "pCssExpr", ParamEnum.FLOAT.toString() },
		{ "pUnusedCSS", ParamEnum.FLOAT.toString() },
		{ "pMinDns", ParamEnum.FLOAT.toString() },
		{ "pDupeRsrc", ParamEnum.FLOAT.toString() },
		{ "pScaleImgs", ParamEnum.FLOAT.toString() },
		{ "pMinifyHTML", ParamEnum.FLOAT.toString() },
		{ "pMinimizeRequestSize", ParamEnum.FLOAT.toString() },
		{ "pOptimizeTheOrderOfStylesAndScripts", ParamEnum.FLOAT.toString() },
		{ "pPutCssInTheDocumentHead", ParamEnum.FLOAT.toString() },
		{ "pSpecifyCharsetEarly", ParamEnum.FLOAT.toString() },
		
	};

	public static PageSpeedModel parse(Map<String, String[]> paramMap) {
		PageSpeedModel returnValue = new PageSpeedModel();
		ParamToBean.parse(returnValue, paramMap, PARAM_INFO);
		return returnValue;
	}

}
