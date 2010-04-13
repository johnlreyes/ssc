package org.ssc.db.create;

import java.sql.Connection;
import java.sql.Statement;

import org.ssc.util.StringUtil;

public final class CreateUtil {

	public static void create(Connection conn, String[] sqlInfo) {
		System.out.println("[" + CreateUtil.class.getName() + ":prepareTables] - START");
		Statement st = null;
		try {
			String createSQL = StringUtil.sqlFileToString(sqlInfo[1]);
			System.out.println("sqlPath=" + sqlInfo[1]);
			System.out.println("urlsSQL=" + createSQL);
			st = conn.createStatement();
			try {
				st.execute("SELECT count(*) FROM " + sqlInfo[0]);
			} catch (Exception ex) {
				st.execute(createSQL);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				st.close();
			} catch (Exception ex) {
			}
		}
		System.out.println("[" + CreateUtil.class.getName() + ":prepareTables] - END");
	}
}
