package models;

import java.sql.Date;

public class PrettyItem {
	private String name, description, highestBidder;
	private int price, bid, addedByID;
	private Date expires;
	
	public PrettyItem(String name, String description, String highestBidder, int price, int bid, int addedByID, Date expires) {
		this.name = name;
		this.description = description;
		this.highestBidder = highestBidder;
		this.price = price;
		this.bid = bid;
		this.addedByID = addedByID;
		this.expires = expires;
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

	public String getHighestBidder() {
		return highestBidder;
	}

	public void setHighestBidder(String highestBidder) {
		this.highestBidder = highestBidder;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getBid() {
		return bid;
	}

	public void setBid(int bid) {
		this.bid = bid;
	}

	public int getAddedByID() {
		return addedByID;
	}

	public void setAddedByID(int addedByID) {
		this.addedByID = addedByID;
	}

	public Date getExpires() {
		return expires;
	}

	public void setExpires(Date expires) {
		this.expires = expires;
	}
	
	
}
