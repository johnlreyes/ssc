package org.ssc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.ssc.dao.UrlDao;
import org.ssc.model.UrlModel;
import org.ssc.service.UrlService;

@Transactional
public class UrlServiceImpl implements UrlService {

	@Autowired
	private UrlDao urlDao;
	
	
	@Override
	public List<UrlModel> getAllUrl() {
		return urlDao.getAll();
	}	
	
	@Override
	public void addUrl(UrlModel model) {
		urlDao.save(model);
	}
}