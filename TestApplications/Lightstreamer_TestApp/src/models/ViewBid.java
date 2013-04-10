package models;

public class ViewBid {
	private String name, userId;
	private int itemno, value;
	public ViewBid(String name, int itemno, int value) {
		this(name, itemno, value, null);
	}
	
	public ViewBid(String name, int itemno, int value, String userId) {
		this.name = name;
		this.itemno = itemno;
		this.value = value;
		this.userId = userId;
	}
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getItemno() {
		return itemno;
	}
	public void setItemno(int itemno) {
		this.itemno = itemno;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	
	
}
