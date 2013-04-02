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
	 * @param table Name of the table in which to insert.
	 * @param valuenames An array containing the names of each value.
	 * @param values An array containing the matching values for the names.
	 * @return The insertId if insertion went well. Else -1.
	 * 
	 * NB: This method works only for tables with an int primary key with autoincrement set to true!
	 * The table variable and the valuenames- and values arrays are used to make an insertquery of the form:
	 * INSERT INTO table (valuenames[0], valuenames[1], ... valuenames[n]) VALUES ('values[0]', 'values[1]', ... 'values[n]'
	 * It is therefore crucial that the indexes of the arrays match. The method has no way of knowing wheter this is the case! 
	 */
	public abstract long insert(String table, String[] valuenames,
			String[] values);

	/**
	 * @param table Name of the table to delete from.
	 * @param valuename Name of the value that should be deleted.
	 * @param value The concrete value that should be deleted.
	 * @return True if deletion was successful.
	 * 
	 * The table-, valuename- and value-variables are used to construct a deletequery like this:
	 * DELETE FROM table WHERE valuename='value'
	 */
	public abstract boolean delete(String table, String valuename, String value);

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

}