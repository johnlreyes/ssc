package org.ssc.db.create;

import java.sql.Connection;

public class Derby implements TableCreationStrategy {

	public static final String[] DB_TABLES_URLS_INFO = {"url_list", "/db/tables/derby/urls.sql"};
	public static final String[] DB_TABLES_YSLOW2_INFO = {"yslow2", "/db/tables/derby/yslow2.sql"};
	
	@Override
	public void create(Connection conn) {
		CreateUtil.create(conn, DB_TABLES_URLS_INFO);
		CreateUtil.create(conn, DB_TABLES_YSLOW2_INFO);
	}
}
