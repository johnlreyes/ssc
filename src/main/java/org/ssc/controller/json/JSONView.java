package org.ssc.controller.json;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.web.servlet.View;

public class JSONView implements View {

	@Override
	public String getContentType() {
		return "text/json";
	}

	@SuppressWarnings("unchecked")
	public void render(Map map, HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONObject jsonObject = JSONObject.fromObject(map);
		PrintWriter writer = response.getWriter();
		writer.write(jsonObject.toString());
	}
}