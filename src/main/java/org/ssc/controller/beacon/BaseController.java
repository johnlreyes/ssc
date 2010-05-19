package org.ssc.controller.beacon;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;
import org.ssc.controller.beacon.param.ParamContext;
import org.ssc.model.UrlModel;
import org.ssc.service.UrlService;

abstract public class BaseController implements Controller {

	private static final long serialVersionUID = 1L;
	
	private UrlService urlService;

	abstract protected ParamContext getParamContext();

	abstract protected void processBeacon(HttpServletRequest req);

	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("[" + getClass().getName() + ":handleRequest] - START");
		processBeacon(request);
		String[] uArr = (String[]) request.getParameterMap().get(getParamContext().getUrlKey());
		if (uArr != null && uArr.length > 0) {
			String url = uArr[0];
			UrlModel model = new UrlModel();
			model.setUrl(url);
			urlService.addUrl(model);
		}
		displaySavedUrls();
		System.out.println("[" + getClass().getName() + ":handleRequest] - END");
		return null;
	}
	
	private void displaySavedUrls() {
		System.out.println("["+getClass().getName()+":displaySavedUrls] - START");
		List<UrlModel> url_list = urlService.getAllUrl();
		int counter = 1;
		for (UrlModel u: url_list) {
			System.out.println("["+counter+"] "+u.getId()+"-"+u.getUrl());
			counter ++;
		}
		System.out.println("["+getClass().getName()+":displaySavedUrls] - END");
	}

	public UrlService getUrlService() {
		return urlService;
	}

	public void setUrlService(UrlService urlService) {
		this.urlService = urlService;
	}
}