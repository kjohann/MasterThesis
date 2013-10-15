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
	}
	
	@Test
	public void verifyLogIn_should_return_a_user_with_matching_password_and_username_but_password_should_be_null() {
		User loginUser = new User(42, "User1", null, null, null, "123");
		ArrayList<User> expected = new ArrayList<User>(); expected.add(loginUser);
		dbHandler.populateUserResult(expected);
		initProvider();
		String json = jsonHandler.userToJSON(loginUser);
		User user = provider.verifyLogIn(json);
		
		assertEquals("User1", user.getUsername());
		assertNull(user.getPassword());
	}
	
	@Test
	public void verifyLogIn_should_return_a_user_with_id_0_if_login_failed() {
		dbHandler.populateUserResult(null);
		initProvider();
		User loginUser = new User(123, "Derp", null, null, null, "123");
		String json = jsonHandler.userToJSON(loginUser);
		User user = provider.verifyLogIn(json);
		
		assertEquals(0,user.getUserID());
	}
		
	@Test
	public void getUsersBids_should_return_a_list_of_bids_corresponding_to_that_users_bids() {
		User bidsUser = new User(1, "Irrelevant", null, null, null, null); //only ID relevant and username has to be set due to JSONHandler.
		String json = jsonHandler.userToJSON(bidsUser);
		ArrayList<Bid> expectedBids = new ArrayList<Bid>();
		expectedBids.add(new Bid(1, 1, 1, 1337, bidsUser.getUsername()));
		expectedBids.add(new Bid(2, 2, 1, 42, bidsUser.getUsername())); 
		dbHandler.populateUsersBidsResult(expectedBids);
		initProvider();
		
		ArrayList<ViewBid> viewBids = provider.getUsersBids(json);
		
		assertEquals(2, viewBids.size());
		assertEquals(2, viewBids.get(1).getItemno());		
	}
	
	@Test
	public void placeBid_should_set_id_of_a_bid_and_return_it_if_successful() {
		Bid incoming = new Bid(0, 1, 3, 15000, "User3");
		dbHandler.setReturnBid(1);
		initProvider();
		String json = jsonHandler.bidToJSON(incoming);
		Bid result = provider.placeBid(json);
		
		
		assertNotNull(result);
		
		assertEquals(1, result.getBidID());		
	}
	
	@Test
	public void placeBid_should_return_null_if_not_successful() {
		dbHandler.setReturnBid(-1);
		initProvider();
		Bid incoming = new Bid(0, 1, 3, 15000, "User3");
		String json = jsonHandler.bidToJSON(incoming);
		Bid result = provider.placeBid(json);
		
		assertNull(result);	
	}
	
	@Test
	public void registerUser_should_return_true_if_registration_was_successful() {
		User user = new User(0, "User4", "Insert", "Insertson", "InjectStreet", "Ins");
		String json = jsonHandler.userToJSON(user);
		dbHandler.setRegisterUserID(1);
		initProvider();
		
		boolean result = provider.registerUser(json);		
		
		assertTrue(result);
	}
	
	@Test
	public void registerUser_should_return_false_if_registration_was_unsuccessfull() {
		User user = new User(0, "User4", "Insert", "Insertson", "InjectStreet", "Ins");
		String json = jsonHandler.userToJSON(user);
		dbHandler.setRegisterUserID(-1);
		initProvider();
		
		boolean result = provider.registerUser(json);		
		
		assertFalse(result);
	}
	
	/*@SuppressWarnings("deprecation")
	@Test
	public void registerItem() {
		Item item = new Item(0, 1337, 1, "InsertItem", "Test insert", new java.sql.Date(2013-1900, 7, 23), "");
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
		
	} */
	
	private void initProvider() {
		provider = ServiceProvider.getInstance(dbHandler);
	}
}
