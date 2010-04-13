package org.ssc.util;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.ssc.db.DBUtil;

public final class StringUtil {

	public static String sqlFileToString(String path) {
		InputStream is = DBUtil.class.getResourceAsStream(path);
		StringBuilder sb = new StringBuilder();
		String line;
		try {
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			while ((line=reader.readLine())!=null) {
				sb.append(line.trim()).append(" ");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return sb.toString();
	}
}
