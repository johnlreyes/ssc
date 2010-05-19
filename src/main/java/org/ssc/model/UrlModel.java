package org.ssc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table (name="url_list")
public @Data class UrlModel {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int id;	
	
	@Column (name="url")
	private String url;	
}