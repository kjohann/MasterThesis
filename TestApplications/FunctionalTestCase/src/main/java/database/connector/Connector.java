package database.connector;

import java.util.ArrayList;

public interface Connector {

	/**
	 * @param user The username to be used with the database.
	 * @param password The password to be used with the database
	 * @return True indicates that a connection was established successfully.
	 */
	public abstract boolean init(String user, String password);

	/**
	 * @return True if closing was successful.
	 * 
	 * It is recommended to call this method when the program using the connection is about to finish,
	 * or whenever a connection should be closed.
	 */
	public abstract boolean tearDown();

	/**
	 * @param insertQuery A query string of the form INSERT INTO table...
	 * @return The ID of the inserted object.
	 * 
	 * NB! This method only works with tables that have an autoincrement primarykey!
	 */
	public abstract long insert(String insertQuery);

	/**
	 * @param deleteQuery A query string of the form DELETE FROM table...
	 * @return True if no error occured.
	 */
	public abstract boolean delete(String deleteQuery);

	/**
	 * @param queryString A SQL SELECT query
	 * @param generator An instance of a class that implements the ResultGenerator interface.
	 * @return An ArrayList<Row> containting all the rows of the result or null if the result was no rows.
	 * 
	 * The ResultGenerator instance must be implemented in a fashion that matches the fields that will be
	 * extracted by the SELECT query. Example: the query will get two fields in each row: ID and data. Then
	 * the ResultGenerator must take these into account for correct handling.
	 */
	public abstract ArrayList<Row> select(String queryString,
			ResultGenerator generator);
	
	public abstract boolean executeScript(String pathToScriptFile);

}