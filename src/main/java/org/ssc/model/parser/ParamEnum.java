package org.ssc.model.parser;

public enum ParamEnum {

	INT ("int"), VARCHAR ("varchar");
	
	private String value;
	
	ParamEnum(String value) {
		this.value = value;
	}
	
	@Override
	public String toString() {
		return value;
	}
}
