package org.ssc.model;

import lombok.Data;

public @Data class PageSpeedModel {

	private String u;
	
	private Integer w;
	private Float o;
	private Integer l;
	private Integer r;
	private Integer t;
	private String v;
	
	private Float pMinifyCSS;
	private Float pMinifyJS;
	private Float pOptImgs;
	private Float pImgDims;
	private Float pCombineJS;
	private Float pCombineCSS;
	private Float pBrowserCache;
	private Float pProxyCache;
	private Float pNoCookie;
	private Float pParallelDl;
	private Float pCssSelect;
	private Float pDeferJS;
	private Float pGzip;
	private Float pMinRedirect;
	private Float pCssExpr;
	private Float pUnusedCSS;
	private Float pMinDns;
	private Float pDupeRsrc;
	private Float pScaleImgs;
	private Float pMinifyHTML;
	private Float pMinimizeRequestSize;
	private Float pOptimizeTheOrderOfStylesAndScripts;
	private Float pPutCssInTheDocumentHead;
	private Float pSpecifyCharsetEarly;
}