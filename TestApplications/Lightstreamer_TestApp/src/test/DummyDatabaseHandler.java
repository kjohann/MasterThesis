package test;

import java.sql.Date;
import java.util.ArrayList;

import models.*;

import data.database.DatabaseHandler;
import database.connector.Field;
import database.connector.Row;

@SuppressWarnings("deprecation") //Doesn't really matter for my little testapp...
public class DummyDatabaseHandler implements DatabaseHandler {
	private static DummyDatabaseHandler instance;
	
	//Refactoring...
	private ArrayList<Row> userResult, usersBidsResult, getAllItemsResult;
	private int placeBidID, registerUserID, registerItemID;
	private boolean deleteResult;
	
	private DummyDatabaseHandler() {
		
	}
	
	public void populateUserResult(ArrayList<User> users) {
		userResult = users != null ? new ArrayList<Row>() : null;
		if(userResult == null) return;
		
		for(User user : users) {
			Row row = new Row();
			Field id = new Field("UserID", user.getUserID());
			Field userN = new Field("Username", user.getUsername());
			Field firstN = new Field("Firstname", user.getFirstname());
			Field lastN = new Field("Lastname", user.getLastname());
			Field adr = new Field("Adress", user.getAdress());
			row.addField(id); row.addField(userN); row.addField(firstN); row.addField(lastN); row.addField(adr);
			userResult.add(row);
		}
	}
	
	public void populateUsersBidsResult(ArrayList<Bid> bids) {
		usersBidsResult =  bids != null ? new ArrayList<Row>() : null;
		if(usersBidsResult == null) return;
		
		for(Bid bid : bids) {
			Row row = new Row();
			Field itemno = new Field("itemno", bid.getItemno());
			Field value = new Field("value", bid.getValue());
			Field name = new Field("name", "reallyDoesNotMatter");
			row.addField(itemno); row.addField(value); row.addField(name);
			usersBidsResult.add(row);
		}
	}
	
	public void populateGetAllItemsResult(ArrayList<PrettyItem> prettyItems) {
		getAllItemsResult = prettyItems != null ? new ArrayList<Row>() : null;
		if(getAllItemsResult == null) return;
		
		for(PrettyItem item : prettyItems) {
			Row row = new Row();
			Field highestbidder = new Field("highestbidder", item.getHighestBidder());
			Field itemno = new Field("itemno", item.getItemno());
			Field name = new Field("name", item.getName());
			Field price = new Field("price", item.getPrice());
			Field expiredate = new Field("expiredate", item.getExpires());
			Field description = new Field("description", item.getDescription());
			Field bid = new Field("bid", item.getBid());
			Field addedByID = new Field("addedByID", item.getAddedByID());
			row.addField(highestbidder); row.addField(itemno); row.addField(name); row.addField(price);
			row.addField(expiredate); row.addField(description); row.addField(bid); row.addField(addedByID);
			getAllItemsResult.add(row);
		}
	}
	
	public void setReturnBid(int id) {
		placeBidID = id;	
	}
	
	public void setRegisterUserID(int id) {
		registerUserID = id;
	}
	
	public void setRegisterItemID(int id) {
		registerItemID = id;
	}
	
	public void setDeleteResult(boolean expected) {
		deleteResult = expected;
	}	
	
	public static DummyDatabaseHandler getInstance() {
		return instance == null ? new DummyDatabaseHandler() : instance;
	}
	
	@Override
	public ArrayList<Row> verifyLogIn(String username, String password) {
		return userResult;
	}

	@Override
	public ArrayList<Row> getBidsByUser(int userId) {
		return usersBidsResult;
	}

	@Override
	public long placeBid(int itemno, int userId, int value, String username) {
		return placeBidID;
	}

	@Override
	public long registerUser(String username, String firstname, String lastname, String adress, String password) {
		return registerUserID;
	}

	@Override
	public long registerItem(String name, int price, String expires, String description, int addedByID) {
		return registerItemID;
	}

	@Override
	public boolean deleteItem(int itemno) {
		return deleteResult;
	}

	@Override
	public ArrayList<Row> getAllItems() {
		return getAllItemsResult;		
	}

	@Override
	public boolean executeScript(String path) {
		// TODO Auto-generated method stub
		return false;
	}
}
