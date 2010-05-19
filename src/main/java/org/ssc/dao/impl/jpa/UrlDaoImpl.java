package org.ssc.dao.impl.jpa;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
			returnValue.addAll(this.entityManager.createQuery(
					"FROM UrlModel um").getResultList());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return returnValue;
	}
}