package data.service.subscriptions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import models.PrettyItem;

import data.service.ServiceProvider;

public class ItemsSubscription {
	private ItemsSubscriptionListener listener;
	private final ExecutorService executor;
	private ServiceProvider provider;
	
	public ItemsSubscription(ServiceProvider provider) {
		executor = Executors.newSingleThreadExecutor();
		this.provider = provider;
	}	
	
	public synchronized void prepareSnapShot() {
		
		final ItemsSubscriptionListener localListener = listener;
		
		final ArrayList<PrettyItem> items = provider.getAllItems();
		
		Runnable task = new Runnable() {
			public void run() {
				localListener.onSnapShotNeeded(items);
			}
		};
		
		executor.execute(task);
	}
	
	public synchronized void setListener(ItemsSubscriptionListener listener) {
		this.listener = listener;
	}
	
}
