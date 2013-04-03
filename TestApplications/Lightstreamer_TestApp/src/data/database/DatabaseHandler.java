package data.database;

import java.util.ArrayList;

import database.connector.Row;

public interface DatabaseHandler {
	public abstract ArrayList<Row> verifyLogIn(String username, String password);
	public abstract ArrayList<Row> getBidsByUser(String userId);
	public abstract long placeBid(String itemno, String userId, String value, String username);
	public abstract long registerUser(String username, String firstname, String lastname, String adress, String password);
	public abstract long registerItem(String name, String price, String expires, String description, String addedByID);
	public abstract boolean deleteItem(String itemno);
	public abstract ArrayList<Row> getAllItems();
}
