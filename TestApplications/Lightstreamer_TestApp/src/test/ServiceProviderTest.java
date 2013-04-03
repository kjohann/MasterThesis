package test;

import static org.junit.Assert.*;

import models.User;

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
	
	@Before
	public void prepare() {
		dbHandler = DummyDatabaseHandler.getInstance();
		jsonHandler = JSONHandler.getInstance();
	}
	
	@Test
	public void verifyLogInSuccess() {
		ServiceProvider provider = ServiceProvider.getInstance(dbHandler);
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
		ServiceProvider provider = ServiceProvider.getInstance(dbHandler);
		User loginUser = new User(0, "Derp", null, null, null, "123");
		String json = jsonHandler.userToJSON(loginUser);
		User user = provider.verifyLogIn(json);
		
		assertNull(user);
	}
	
	@Test
	public void verifyLogInFailWrongPassword() {
		ServiceProvider provider = ServiceProvider.getInstance(dbHandler);
		User loginUser = new User(0, "User1", null, null, null, "1337Hax");
		String json = jsonHandler.userToJSON(loginUser);
		User user = provider.verifyLogIn(json);
		
		
		assertNull(user);
	}
}
