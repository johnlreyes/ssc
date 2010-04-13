package org.ssc.db.create;

import java.sql.Connection;

public class TableCreateContext implements TableCreationStrategy {

	private TableCreationStrategy strategy;

	public TableCreateContext(TableCreationStrategy strategy) {
		this.strategy = strategy;
	}

	@Override
	public void create(Connection conn) {
		this.strategy.create(conn);
	}
}
