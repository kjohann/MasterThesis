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
		
		bidsUser.setUserID(2);
		json = jsonHandler.userToJSON(bidsUser);
		viewBids = provider.getUsersBids(json);
		
		assertEquals(2, viewBids.size());
		
		bidsUser.setUserID(3);
		json = jsonHandler.userToJSON(bidsUser);
		viewBids = provider.getUsersBids(json);
		
		assertNull(viewBids);
	}
}
