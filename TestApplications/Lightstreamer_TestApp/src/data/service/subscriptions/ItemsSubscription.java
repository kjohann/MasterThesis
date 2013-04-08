package data.service.subscriptions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import models.Bid;
import models.Item;
import models.PrettyItem;

import data.service.JSONHandler;
import data.service.ServiceProvider;

public class ItemsSubscription {
	private ItemsSubscriptionListener listener;
	private final ExecutorService executor;
	private ServiceProvider provider;
	private JSONHandler handler;
	
	public ItemsSubscription(ServiceProvider provider) {
		executor = Executors.newSingleThreadExecutor();
		this.provider = provider;
		this.handler = JSONHandler.getInstance();
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
	
	public synchronized void addItem(String json) {
		final ItemsSubscriptionListener localListener = listener;
		
		Item item = provider.registerItem(json);
		if(item == null) {
			System.err.println("Error registering item with data " + json);
			return;
		}
		
		/*Need to register the item in the bid table*/
		Bid bid = new Bid(0, item.getItemno(), item.getAddedByID(), 0, item.getUsername());
		String bidjson = handler.bidToJSON(bid);
		bid = provider.placeBid(bidjson);
		if(bid == null) {
			System.err.println("Error registering item in bid table");
			return;
		}
		
		final Item finalitem = item;
		
		Runnable task = new Runnable() {
			public void run() {
				localListener.onAdd(finalitem);
			}
		};
		
		executor.execute(task);
	}
	
	public synchronized void deleteItem(String json) {
		final ItemsSubscriptionListener localListener = listener;
		int result = provider.deleteItem(json);
		
		if(result < 0){
			System.err.println("Error deleting item with data " + json);
			return;
		}
		
		final int itemno = result;
		
		Runnable task = new Runnable() {
			public void run() {
				localListener.onDelete(itemno);
			}
		};
		
		executor.execute(task);
	}
	
	public synchronized void placeBid(String json) {
		final ItemsSubscriptionListener localListener = listener;
		Bid result = provider.placeBid(json);
		
		if(result == null) {
			System.err.println("Error placing bid with data " + json);
			return;
		}
		
		final Bid bid = result;
		
		Runnable task = new Runnable() {		
			public void run() {
				localListener.onBid(bid);
			}
		};
		
		executor.execute(task);
	}
	
	public synchronized void setListener(ItemsSubscriptionListener listener) {
		this.listener = listener;
	}
	
}
