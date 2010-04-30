package org.ssc.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.ssc.model.UrlModel;

public final class DBUtil extends DBBaseUtil {

	
	public static void addUrl(String url) {
		System.out.println("["+DBUtil.class.getName()+":addUrl] - START");
		PreparedStatement psSelect = null;
		PreparedStatement psInsert = null;
		try {
			psSelect = conn.prepareStatement("SELECT count(*) FROM url_list WHERE url=?");
			psSelect.setString(1, url);
			ResultSet rs = psSelect.executeQuery();
			rs.next();
			boolean dontExist = rs.getInt(1)==0;
			if (dontExist) {
				psInsert = conn.prepareStatement("INSERT INTO url_list(url) VALUES (?)");
				psInsert.setString(1, url);
				psInsert.executeUpdate();
			}	
			System.out.println("["+DBUtil.class.getName()+":addUrl] ADDED["+dontExist+"] "+url);
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
		System.out.println("["+DBUtil.class.getName()+":addUrl] - END");
	}
	
	public static List<UrlModel> getURLList() {
		List<UrlModel> returnValue = new ArrayList<UrlModel>();
		PreparedStatement psSelect = null;
		try {
			psSelect = conn.prepareStatement("SELECT id, url FROM url_list");
			ResultSet rs = psSelect.executeQuery();
			while (rs.next()) {
				UrlModel model = new UrlModel();
				model.setId(rs.getInt(1));
				model.setUrl(rs.getString(2));
				returnValue.add(model);
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