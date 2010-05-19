package org.ssc.controller.beacon.param;

import java.util.Map;

public class ParamContext implements ParamStrategy {

	private ParamStrategy strategy;
	
	public ParamContext(ParamStrategy strategy) {
		this.strategy = strategy;
	}
	
	public String getUrlKey() {
		return this.strategy.getUrlKey();
	}
	
	@Override
	public Object getBeanObject(Map<String, String[]> param) {
		return this.strategy.getBeanObject(param);
	}
}