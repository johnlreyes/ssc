package org.ssc.controller.beacon;

import javax.servlet.http.HttpServletRequest;

import org.ssc.controller.beacon.param.PageSpeedStrategy;
import org.ssc.controller.beacon.param.ParamContext;
import org.ssc.model.PageSpeedModel;

public class PageSpeed extends BaseController {

	protected ParamContext getParamContext() {
		return new ParamContext(new PageSpeedStrategy());
	}
	
	@SuppressWarnings("unchecked")
	protected void processBeacon(HttpServletRequest req) {
		System.out.println("[" + getClass().getName() + ":processBeacon] - START");
		PageSpeedModel model = (PageSpeedModel)new ParamContext(new PageSpeedStrategy()).getBeanObject(req.getParameterMap());
		System.out.println("model="+model);		
		System.out.println("["+getClass().getName()+":processBeacon] - END");
	}
}