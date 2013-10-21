package integration;

import java.sql.Timestamp;
import java.util.List;

import models.Bid;
import models.Item;
import models.PrettyItem;
import models.User;
import models.ViewBid;

import org.junit.*;
import static org.junit.Assert.*;
import play.test.Helpers;
import play.test.WithBrowser;
import static play.test.Helpers.*;

public class Modelstest extends WithBrowser{
	@BeforeClass
	public static void setUp() throws Exception {
		Helpers.start(testServer(9000, fakeApplication(inMemoryDatabase(), fakeGlobal())));
		populateDB();
	}		
	
	@Test
	public void insertUser() {
		new User("Test", "123", "Test", "Testson", "Testroad 1").save();
		User user = User.find.where().eq("Username", "Test").findUnique();
		assertNotNull(user);
		assertEquals(user.getUsername(), "Test");
	}
	
	@Test
	public void loginTest() {
		User login = User.logIn("User1", "123");
		assertNotNull(login);
		assertEquals("User", login.getFirstname());
		assertEquals(1, login.getUserID());
		
		login = User.logIn("User1", "wrong");
		assertNull(login);
		
		login = User.logIn("User1", null);
		assertNull(login);
		
		login = User.logIn("Wrong", "123");
		assertNull(login);
		
		login = User.logIn(null, "123");
		assertNull(login);
	}
	
	@Test
	public void getAllItemsTest() {
		List<PrettyItem> prettyItems = PrettyItem.findAll();
		assertTrue(prettyItems.size() >= 3); //1 item may have been inserted
	}
	
	@Test
	public void newItemTest() {
		boolean insert = new Item("Insert", "Inserted item", new Timestamp(new java.util.Date().getTime()), 1337, 1).add();
		assertTrue(insert);
		insert = new Item("Insert", "Inserted item", new Timestamp(new java.util.Date().getTime()), 1337, Integer.MAX_VALUE).add();
		assertFalse(insert);
		List<PrettyItem> prettyItems = PrettyItem.findAll();
		assertEquals(4, prettyItems.size());
	}
	
	@Test
	public void getUsersBids() {
		List<ViewBid> bids = ViewBid.get(1);
		assertEquals(0, bids.size());
		bids = ViewBid.get(2);
		assertEquals("Asus K55V", bids.get(0).getName());
	}
	
	@Test
	public void placeBid() {
		assertTrue(new Bid(1, 2, 6400, "User2").add());
		List<ViewBid> bids = ViewBid.get(2);
		assertEquals(2, bids.size());
		assertFalse(new Bid(1, Integer.MAX_VALUE, 6400, "Nonexistent").add());
		assertFalse(new Bid(Integer.MAX_VALUE, 2, 6400, "User2").add());	
	}
	
	private static void populateDB() {
		new User("User1", "123", "User", "Userson", "Userstreet").save();
		new User("User2", "123", "Ola", "Nordmann", "Drammensveien 1").save();
		new User("User3", "123", "Last", "Startuser", "Adressstreet").save();
		
		new Item("iPhone", "Expensive product", new Timestamp(new java.util.Date().getTime()), 5500, 1).save();
		new Item("Asus K55V", "Leet laptop for leet users", new Timestamp(new java.util.Date().getTime()), 7000, 2).save();
		new Item("Kia", "Reasonably priced car", new Timestamp(new java.util.Date().getTime()), 300000, 1).save();
		
		new Bid(1, 2, 6000, "User2").save();
		new Bid(1, 3, 6100, "User3").save();
		new Bid(2, 2, 7000, "User2").save();
		new Bid(3, 1, 0, "User1").save();
	}
}
