package data.database;

import java.util.ArrayList;

import data.database.resultGenerators.ResultGeneratorFactory;
import database.connector.*;

public class MySQLDatabaseHandler implements DatabaseHandler {
	private static MySQLDatabaseHandler instance;
	private Connector mysqlConnector; //See Utils folder
	private ResultGeneratorFactory generatorFactory;
	
	private MySQLDatabaseHandler(String dbName, String user, String password) {
		mysqlConnector = MySQLConnector.getInstance(dbName);
		mysqlConnector.init(user, password);
		generatorFactory = ResultGeneratorFactory.getInstance();
	}
	
	public static MySQLDatabaseHandler getInstance(String dbName, String user, String password) {
		return instance == null ? new MySQLDatabaseHandler(dbName, user, password) : instance;
	}

	@Override
	public ArrayList<Row> verifyLogIn(String username, String password) {
		String query = QueryStore.getVerifyLogInQuery(username, password);
		return mysqlConnector.select(query, generatorFactory.getVerifyLogInGenerator());		
	}

	@Override
	public ArrayList<Row> getBidsByUser(String userId) {
		String query = QueryStore.getBidsByUserQuery(userId);
		return mysqlConnector.select(query, generatorFactory.getBidsByUserGenerator());
	}

	@Override
	public long placeBid(String itemno, String userId, String value, String username) {
		String query = QueryStore.getPlaceBidQuery(itemno, userId, value, username);
		return mysqlConnector.insert(query);
	}

	@Override
	public long registerUser(String username, String firstname, String lastname, String adress, String password) {
		String query = QueryStore.getRegisterUserQuery(username, firstname, lastname, adress, password);
		return mysqlConnector.insert(query);
	}

	@Override
	public long registerItem(String name, String price, String expires, String description, String addedByID) {
		String query = QueryStore.getRegisterItemQuery(name, price, expires, description, addedByID);
		return mysqlConnector.insert(query);
	}

	@Override
	public boolean deleteItem(String itemno) {
		String query = QueryStore.getDeleteItemQuery(itemno);
		return mysqlConnector.delete(query);
	}

	@Override
	public ArrayList<Row> getAllItems() {
		String query = QueryStore.getAllItemsQuery();
		return mysqlConnector.select(query, generatorFactory.getAllItemsGenerator());
	}	
}
