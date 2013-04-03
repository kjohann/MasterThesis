package models;

public class ViewBid {
	private String name;
	private int itemno, value;
	public ViewBid(String name, int itemno, int value) {
		super();
		this.name = name;
		this.itemno = itemno;
		this.value = value;
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
