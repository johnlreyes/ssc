package org.ssc.db.create;

import java.sql.Connection;

public interface TableCreationStrategy {

	void create(Connection conn);
}
