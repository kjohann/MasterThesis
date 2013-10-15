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
	public ArrayList<User> users;
	public ArrayList<Bid> bids;
	public ArrayList<Item> items;
	private ArrayList<PrettyItem> prettyItems;
	private int nextUser, nextItem, nextBid;
	
	//Refactoring...
	private ArrayList<Row> userResult, usersBidsResult;
	private int placeBidID, registerUserID;
	
	private DummyDatabaseHandler() {
		populateUsers();
		populateBids();
		populateItems();
		populatePrettyItems();
		nextUser = users.size() + 1;
		nextItem = items.size() + 1;
		nextBid = bids.size() + 1;
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
	
	public void setReturnBid(int id) {
		placeBidID = id;	
	}
	
	public void setRegisterUserID(int id) {
		registerUserID = id;
	}
	
	public void populateUsersBidsResult(ArrayList<Bid> bids) {
		usersBidsResult =  bids != null ? new ArrayList<Row>() : null;
		if(usersBidsResult == null) return;
		
		for(Bid bid : bids) {
			Row row = new Row();
			Field itemno = new Field("itemno", bid.getItemno());
			Field value = new Field("value", bid.getValue());
			Field name = new Field("name", getItemName(bid.getItemno()));
			row.addField(itemno); row.addField(value); row.addField(name);
			usersBidsResult.add(row);
		}
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
		if(!expires.matches("\\d{4}-\\d{1,2}-\\d{1,2}") || getUserName(addedByID) == null)
			return -1; //Will cast SQLException if wrong dateformat is allowed through or addedByID is of non-existing User.
		String [] exp = expires.split("-");
		int year = Integer.parseInt(exp[0]), month = Integer.parseInt(exp[1]) - 1, day = Integer.parseInt(exp[2]);
		Item item = new Item(nextItem++, price, addedByID, name, description, new Date(year - 1900, month, day), "");
		items.add(item);
		return item.getItemno();
	}

	@Override
	public boolean deleteItem(int itemno) {
		Item item = null;
		Bid bid = null;
		for(int i = 0; i < items.size(); i++) {
			item = items.get(i);
			if(item.getItemno() == itemno) {
				items.remove(i);
				for(int j = 0; j < bids.size(); j++) {
					bid = bids.get(j);
					if(bid.getItemno() == itemno) {
						bids.remove(j--);
					}
				}
				populatePrettyItems(); //Update 
				return true;
			}
		}
		
		return false;
	}

	@Override
	public ArrayList<Row> getAllItems() {
		ArrayList<Row> rows = new ArrayList<>();
		Row row = null;
		Field highestbidder = null, itemno = null, name = null, price = null,
				  expiredate = null, description = null, bid = null, addedByID = null;
		
		for(PrettyItem item : prettyItems) {
			row = new Row();
			highestbidder = new Field("highestbidder", item.getHighestBidder());
			itemno = new Field("itemno", item.getItemno());
			name = new Field("name", item.getName());
			price = new Field("price", item.getPrice());
			expiredate = new Field("expiredate", item.getExpires());
			description = new Field("description", item.getDescription());
			bid = new Field("bid", item.getBid());
			addedByID = new Field("addedByID", item.getAddedByID());
			row.addField(highestbidder); row.addField(itemno); row.addField(name); row.addField(price);
			row.addField(expiredate); row.addField(description); row.addField(bid); row.addField(addedByID);
			rows.add(row);
		}
		
		return rows.size() > 0 ? rows : null;
		
	}

	@Override
	public boolean executeScript(String path) {
		// TODO Auto-generated method stub
		return false;
	}

	private void populateUsers() {
		users = new ArrayList<>();
		
		User u1 = new User(1, "User1", "Test", "Testson", "123 Fakestreet", "123");
		User u2 = new User(2, "User2", "Funny", "Nameson", "YoloStreet", "Swag");
		User u3 = new User(3, "User3", "Java", "Cshaprson", "JavaScript street", "C++");
		
		users.add(u1); users.add(u2); users.add(u3);
	}
	private void populateBids() {
		bids = new ArrayList<>();
		
		Bid b1 = new Bid(1, 1, 1, 5000, "User1"); //Bid constructor: (int bidID, int itemno, int userId, int value, String username)
		Bid b2 = new Bid(2, 1, 2, 10000, "User2");
		Bid b3 = new Bid(3, 2, 3, 5000, "User3");
		Bid b4 = new Bid(4, 3, 2, 5000, "User2");
		Bid b5 = new Bid(5, 2, 1, 10000, "User1");
		
		bids.add(b1); bids.add(b2); bids.add(b3); bids.add(b4); bids.add(b5);
	}
		
	private void populateItems() {
		items = new ArrayList<>();
		
		Item i1 = new Item(1, 2000, 3, "Item1", "Test item", new Date(2015-1900, 2, 27), "User3");
		Item i2 = new Item(2, 4000, 2, "Item2", "Test item", new Date(2014-1900, 4, 14), "User2");
		Item i3 = new Item(3, 300, 1, "Item3", "Test item", new Date(2016-1900, 12, 2), "User1");
		
		items.add(i1); items.add(i2); items.add(i3);		
	}
	
	private void populatePrettyItems() {
		prettyItems = new ArrayList<>();
		PrettyItem p = null;
		for(Item item : items) {
			p = new PrettyItem(item.getItemno(), item.getName(), item.getDescription(), null, item.getPrice(), 0, item.getAddedByID(), item.getExpires());
			for(Bid bid : bids) {
				if(bid.getItemno() == p.getItemno() && bid.getValue() > p.getBid()) {
					p.setHighestBidder(bid.getUsername());
					p.setBid(bid.getValue());
				}
			}
			prettyItems.add(p);
		}			
	}
	
	private String getItemName(int itemno) {
		for(Item item : items) {
			if(item.getItemno() == itemno)
				return item.getName();
		}
		
		return null;
	}
	
	private String getUserName(int userID) {
		for(User user : users) {
			if(user.getUserID() == userID) 
				return user.getUsername();
		}
		
		return null;
	}
	
	private boolean isHighestBid(Bid bid) {
		for(Bid b : bids) {
			if(b.getItemno() == bid.getItemno() && b.getValue() > bid.getValue()) {
				return false;
			}
		}
		
		return true;
	}
	
}
