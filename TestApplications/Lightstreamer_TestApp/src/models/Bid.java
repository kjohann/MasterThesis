package models;

public class Bid {
	private int bidID, itemno, userId, value;
	private String username;
	public Bid(int bidID, int itemno, int userId, int value, String username) {
		super();
		this.bidID = bidID;
		this.itemno = itemno;
		this.userId = userId;
		this.value = value;
		this.username = username;
	}
	public int getBidID() {
		return bidID;
	}
	public void setBidID(int bidID) {
		this.bidID = bidID;
	}
	public int getItemno() {
		return itemno;
	}
	public void setItemno(int itemno) {
		this.itemno = itemno;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
