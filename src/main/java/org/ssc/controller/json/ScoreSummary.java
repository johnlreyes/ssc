package org.ssc.controller.json;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.NDC;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;
import org.ssc.model.UrlModel;
import org.ssc.service.UrlService;

public class ScoreSummary implements Controller {

//    private Logger logger = Logger.getLogger("org.ssc");

	private UrlService urlService;
	
	@Override
	@SuppressWarnings ("unchecked")
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView returnValue = null;
//		logger.log(Level.INFO, getClass().getName() + ":handleRequest");
//        NDC.push("   ");

		List<Map<String, String>> rows = new ArrayList<Map<String, String>>();
		
		for (UrlModel urlModel : urlService.getAllUrl()) {
			Map<String, String> row = new LinkedHashMap<String, String>();
			row.put("url", urlModel.getUrl());
			rows.add(row);
		}
		
		Map model = new LinkedHashMap ();
		model.put("rows", rows);
		
		returnValue =  new ModelAndView(new JSONView(), model);
//		NDC.pop();
		return returnValue;
	}

	public UrlService getUrlService() {
		return urlService;
	}

	public void setUrlService(UrlService urlService) {
		this.urlService = urlService;
	}
}