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
	public void placeBid_should_return_the_bid_back_with_id_set_from_database() {
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
	
	@SuppressWarnings("deprecation")
	@Test
	public void registerItem_should_return_the_item_back_with_id_set_from_database() {
		Item item = new Item(0, 1337, 1, "InsertItem", "Test insert", new java.sql.Date(2013-1900, 7, 23), "");
		String json = jsonHandler.itemToJSON(item);
		dbHandler.setRegisterItemID(1);
		initProvider();
		
		Item result = provider.registerItem(json);
		
		assertNotNull(result);
		assertEquals(1, result.getItemno());
	}
	
	@Test
	public void registerItem_should_return_null_if_unsuccessful() {
		@SuppressWarnings("deprecation")
		Item item = new Item(0, 1337, 1, "InsertItem", "Test insert", new java.sql.Date(2013-1900, 7, 23), "");
		String json = jsonHandler.itemToJSON(item);
		dbHandler.setRegisterItemID(-1);
		initProvider();
		
		Item result = provider.registerItem(json);
		
		assertNull(result);
	}
	
	@Test
	public void deleteItem_should_return_the_id_if_successful() {
		Item item = new Item(1);
		String json = jsonHandler.itemToJSON(item);
		dbHandler.setDeleteResult(true);
		initProvider();
		int result = provider.deleteItem(json);
		
		assertEquals(item.getItemno(), result);				
	}
	
	@Test
	public void deleteItem_should_return_minus_one_if_unsuccessful() {
		Item item = new Item(1);
		String json = jsonHandler.itemToJSON(item);
		dbHandler.setDeleteResult(false);
		initProvider();
		int result = provider.deleteItem(json);
		
		assertEquals(-1, result);	
	}
	
	@Test
	public void getAllItems_should_return_all_items_as_prettyItems() {
		ArrayList<PrettyItem> items = new ArrayList<PrettyItem>();
		items.add(new PrettyItem(1, "Item1", "desc", "SomeUser", 1337, 1337, 1, new java.sql.Date(123)));	
		items.add(new PrettyItem(2, "Item2", "desc", "SomeUser2", 42, 42, 2, new java.sql.Date(123)));
		dbHandler.populateGetAllItemsResult(items);
		initProvider();
		
		ArrayList<PrettyItem> result = provider.getAllItems();
		
		assertEquals(items.get(0).getName(), result.get(0).getName());
		assertEquals(items.get(1).getName(), result.get(1).getName());		
	} 
	
	@Test
	public void getAllItems_should_return_null_if_there_are_no_items() {
		dbHandler.populateGetAllItemsResult(new ArrayList<PrettyItem>());
		initProvider();
		
		assertNull(provider.getAllItems());
	}
	
	private void initProvider() {
		provider = ServiceProvider.getInstance(dbHandler);
	}
}
