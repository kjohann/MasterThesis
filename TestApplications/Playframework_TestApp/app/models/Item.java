package models;

import java.sql.Timestamp;

import play.db.ebean.*;
import play.db.ebean.Model.Finder;

import javax.persistence.*;

@Entity
public class Item extends Model{
	@Id
	@Column(name="itemno")
	private int itemno;
	@Column(name="name")
	private String name;
	@Column(name="description")
	private String description;
	@Column(name="expires")
	private Timestamp expires;
	@Column(name="price")
	private int price;
	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name="addedByID")
	private User addedByID;
	
	public Item(String name, String description, Timestamp expires, int price, long addedByID) {
		this.name = name;
		this.description = description;
		this.expires = expires;
		this.price = price;
		this.addedByID = User.find.ref(addedByID);
	}

	public static Finder<Long,Item> find = new Finder<Long,Item>(Long.class, Item.class);
	
	public int getItemno() {
		return itemno;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public Timestamp getExpires() {
		return expires;
	}

	public int getPrice() {
		return price;
	}

	public User getAddedByID() {
		return addedByID;
	}

	public void setItemno(int itemno) {
		this.itemno = itemno;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setExpires(Timestamp expires) {
		this.expires = expires;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public void setAddedByID(User addedByID) {
		this.addedByID = addedByID;
	}	
}
