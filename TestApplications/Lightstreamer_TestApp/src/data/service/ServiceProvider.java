package data.service;

import data.database.DatabaseHandler;

public class ServiceProvider {
	private DatabaseHandler dbHandler;
	
	public ServiceProvider(DatabaseHandler dbHandler){
		this.dbHandler = dbHandler;
	}
}
