package adapters;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;

import models.Bid;
import models.Item;
import models.PrettyItem;
import models.User;
import models.ViewBid;

import com.lightstreamer.interfaces.data.DataProviderException;
import com.lightstreamer.interfaces.data.FailureException;
import com.lightstreamer.interfaces.data.ItemEventListener;
import com.lightstreamer.interfaces.data.SmartDataProvider;
import com.lightstreamer.interfaces.data.SubscriptionException;

import data.database.DatabaseHandler;
import data.database.MySQLDatabaseHandler;
import data.service.ServiceProvider;
import data.service.subscriptions.ItemsSubscription;
import data.service.subscriptions.ItemsSubscriptionListener;
import data.service.subscriptions.UserSubscription;
import data.service.subscriptions.UserSubscriptionListener;

public class AuctionDataAdapter implements SmartDataProvider {
	private ItemEventListener listener;
	private final ConcurrentHashMap<String, Object> loggedUsers = new ConcurrentHashMap<String, Object>();
	private final ConcurrentHashMap<String, Integer> itemsAddedById = new ConcurrentHashMap<String, Integer>();
	private Object handleMutex = new Object();
	private static ItemsSubscription itemSubscription;
	private static UserSubscription userSubscription;
	private ServiceProvider provider;
	private DatabaseHandler dbHandler;
	
	 
	@Override
	public void init(Map params, File configDir) throws DataProviderException {
		//TODO: find use?
		dbHandler = MySQLDatabaseHandler.getInstance("auctionhouse", "n5user", "n5pass");
		provider = ServiceProvider.getInstance(dbHandler);
		itemSubscription = new ItemsSubscription(provider);
		userSubscription = new UserSubscription(provider);
	}

	@Override
	public boolean isSnapshotAvailable(String item)
			throws SubscriptionException {
		return item.equals("items");
	}

	@Override
	public void setListener(ItemEventListener listener) {
		this.listener = listener;
	}

	@Override
	public void unsubscribe(String user) throws SubscriptionException, FailureException {
		loggedUsers.remove(user);	
	}

	@Override
	public void subscribe(String arg0, boolean arg1) throws SubscriptionException, FailureException {
		// TODO Auto-generated method stub
	}

	@Override
	public void subscribe(String subscriptionId, Object handle, boolean arg2) throws SubscriptionException, FailureException {		
		if(subscriptionId.equals("items")) {
			AuctionItemsSubscriptionListener listener = new AuctionItemsSubscriptionListener(handle);
			itemSubscription.setListener(listener);
			itemSubscription.prepareSnapShot();
		}else {
			//Add item to map, in logg in message handling, if not approved, remove again, if success, pass username and id to client
			if(!userSubscription.hasListener()) {
				AuctionUserSubscriptionListener listener = new AuctionUserSubscriptionListener();
				userSubscription.setListener(listener);
			}
			synchronized (handleMutex) {
				loggedUsers.put(subscriptionId, handle);
			}
		}
	}
	
	public static ItemsSubscription getItemsSubscripton() {
		return itemSubscription;
	}
	
	public static UserSubscription getUserSubscription() {
		return userSubscription;
	}
	
	private void add(PrettyItem item, Object handle, boolean snapshot) {
		HashMap<String, String> update = new HashMap<String, String>();
		
		update.put("key", String.valueOf(item.getItemno()));
		update.put("command", "ADD");
		update.put("name", item.getName());
		update.put("rmID", "r." + String.valueOf(item.getItemno()));
		update.put("price", String.valueOf(item.getPrice()));
		update.put("bid", String.valueOf(item.getBid()));
		update.put("expires", item.getFormattedExpires());
		update.put("highestbidder", item.getHighestBidder());
		update.put("description", item.getDescription());
		update.put("addedByID", String.valueOf(item.getAddedByID()));
		update.put("bID", "b." + String.valueOf(item.getItemno()));
		
		listener.smartUpdate(handle, update, snapshot);
	}
	
	private void delete(Object handle, String itemno){
		HashMap<String, String> update = new HashMap<String, String>();
		
		update.put("key", itemno);
		update.put("command", "DELETE");
		
		listener.smartUpdate(handle, update, false);
	}
	
	private void placeBid(Object handle, Bid bid) {
		HashMap<String, String> update = new HashMap<String, String>();
		
		update.put("key", String.valueOf(bid.getItemno()));
		update.put("command", "UPDATE");
		update.put("bid", String.valueOf(bid.getValue()));
		update.put("highestbidder", bid.getUsername());
		
		listener.smartUpdate(handle, update, false);
	}
	
	private void login(Object handle, User user, String items) {
		HashMap<String, String> update = new HashMap<String, String>();
		
		update.put("userId", String.valueOf(user.getUserID()));
		update.put("username", user.getUsername());
		
		listener.smartUpdate(handle, update, false);
	}
	
	private class AuctionItemsSubscriptionListener implements ItemsSubscriptionListener {
		private Object handle;
		
		public AuctionItemsSubscriptionListener(Object handle) {
			this.handle = handle;
		}
		
		@Override
		public void onSnapShotNeeded(ArrayList<PrettyItem> items) {
			for(PrettyItem item : items) {
				add(item, handle, true);
			}
			
			listener.smartEndOfSnapshot(handle);
		}

		@Override
		public void onAdd(Item item) {
			PrettyItem prettyItem = new PrettyItem(item.getItemno(), item.getName(), item.getDescription(), item.getUsername(), item.getPrice(), 0, item.getAddedByID(), item.getExpires());
			itemsAddedById.put(String.valueOf(item.getItemno()), item.getAddedByID());
			add(prettyItem, handle, false);
			
		}
		
		@Override
		public void onDelete(int itemno) {
			itemsAddedById.remove(String.valueOf(itemno));
			delete(handle, String.valueOf(itemno));
		}
		
		@Override
		public void onBid(Bid bid) {
			placeBid(handle, bid);
		}
		
	}
	
	private class AuctionUserSubscriptionListener implements UserSubscriptionListener {
		
		@Override
		public void onLogin(User user) {
			if(user.getUserID() == 0){
				synchronized (handleMutex) {
					Object handle = loggedUsers.remove(user.getUsername());	
					login(handle, user, "");
				}
			} else {
				synchronized (handleMutex) {
					Object handle = loggedUsers.get(user.getUsername());
					ArrayList<Item> itemsList = new ArrayList<>();
					for(String key : itemsAddedById.keySet()) {
						
					}
					login(handle, user, "");
				}
			}
			
		}

		@Override
		public void onViewBids(ArrayList<ViewBid> viewBids) {
			// TODO Auto-generated method stub
			
		}
		
	}

}
