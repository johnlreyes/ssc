package org.ssc.service;

import java.util.List;

import org.ssc.model.UrlModel;

public interface UrlService {

	List<UrlModel> getAllUrl();
	
	void addUrl(UrlModel model);
}