package org.ssc.controller.json;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;
import org.ssc.model.UrlModel;
import org.ssc.service.UrlService;

public class ScoreSummary implements Controller {

	private UrlService urlService;
	
	@Override
	@SuppressWarnings ("unchecked")
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView returnValue = null;
		System.out.println("[" + getClass().getName() + ":handleRequest] - START");
		
		List<Map<String, String>> rows = new ArrayList<Map<String, String>>();
		
		for (UrlModel urlModel : urlService.getAllUrl()) {
			Map<String, String> row = new LinkedHashMap<String, String>();
			row.put("url", urlModel.getUrl());
			rows.add(row);
		}
		
		Map model = new LinkedHashMap ();
		model.put("rows", rows);
		
		returnValue =  new ModelAndView(new JSONView(), model);
		System.out.println("[" + getClass().getName() + ":handleRequest] - END");
		return returnValue;
	}

	public UrlService getUrlService() {
		return urlService;
	}

	public void setUrlService(UrlService urlService) {
		this.urlService = urlService;
	}
}