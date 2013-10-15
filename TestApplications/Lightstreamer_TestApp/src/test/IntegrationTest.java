package test;

import static org.junit.Assert.*;

import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import data.database.DatabaseHandler;
import data.database.MySQLDatabaseHandler;

@RunWith(JUnit4.class)
public class IntegrationTest {
	private static DatabaseHandler handler;
	
	@BeforeClass
	public static void setUp() {
		handler = MySQLDatabaseHandler.getInstance("test", "n5user", "n5pass");
		handler.executeScript("./src/test/files/dbRefresh.sql");	
	}	
	
	@Test
	public void test() {
		assertEquals(1,1);
	}
	
	
	@AfterClass
	public static void tearDown() {
		handler.executeScript("./src/test/files/dbRefresh.sql");
	}
	
}
