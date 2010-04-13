package org.ssc.db.create;

import java.sql.Connection;

public class Derby implements TableCreationStrategy {

	public static final String[][] DB_TABLES = 
	{
		{ "url_list", "/db/tables/derby/urls.sql" },
		{ "yslow2", "/db/tables/derby/yslow2.sql" },
		{ "pagespeed", "/db/tables/derby/pagespeed.sql" }
	};
	
	
	@Override
	public void create(Connection conn) {
		for (String[] info : DB_TABLES) {
			CreateUtil.create(conn, info);
		}
	}
}
