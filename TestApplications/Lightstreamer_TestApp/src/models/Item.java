package models;

import java.sql.Date;

public class Item {
	private int itemno, price, addedByID;
	private String name, description, username;
	private Date expires;
	
	public Item(int itemno) {
		this(itemno, Integer.MAX_VALUE, Integer.MAX_VALUE,"Deleting", "Delete item", null, "DeleteUser");
	}

	public Item(int itemno, int price, int addedByID, String name, String description, Date expires, String username) {
		this.itemno = itemno;
		this.price = price;
		this.addedByID = addedByID;
		this.name = name;
		this.description = description;
		this.expires = expires;
		this.username = username;
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
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
