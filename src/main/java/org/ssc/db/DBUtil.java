package org.ssc.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public final class DBUtil extends DBBaseUtil {

	
	public static void addUrl(String url) {
		PreparedStatement psSelect = null;
		PreparedStatement psInsert = null;
		try {
			psSelect = conn.prepareStatement("SELECT count(*) FROM url_list WHERE url=?");
			psSelect.setString(1, url);
			ResultSet rs = psSelect.executeQuery();
			rs.next();
			boolean exist = rs.getInt(1)==0;
			if (exist) {
				psInsert = conn.prepareStatement("INSERT INTO url_list(url) VALUES (?)");
				psInsert.setString(1, url);
				psInsert.executeUpdate();
			}			
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				psSelect.close();
			} catch (Exception ex) {				
			}
			try {
				psInsert.close();
			} catch (Exception ex) {				
			}
		}
	}
	
	public static List<String> getURLList() {
		List<String> returnValue = new ArrayList<String>();
		PreparedStatement psSelect = null;
		try {
			psSelect = conn.prepareStatement("SELECT url FROM url_list");
			ResultSet rs = psSelect.executeQuery();
			while (rs.next()) {
				String url = rs.getString(1);
				returnValue.add(url);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				psSelect.close();
			} catch (Exception ex) {				
			}
		}
		return returnValue;
	}

	
}
