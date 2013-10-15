package test;

import static org.junit.Assert.*;

import java.util.ArrayList;

import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import data.database.DatabaseHandler;
import data.database.MySQLDatabaseHandler;
import database.connector.Row;

@RunWith(JUnit4.class)
public class IntegrationTest {
	private static DatabaseHandler handler;	
	
	@BeforeClass
	public static void setUpCase() {
		handler = MySQLDatabaseHandler.getInstance("test", "n5user", "n5pass");			
	}	
	
	@Before
	public void setUp() {
		handler.executeScript("./src/test/files/dbRefresh.sql");
	}
	
	@Test
	public void user_should_be_able_to_log_in_if_credentials_are_correct() {
		ArrayList<Row> result = handler.verifyLogIn("Chrome", "123");
		
		assertEquals(1, result.size());
		assertEquals("Chrome", result.get(0).getField("Username").getFieldAsString());
	}
	
	/*
	 * it("should be able to log in if credentials are correct"
	 * it("should get error message if credentials are wrong"
	 * it("should be able to register a new user and log in with it"
	 *  it("should be able to register a new item and retrieve it from the database"
	 *  it("should be able to delete an existing item"
	 *  it("should be able to get all items"
	 */
	
	
	@AfterClass
	public static void tearDown() {
		handler.executeScript("./src/test/files/dbRefresh.sql");
	}
	
}
