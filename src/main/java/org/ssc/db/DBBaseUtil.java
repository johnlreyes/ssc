package org.ssc.db;

import java.sql.Connection;
import java.sql.DriverManager;

import org.ssc.db.create.Derby;
import org.ssc.db.create.TableCreateContext;

abstract class DBBaseUtil {

	protected static Connection conn = null;

	static {
		createConnection();
	}
	
	private static void createConnection() {
		System.out.println("["+DBUtil.class.getName()+":createConnection] - START");
		try {
			Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
			conn = DriverManager.getConnection("jdbc:derby:ssc;create=true");
			TableCreateContext context = new TableCreateContext(new Derby());
			context.create(conn);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		System.out.println("["+DBUtil.class.getName()+":createConnection] - END");
	}

	
}
