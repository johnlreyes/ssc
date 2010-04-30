package org.ssc.servlet.beacon;

import javax.servlet.http.HttpServletRequest;

import org.ssc.model.PageSpeedModel;
import org.ssc.servlet.beacon.param.PageSpeedStrategy;
import org.ssc.servlet.beacon.param.ParamContext;
import org.ssc.servlet.beacon.param.YSlow2Strategy;


public class PageSpeed extends AbstractBeaconServlet {

	private static final long serialVersionUID = 1L;
	
	protected ParamContext getParamContext() {
		return new ParamContext(new YSlow2Strategy());
	}
	
	@SuppressWarnings("unchecked")
	protected void processBeacon(HttpServletRequest req) {
		System.out.println("["+getClass().getName()+":processBeacon] - START");
		PageSpeedModel model = (PageSpeedModel)new ParamContext(new PageSpeedStrategy()).getBeanObject(req.getParameterMap());
		System.out.println("model="+model);		
		System.out.println("["+getClass().getName()+":processBeacon] - END");
	}
}