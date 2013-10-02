package database.connector;

import java.sql.ResultSet;
import java.util.ArrayList;

/**
 * @author Kristian
 * Implement one ResultGenerator for each expected SELECT query result.
 */
public abstract interface ResultGenerator {
	/**
	 * @param paramResultSet: The resultset to extract Rows from.
	 * @return An ArrayList<Row> containing the results. This method has to be
	 * implemented in such a way that it matches the fields returned by the SELECT query.
	 */
	public abstract ArrayList<Row> getResultRows(ResultSet paramResultSet);
}