package models;

import java.sql.Date;

public class Item {
	private int itemno, price, addedByID;
	private String name, description;
	private Date expires;
	public Item(int itemno, int price, int addedByID, String name,
			String description, Date expires) {
		super();
		this.itemno = itemno;
		this.price = price;
		this.addedByID = addedByID;
		this.name = name;
		this.description = description;
		this.expires = expires;
	}
	public int getItemno() {
		return itemno;
	}
	public void setItemno(int itemno) {
		this.itemno = itemno;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getAddedByID() {
		return addedByID;
	}
	public void setAddedByID(int addedByID) {
		this.addedByID = addedByID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getExpires() {
		return expires;
	}
	public void setExpires(Date expires) {
		this.expires = expires;
	}		
}
