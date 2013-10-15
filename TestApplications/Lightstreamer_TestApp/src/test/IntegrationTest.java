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
	private static MySQLDatabaseHandler handler;	
	
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
	
	@Test
	public void verifyLogIn_shoudl_return_null_if_credentials_are_wrong() {
		assertNull(handler.verifyLogIn("Non", "Existent"));		
	}
	
	@Test
	public void user_should_be_able_to_register_new_user() {
		String username = "Testuser";
		handler.registerUser(username, "Firstname", "Lastname", "Adress", "123");
		ArrayList<Row> result = handler.verifyLogIn(username, "123");
		
		assertEquals(1, result.size());
		assertEquals(username, result.get(0).getField("Username").getFieldAsString());
	}
	
	@Test
	public void user_should_be_able_to_register_a_new_item_and_get_back_id() {
		long id = handler.registerItem("Test", 1337, "2013-08-23", "description", 1);
		
		assertEquals(5, id);
	}
	
	@Test
	public void deleteItem_should_return_true_if_deletion_was_successful() {
		assertTrue(handler.deleteItem(1));
	}
	
	/*	
	 *  it("should be able to delete an existing item"
	 *  it("should be able to get all items"
	 */
	
	
	@After
	public void tearDown() {
		handler.executeScript("./src/test/files/dbRefresh.sql");		
	}
	
	@AfterClass
	public static void shutDownDb() {
		assertTrue(handler.tearDown());
	}
	
}
