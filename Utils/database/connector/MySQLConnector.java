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
	public long insert(String insertQuery) {
  		long insertId = 0;
  		try {
  			Statement statement = this.conn.createStatement();  			
  			statement.executeUpdate(insertQuery, Statement.RETURN_GENERATED_KEYS);
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
	public boolean delete(String deleteQuery) {
  		try {
  			Statement statement = this.conn.createStatement();
  			statement.executeUpdate(deleteQuery);
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
}