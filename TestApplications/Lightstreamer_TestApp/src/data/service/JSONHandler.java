package data.service;

import models.*;

import com.google.gson.Gson;

public class JSONHandler {
	private JSONHandler instance;
	private Gson gson;
	
	private JSONHandler() {
		gson = new Gson();
	}
	
	public JSONHandler getInstance() {
		return instance == null ? new JSONHandler() : instance;
	}
	
	public User userFromJSON(String json) {
		User user = gson.fromJson(json, User.class);
		return validateUser(user) ? user : null;
	}
	
	public Item itemFromJSON(String json) {
		Item item =  gson.fromJson(json, Item.class);
		return validateItem(item) ? item : null;
	}
	
	public Bid bidFromJSON(String json) {
		Bid bid = gson.fromJson(json, Bid.class);
		return validateBid(bid) ? bid : null;
	}
	
	private boolean validateUser(User user) {
		return user.getUsername() != null && !user.getUsername().equals(""); //Because username will always be set.
	}
	
	private boolean validateItem(Item item) {
		return item.getAddedByID() > 0; //Because addedByID will always be set for a new item.
	}
	
	private boolean validateBid(Bid bid) {
		return bid.getUserId() > 0; //Because userId will always be set for a new bid.
	}
	
	
	
}
