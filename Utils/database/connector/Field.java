package database.connector;

import java.sql.Date;

/**
 * @author Kristian
 * A class used to represent induvidual Fields in a Row of a resultset
 * from a sql SELECT query.
 */
public class Field {
	public String name;
	private Object data;

	/**
	 * @param name: Name of the Field (corresponding to the name in a database).
	 * @param data: The data stored in that field.
	 * Example: A field ID, has the value 1. ID is the name and 1 is the data.
	 */
	public Field(String name, Object data)
	{
		this.name = name;
		this.data = data;
	}

	/**
	 * @return Data as a String if the stored data is of that type.
	 */
	public String getFieldAsString() {
		return this.data instanceof String ? (String)this.data : null;		
	}

	/**
	 * @return Data as an Integer if the stored data is of that type.
	 */
	public Integer getFieldAsInt() {
		return this.data instanceof Integer ? (Integer)this.data : null;
	}

	/**
	 * @return Data as a java.sql.Date if the stored data is of that type.
	 */
	public Date getFieldAsDate() {
		return this.data instanceof Date ? (Date)this.data : null;
	}
}