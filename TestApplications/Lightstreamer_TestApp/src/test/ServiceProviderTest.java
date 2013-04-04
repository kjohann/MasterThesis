package test;

import static org.junit.Assert.*;

import java.util.ArrayList;

import models.*;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import data.service.JSONHandler;
import data.service.ServiceProvider;

@RunWith(JUnit4.class)
public class ServiceProviderTest {
	private DummyDatabaseHandler dbHandler;
	private JSONHandler jsonHandler;
	private ServiceProvider provider;
	
	@Before
	public void prepare() {
		dbHandler = DummyDatabaseHandler.getInstance();
		jsonHandler = JSONHandler.getInstance();
		provider = ServiceProvider.getInstance(dbHandler);
	}
	
	@Test
	public void verifyLogInSuccess() {
		User loginUser = new User(0, "User1", null, null, null, "123");
		String json = jsonHandler.userToJSON(loginUser);
		User user = provider.verifyLogIn(json);
		
		assertEquals("User1", user.getUsername());
		assertNull(user.getPassword());
		assertNotNull(user.getFirstname());
		assertNotNull(user.getLastname());
		assertNotNull(user.getAdress());
		assertNotEquals(0, user.getUserID());
	}
	
	@Test
	public void verifyLogInFailNonExistingUser() {
		User loginUser = new User(0, "Derp", null, null, null, "123");
		String json = jsonHandler.userToJSON(loginUser);
		User user = provider.verifyLogIn(json);
		
		assertNull(user);
	}
	
	@Test
	public void verifyLogInFailWrongPassword() {
		User loginUser = new User(0, "User1", null, null, null, "1337Hax");
		String json = jsonHandler.userToJSON(loginUser);
		User user = provider.verifyLogIn(json);
		
		
		assertNull(user);
	}
	
	/*Gather all relevant test in one method from here*/
	
	@Test
	public void getUsersBids() {
		User bidsUser = new User(1, "Irrelevant", null, null, null, null); //only ID relevant and username has to be set due to JSONHandler.
		String json = jsonHandler.userToJSON(bidsUser);
		ArrayList<ViewBid> viewBids = provider.getUsersBids(json);
		
		assertEquals(1, viewBids.size());
		assertEquals(2, viewBids.get(0).getItemno());
		
		bidsUser.setUserID(2);
		json = jsonHandler.userToJSON(bidsUser);
		viewBids = provider.getUsersBids(json);
		
		assertEquals(2, viewBids.size());
		assertEquals(1, viewBids.get(0).getItemno());
		assertEquals(3, viewBids.get(1).getItemno());
		
		bidsUser.setUserID(3);
		json = jsonHandler.userToJSON(bidsUser);
		viewBids = provider.getUsersBids(json);
		
		assertNull(viewBids);
	}
	
	@Test
	public void placeBid() {
		Bid incoming = new Bid(0, 1, 3, 15000, "User3");
		int nrBefore = dbHandler.bids.size();				
		String json = jsonHandler.bidToJSON(incoming);
		Bid result = provider.placeBid(json);
		int nrAfter = dbHandler.bids.size();
		
		assertNotNull(result);
		assertEquals(nrBefore, nrAfter - 1);
		assertEquals(nrAfter, result.getBidID());
		assertEquals(result.getItemno(), incoming.getItemno());
		assertEquals(result.getValue(), incoming.getValue());
		assertEquals(result.getUserId(), incoming.getUserId());
		assertEquals(result.getUsername(), incoming.getUsername());
		
		Bid corrupt = new Bid(0, 0, 0, 0, null);
		json = jsonHandler.bidToJSON(corrupt);
		result = provider.placeBid(json);
		
		assertEquals(nrAfter, dbHandler.bids.size());
		assertNull(result);		
	}
	
	@Test
	public void registerUser() {
		User user = new User(0, "User4", "Insert", "Insertson", "InjectStreet", "Ins");
		String json = jsonHandler.userToJSON(user);
		int nrBefore = dbHandler.users.size();
		boolean result = provider.registerUser(json);
		int nrAfter = dbHandler.users.size();
		
		assertTrue(result);
		assertEquals(nrBefore, nrAfter - 1);
		
		user = new User(0, null, null, null, null, null);
		json = jsonHandler.userToJSON(user);
		result = provider.registerUser(json);
		
		assertFalse(result);
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void registerItem() {
		Item item = new Item(0, 1337, 1, "InsertItem", "Test insert", new java.sql.Date(2013-1900, 7, 23));
		String json = jsonHandler.itemToJSON(item);
		int nrBefore = dbHandler.items.size();
		Item result = provider.registerItem(json);
		int nrAfter = dbHandler.items.size();
		
		assertNotNull(result);
		assertEquals(result.getItemno(), nrAfter);
		assertEquals(nrBefore, nrAfter - 1);
		assertEquals(result.getPrice(), item.getPrice());
		assertEquals(result.getAddedByID(), item.getAddedByID());
		assertEquals(result.getName(), item.getName());
		assertEquals(result.getDescription(), item.getDescription());
		assertEquals(result.getExpires(), item.getExpires());
		
		item.setAddedByID(9); //Non existing user - would cast exception.
		json = jsonHandler.itemToJSON(item);
		result = provider.registerItem(json);
		
		assertEquals(nrAfter, dbHandler.items.size());
		assertNull(result);
	}
	
	@Test
	public void deleteItem() {
		Item item = new Item(1);
		String json = jsonHandler.itemToJSON(item);
		int nrBefore = dbHandler.items.size();
		int bidsBefore = dbHandler.bids.size();
		int result = provider.deleteItem(json);
		int nrAfter = dbHandler.items.size();
		int bidsAfter = dbHandler.bids.size();
		
		assertEquals(item.getItemno(), result);
		assertEquals(nrBefore, nrAfter + 1);
		assertEquals(bidsBefore, bidsAfter + 2);		
	}
	
	@Test
	public void getAllItems() {
		ArrayList<PrettyItem> items = provider.getAllItems();
		
		assertEquals(items.size(), dbHandler.items.size());
		assertEquals(items.get(0).getItemno(), dbHandler.items.get(0).getItemno());
		assertEquals(items.get(1).getItemno(), dbHandler.items.get(1).getItemno());
		assertEquals(items.get(2).getItemno(), dbHandler.items.get(2).getItemno());
		
		Item delete = new Item(1);
		String json = jsonHandler.itemToJSON(delete);
		provider.deleteItem(json);
		
		items = provider.getAllItems();
		
		assertEquals(items.size(), dbHandler.items.size());
		assertEquals(items.get(0).getItemno(), dbHandler.items.get(0).getItemno());
		assertEquals(items.get(1).getItemno(), dbHandler.items.get(1).getItemno());
		
	}
}
