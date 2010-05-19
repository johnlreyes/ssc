package org.ssc.dao.impl.jpa;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.ssc.dao.UrlDao;
import org.ssc.model.UrlModel;

public class UrlDaoImpl implements UrlDao {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public UrlModel getById(int id) {
		return entityManager.find(UrlModel.class, id);
	}

	@Override
	public void save(UrlModel model) {
		entityManager.persist(model);
	}

	@Override
	public void update(UrlModel model) {
		save(model);
	}

	@Override
	public void delete(UrlModel model) {
		this.entityManager.remove(model);
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<UrlModel> getAll() {
		List<UrlModel> returnValue = new ArrayList<UrlModel>();
		try {
			returnValue.addAll(this.entityManager.createQuery("FROM UrlModel um").getResultList());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return returnValue;
	}

	@Override
	public boolean exist(String url) {
		boolean returnValue = false;
		try {
//			Query query = this.entityManager.createNativeQuery("select count(*) FROM (SELECT url_list FROM sys.systables WHERE CAST(url_list AS VARCHAR(128)) = 'T1') t WHERE t.url='"+url+"'");
//			Query query = this.entityManager.createQuery("SELECT count(*) FROM UrlModel um WHERE CAST(um.url as varchar(500)) = :url").setParameter("url", url);
			Query query = this.entityManager.createQuery("SELECT count(*) FROM UrlModel um WHERE um.url = :url").setParameter("url", url);
			returnValue = ((Long) query.getSingleResult())>0;
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return returnValue;
	}
}