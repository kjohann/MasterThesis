package adapters;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
	private ItemsSubscription subscription;
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
		
		/*HashMap<String, String> update = new HashMap<String, String>();
		
		update.put("key", "1");
		update.put("command", "ADD");
		update.put("name", "Test");
		update.put("itemno", "1");
		update.put("price", "1337");
		update.put("bid", "1337");
		update.put("expires", "27.03.2014");
		update.put("highestbidder", "LeetUzr");
		update.put("description", "I rules!");
		update.put("addedByID", "1");
		
		listener.smartUpdate(handle, update, true);
		listener.smartEndOfSnapshot(true);
*/
	}
	
	private void add(PrettyItem item, Object handle, boolean snapshot) {
		HashMap<String, String> update = new HashMap<String, String>();
		
		update.put("key", String.valueOf(item.getItemno()));
		update.put("command", "ADD");
		update.put("name", item.getName());
		update.put("itemno", String.valueOf(item.getItemno()));
		update.put("price", String.valueOf(item.getPrice()));
		update.put("bid", String.valueOf(item.getBid()));
		update.put("expires", item.getExpires().toLocaleString());
		update.put("highestbidder", item.getHighestBidder());
		update.put("description", item.getDescription());
		update.put("addedByID", String.valueOf(item.getAddedByID()));
		
		listener.smartUpdate(handle, update, snapshot);
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
		
	}

}
