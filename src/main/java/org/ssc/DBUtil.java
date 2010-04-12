package org.ssc;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public final class DBUtil {

	private static final String DB_TABLES_URLS_SQL = "/db/tables/urls.sql";
	private static Connection conn = null;

	static {
		createConnection();
	}
	
	public static void addUrl(String url) {
		PreparedStatement psSelect = null;
		PreparedStatement psInsert = null;
		try {
			psSelect = conn.prepareStatement("SELECT count(*) FROM url_list WHERE url=?");
			psSelect.setString(1, url);
			ResultSet rs = psSelect.executeQuery();
			rs.next();
			boolean exist = rs.getInt(1)==0;
			System.out.println("exist="+exist);
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

	private static void createConnection() {
		System.out.println("["+DBUtil.class.getName()+":createConnection] - START");
		try {
			Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
			conn = DriverManager.getConnection("jdbc:derby:ssc;create=true");
			prepareTables();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		System.out.println("["+DBUtil.class.getName()+":createConnection] - END");
	}

	private static void prepareTables() {
		System.out.println("["+DBUtil.class.getName()+":prepareTables] - START");
		Statement st = null;
		try {
			String urlsSQL = sqlFileToString(DB_TABLES_URLS_SQL);
			System.out.println("urlsSQL="+urlsSQL);
			st = conn.createStatement();
			st.execute(urlsSQL);
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				st.close();
			} catch (Exception ex) {				
			}
		}
		System.out.println("["+DBUtil.class.getName()+":prepareTables] - END");
	}

	private static String sqlFileToString(String path) {
		InputStream is = DBUtil.class.getResourceAsStream(path);
		StringBuilder sb = new StringBuilder();
		String line;
		try {
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			while ((line=reader.readLine())!=null) {
				sb.append(line).append(" ");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return sb.toString();
	}
}
