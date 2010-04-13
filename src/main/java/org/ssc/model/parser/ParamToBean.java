package org.ssc.model.parser;

import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;

public class ParamToBean {

	public static void parse(Object beanObject, Map<String, String[]> paramMap, String[][] paramInfo) {
		for (String[] info : paramInfo) {
			String[] arr = paramMap.get(info[0]);
			if (arr != null && arr.length > 0) {
				String value = arr[0];
				update(beanObject, info, value);
			}
		}
	}

	private static void update(Object obj, String[] info, String value) {
		if (info[1].compareToIgnoreCase(ParamEnum.VARCHAR.toString()) == 0) {
			try {
				BeanUtils.setProperty(obj, info[0], value);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		else if (info[1].compareToIgnoreCase(ParamEnum.INT.toString()) == 0) {
			try {
				int intValue = Integer.parseInt(value);
				BeanUtils.setProperty(obj, info[0], intValue);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
	}
}
