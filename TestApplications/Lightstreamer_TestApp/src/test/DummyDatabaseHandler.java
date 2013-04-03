package test;

import java.util.ArrayList;

import models.User;

import data.database.DatabaseHandler;
import database.connector.Field;
import database.connector.Row;

public class DummyDatabaseHandler implements DatabaseHandler {
	private static DummyDatabaseHandler instance;
	private ArrayList<User> users;
	
	private DummyDatabaseHandler() {
		populateUsers();
	}
	
	private void populateUsers() {
		users = new ArrayList<>();
		
		User u1 = new User(1, "User1", "Test", "Testson", "123 Fakestreet", "123");
		User u2 = new User(2, "User2", "Funny", "Nameson", "YoloStreet", "Swag");
		User u3 = new User(3, "User3", "Java", "Cshaprson", "JavaScript street", "C++");
		
		users.add(u1); users.add(u2); users.add(u3);
	}
	
	public static DummyDatabaseHandler getInstance() {
		return instance == null ? new DummyDatabaseHandler() : instance;
	}
	
	@Override
	public ArrayList<Row> verifyLogIn(String username, String password) {
		ArrayList<Row> rows = new ArrayList<>();
		Row row = null;
		Field id = null, userN = null, firstN = null, lastN = null, adr = null;
		for(User user : users) {
			if(user.getUsername().equals(username) && user.getPassword().equals(password)) {
				row = new Row();
				id = new Field("UserID", user.getUserID());
				userN = new Field("Username", user.getUsername());
				firstN = new Field("Firstname", user.getFirstname());
				lastN = new Field("Lastname", user.getLastname());
				adr = new Field("Adress", user.getAdress());
				row.addField(id); row.addField(userN); row.addField(firstN); row.addField(lastN); row.addField(adr);
				rows.add(row);
			}
		}
		
		return rows.size() > 0 ? rows : null;
	}

	@Override
	public ArrayList<Row> getBidsByUser(String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long placeBid(String itemno, String userId, String value,
			String username) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long registerUser(String username, String firstname,
			String lastname, String adress, String password) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long registerItem(String name, String price, String expires,
			String description, String addedByID) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean deleteItem(String itemno) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public ArrayList<Row> getAllItems() {
		// TODO Auto-generated method stub
		return null;
	}

}
