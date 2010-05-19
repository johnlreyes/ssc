package org.ssc.dao;

import java.util.List;

import org.ssc.model.UrlModel;

public interface UrlDao {

	UrlModel getById(int id);
	
	void save(UrlModel model);
	
	void delete(UrlModel model);
	
	void update(UrlModel model);
	
	List<UrlModel> getAll();
	
	boolean exist(String url);
} 