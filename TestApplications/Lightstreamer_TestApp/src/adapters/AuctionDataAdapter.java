package adapters;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import models.Bid;
import models.Item;
import models.PrettyItem;

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

public class AuctionDataAdapter implements SmartDataProvider {
	private ItemEventListener listener;
	private final ConcurrentHashMap<String, Object> subscriptions = new ConcurrentHashMap<String, Object>(); //need?
	private static ItemsSubscription subscription;
	private ServiceProvider provider;
	private DatabaseHandler dbHandler;
	
	 
	@Override
	public void init(Map params, File configDir) throws DataProviderException {
		//TODO: find use?
		dbHandler = MySQLDatabaseHandler.getInstance("auctionhouse", "n5user", "n5pass");
		provider = ServiceProvider.getInstance(dbHandler);
		subscription = new ItemsSubscription(provider);
	}

	@Override
	public boolean isSnapshotAvailable(String arg0)
			throws SubscriptionException {
		// TODO: relplace with check of available items?
		return true;
	}

	@Override
	public void setListener(ItemEventListener listener) {
		this.listener = listener;
	}

	@Override
	public void unsubscribe(String arg0) throws SubscriptionException, FailureException {
		// TODO Auto-generated method stub
	}

	@Override
	public void subscribe(String arg0, boolean arg1) throws SubscriptionException, FailureException {
		// TODO Auto-generated method stub
	}

	@Override
	public void subscribe(String subscriptionId, Object handle, boolean arg2) throws SubscriptionException, FailureException {
		//TODO: replace with method that does this for each Item in getAllItems from the db.
		AuctionItemsSubscriptionListener listener = new AuctionItemsSubscriptionListener(handle);
		subscription.setListener(listener);
		subscription.prepareSnapShot();
	}
	
	public static ItemsSubscription getItemsSubscripton(){
		return subscription;
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
		update.put("remVisible", "display: none"); //TODO: make method to supply visibility status
		
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
			add(prettyItem, handle, false);
			
		}
		
		@Override
		public void onDelete(int itemno) {
			delete(handle, String.valueOf(itemno));
		}
		
		@Override
		public void onBid(Bid bid) {
			placeBid(handle, bid);
		}
		
	}

}
