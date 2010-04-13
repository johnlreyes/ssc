package org.ssc.servlet.beacon;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.ssc.DBUtil;

public class YSlow2 extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("[" + getClass().getName() + ":doGet] - START");
		String[] uArr = (String[]) req.getParameterMap().get("u");
		if (uArr != null && uArr.length > 1) {
			String url = uArr[0];
			System.out.println("url=" + url);
			DBUtil.addUrl(url);
		}
		System.out.println("[" + getClass().getName() + ":doGet] - END");
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}
}
