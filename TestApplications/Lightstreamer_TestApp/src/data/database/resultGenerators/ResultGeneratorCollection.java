package data.database.resultGenerators;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import database.connector.Field;
import database.connector.ResultGenerator;
import database.connector.Row;

public class ResultGeneratorCollection {
	public VerifyLogInResultGenerator getVerifyLogInGenerator(){
		return new VerifyLogInResultGenerator();
	}
	
	private class VerifyLogInResultGenerator implements ResultGenerator {

		@Override
		public ArrayList<Row> getResultRows(ResultSet res) {
			ArrayList<Row> rows = new ArrayList<>();
			Row row = null;
			Field userID = null, username = null, firstname = null, lastname = null, adress = null;
			
			try {
				while(res.next()){
					row = new Row();
					userID = new Field("UserID", res.getObject("UserID"));
					username = new Field("Username", res.getObject("Username"));
					firstname = new Field("Firstname", res.getObject("Firstname"));
					lastname = new Field("Lastname", res.getObject("Lastname"));
					adress = new Field("Adress", res.getObject("Adress"));
					row.addField(userID); row.addField(username); row.addField(firstname); row.addField(lastname); row.addField(adress);
					rows.add(row);
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return null;
			}
			
			return rows;
		}
	}	
}
