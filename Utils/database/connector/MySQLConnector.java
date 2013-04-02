package database.connector;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 * @author Kristian
 * A class used for handling connections to a database. 
 * Also has methods for executing insert, delete and select
 */
public class MySQLConnector implements Connector {
	private static Connector theInstance;
	private Connection conn;
    private String dbName;
    private final String connectionStringPrefix = "jdbc:mysql://localhost:3306/";
    private final String insertPrefix = "INSERT INTO ";
    private final String deletePrefix = "DELETE FROM ";


    private MySQLConnector(String dbName) {
    	this.dbName = dbName;
    }
    
    /**
     * @param dbName Name of the database to connect to.
     */
    public static Connector getInstance(String dbName) {
    	if(theInstance == null) {
    		theInstance = new MySQLConnector(dbName);
    	} 
		
    	return theInstance;
    }

  	@Override
	public boolean init(String user, String password) {
  		try {
  			Class.forName("com.mysql.jdbc.Driver").newInstance();
  			conn = DriverManager.getConnection(connectionStringPrefix + this.dbName, user, password);
  		} catch (InstantiationException|IllegalAccessException|ClassNotFoundException|SQLException e) {
  			e.printStackTrace();
  			tearDown();
  			return false;
  		}
  		return true;
  	}

  	@Override
	public boolean tearDown() {
  		if (this.conn != null) {
  			try {
  				this.conn.close();
  			} catch (SQLException e) {
  				e.printStackTrace();
  				return false;
  			}
  		}

  		return true;
  	}

  	@Override
	public long insert(String table, String[] valuenames, String[] values) {
  		long insertId = 0;
  		if (valuenames.length != values.length)
  			throw new IllegalArgumentException("Valuenames length != values length. These must match!");
  		try {
  			Statement statement = this.conn.createStatement();
  			String insertquery = insertPrefix + table + " " + createInsertStringSuffix(valuenames, values);
  			statement.executeUpdate(insertquery, Statement.RETURN_GENERATED_KEYS);
  			ResultSet keys = statement.getGeneratedKeys();  		
  			if(keys.next()) {
  				insertId = keys.getLong(1);
  			}
  			keys.close();
  			statement.close();
  		} catch (SQLException e) {
  			e.printStackTrace();
  			return -1;
  		}
  		return insertId;
  	}

  	@Override
	public boolean delete(String table, String valuename, String value) {
  		try {
  			Statement statement = this.conn.createStatement();
  			String querystring = deletePrefix + table + " WHERE " + valuename + "='" + value + "'";
  			statement.executeUpdate(querystring);
  			statement.close();
  		} catch (SQLException e) {
  			e.printStackTrace();
  			return false;
  		}

  		return true;
  	}

  	/* (non-Javadoc)
	 * @see database.connector.Connector#select(java.lang.String, database.connector.ResultGenerator)
	 */
  	@Override
	public ArrayList<Row> select(String queryString, ResultGenerator generator) {
  		ArrayList<Row> rows = new ArrayList<>();
  		try {
  			Statement statement = this.conn.createStatement();
  			ResultSet res = statement.executeQuery(queryString);
  			rows = generator.getResultRows(res);
  			res.close();
  			statement.close();
  		}
  		catch (SQLException e) {
  			e.printStackTrace();
  			return null;
  		}

  		return rows.size() > 0 ? rows : null;
  	}

  	private String createInsertStringSuffix(String[] valuenames, String[] values) {
  		String suffix = ""; String part1 = "("; String part2 = "VALUES (";

  		for (int i = 0; i < values.length; i++) {
  			part1 = part1 + (i == values.length - 1 ? valuenames[i] + ") " : new StringBuilder(String.valueOf(valuenames[i])).append(", ").toString());
  			part2 = part2 + (i == values.length - 1 ? "'" + values[i] + "')" : new StringBuilder("'").append(values[i]).append("', ").toString());
  		}

  		suffix = part1 + part2;

  		return suffix;
  	}
}