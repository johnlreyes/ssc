package org.ssc.servlet.beacon;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.ssc.db.DBUtil;
import org.ssc.servlet.beacon.param.ParamContext;

abstract class AbstractBeaconServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	abstract protected ParamContext getParamContext();
	abstract protected void processBeacon(HttpServletRequest req);

	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("[" + getClass().getName() + ":doGet] - START");
		displayRaw(req);
		String[] uArr = (String[]) req.getParameterMap().get(getParamContext().getUrlKey());
		System.out.println("uArr="+uArr);
		if (uArr != null && uArr.length > 0) {
			String url = uArr[0];
			System.out.println("url=" + url);
			DBUtil.addUrl(url);
			displaySavedUrls();
		}
		
		processBeacon(req);
		
		System.out.println("[" + getClass().getName() + ":doGet] - END");
	}
	private void displayRaw(HttpServletRequest req) {
		System.out.println("***********************************************************************");
		System.out.println("param size="+req.getParameterMap().size());
		int counter = 1;
		for (String param : (Set<String>)req.getParameterMap().keySet()) {
			String value = req.getParameter(param);
			System.out.println("["+counter+"] "+param+"="+value);
			counter++;
		}
		System.out.println("***********************************************************************");
	}
	private void displaySavedUrls() {
		List<String> url_list = DBUtil.getURLList();
		int counter = 1;
		for (String u: url_list) {
			System.out.println("["+counter+"] "+u);
			counter ++;
		}
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}
}