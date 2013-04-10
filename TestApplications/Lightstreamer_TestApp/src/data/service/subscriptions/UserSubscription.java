package data.service.subscriptions;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import models.User;

import data.service.JSONHandler;
import data.service.ServiceProvider;

public class UserSubscription {
	private UserSubscriptionListener listener;
	private final ExecutorService executor;
	private ServiceProvider provider;
	
	public UserSubscription(ServiceProvider provider) {
		executor = Executors.newSingleThreadExecutor();
		this.provider = provider;
	}
	
	public synchronized void login(String json) {
		final UserSubscriptionListener localListener = listener;
		
		User user = provider.verifyLogIn(json);
		if(user.getUserID() == 0) {
			System.err.println("Error logging in with data " + json); 
			//No return since the username has to be removed from hashmap in dataadapter
		}
		
		final User finalUser = user;
		Runnable task = new Runnable() {			
			public void run() {
				localListener.onLogin(finalUser);
			}
		};
		
		executor.execute(task);
	}
	
	public synchronized void register(String json) {		
		boolean result = provider.registerUser(json);
		if(!result) {
			System.err.println("Error registering user with data " + json);
			return;
		}
		
		System.out.println("Registered new user!");
	}
	
	
	public synchronized void setListener(UserSubscriptionListener listener) {
		this.listener = listener;
	}
	
	public boolean hasListener() {
		return this.listener != null;
	}
}
