package data.database;

import java.util.ArrayList;

import database.connector.Row;

public interface DatabaseHandler {
	public abstract ArrayList<Row> verifyLogIn(String username, String password);
	public abstract ArrayList<Row> getBidsByUser(int userId);
	public abstract long placeBid(int itemno, int userId, int value, String username);
	public abstract long registerUser(String username, String firstname, String lastname, String adress, String password);
	public abstract long registerItem(String name, int price, String expires, String description, int addedByID);
	public abstract boolean deleteItem(int itemno);
	public abstract ArrayList<Row> getAllItems();
}
