package org.ssc.controller.beacon;

import javax.servlet.http.HttpServletRequest;

import org.ssc.controller.beacon.param.ParamContext;
import org.ssc.controller.beacon.param.YSlow2Strategy;
import org.ssc.model.PageSpeedModel;

public class YSlow2 extends BaseController {

	protected ParamContext getParamContext() {
		return new ParamContext(new YSlow2Strategy());
	}
	
	@SuppressWarnings("unchecked")
	protected void processBeacon(HttpServletRequest req) {
		System.out.println("[" + getClass().getName() + ":processBeacon] - START");
		PageSpeedModel model = (PageSpeedModel)new ParamContext(new YSlow2Strategy()).getBeanObject(req.getParameterMap());
		System.out.println("model="+model);		
		System.out.println("["+getClass().getName()+":processBeacon] - END");
	}
}