package data.service;

import java.util.ArrayList;

import models.*;
import data.database.DatabaseHandler;
import database.connector.Field;
import database.connector.Row;

/*TODO: Find out if I need synchronized*/

public class ServiceProvider {
	private static ServiceProvider instance;
	private DatabaseHandler dbHandler;
	private JSONHandler jsonHandler;
	
	private ServiceProvider(DatabaseHandler dbHandler){
		this.dbHandler = dbHandler;
		this.jsonHandler = JSONHandler.getInstance();
	}
	
	public static ServiceProvider getInstance(DatabaseHandler dbHandler) {
		return instance == null ? new ServiceProvider(dbHandler) : instance;
	}
	
	public User verifyLogIn(String json) {
		User logInUser = jsonHandler.userFromJSON(json);
		if(logInUser == null) {
			System.err.println("Error while verifying log in with data: " + json);
			return null;
		}
		
		ArrayList<Row> result = dbHandler.verifyLogIn(logInUser.getUsername(), logInUser.getPassword());
		
		if(result == null || result.size() > 1) //Should only return one user.
			return null;
		
		Row row = result.get(0);
		Field userN = row.getField("Username"); Field id = row.getField("UserID");
		Field firstN = row.getField("Firstname"); Field lastN = row.getField("Lastname"); 
		Field adr = row.getField("Adress");
		
		String username = userN.getFieldAsString(), firstname = firstN.getFieldAsString(),
			   lastname = lastN.getFieldAsString(), adress = adr.getFieldAsString();
		int userId = id.getFieldAsInt();
		
		return new User(userId, username, firstname, lastname, adress, null); //password is not relevant to client
	}
	
	public ArrayList<ViewBid> getUsersBids(String json) {
		User user = jsonHandler.userFromJSON(json);
		if(user == null) {
			System.err.println("Error while getting usersBids - corrupt data received");
			return null;
		}
		
		ArrayList<Row> result = dbHandler.getBidsByUser(user.getUserID());
		
		if(result == null || result.size() == 0) //User has no leading bids.
			return null;
		
		ArrayList<ViewBid> viewBids = new ArrayList<>();
		String name = null;
		int value = 0, itemno = 0;
		ViewBid viewBid = null;
		for(Row row : result) {			
			name = row.getField("name").getFieldAsString();
			value = row.getField("value").getFieldAsInt();
			itemno = row.getField("itemno").getFieldAsInt();
			viewBid = new ViewBid(name, itemno, value);
			viewBids.add(viewBid);
		}
		
		return viewBids;
	}
}
