package org.ssc.db;

import java.sql.Connection;
import java.sql.DriverManager;

abstract class DBBaseUtil {

	protected static Connection conn = null;

	static {
		createConnection();
	}
	
	private static void createConnection() {
		try {
			Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
			conn = DriverManager.getConnection("jdbc:derby:database/ssc");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}	
}