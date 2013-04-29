package models;


import play.db.ebean.*;
import play.db.ebean.Model.Finder;

import javax.persistence.*;

@Entity
public class Bid extends Model{
	@Id
	@Column(name="bidID")
	private int bidID;
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="itemno")
	private Item itemno;
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="userID")
	private User userID;
	@Column(name="value")
	private int value;
	@Column(name="username")
	private String username;
	
	public Bid(int itemno, long userID, int value, String username) {
		this.itemno = Item.find.byId(itemno);
		this.userID = User.find.byId(userID);
		this.value = value;
		this.username = username;
	}

	public static Finder<Long,Bid> find = new Finder<Long,Bid>(Long.class, Bid.class);
	
	public boolean add() {
		this.save();
		return this.bidID > 0;
	}
	
	public int getBidID() {
		return bidID;
	}

	public Item getItemno() {
		return itemno;
	}

	public User getUserID() {
		return userID;
	}

	public int getValue() {
		return value;
	}

	public String getUsername() {
		return username;
	}

	public void setBidID(int bidID) {
		this.bidID = bidID;
	}

	public void setItemno(Item itemno) {
		this.itemno = itemno;
	}

	public void setUserID(User userID) {
		this.userID = userID;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
