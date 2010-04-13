package org.ssc.servlet.beacon;

import javax.servlet.http.HttpServletRequest;

import org.ssc.model.YSlow2Model;
import org.ssc.servlet.beacon.param.ParamContext;
import org.ssc.servlet.beacon.param.YSlow2Strategy;


public class YSlow2 extends AbstractBeaconServlet {

	private static final long serialVersionUID = 1L;
	
	protected ParamContext getParamContext() {
		return new ParamContext(new YSlow2Strategy());
	}
	
	protected void processBeacon(HttpServletRequest req) {
		System.out.println("["+getClass().getName()+":processBeacon] - START");
		YSlow2Model model = (YSlow2Model)new ParamContext(new YSlow2Strategy()).getBeanObject(req.getParameterMap());
		System.out.println("model="+model);
		
		System.out.println("["+getClass().getName()+":processBeacon] - END");
	}
}
