package adapters;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.lightstreamer.interfaces.data.DataProviderException;
import com.lightstreamer.interfaces.data.FailureException;
import com.lightstreamer.interfaces.data.ItemEventListener;
import com.lightstreamer.interfaces.data.SmartDataProvider;
import com.lightstreamer.interfaces.data.SubscriptionException;

public class AuctionDataAdapter implements SmartDataProvider {
	private ItemEventListener listener;
	private final ConcurrentHashMap<String, Object> subscriptions = new ConcurrentHashMap<String, Object>();
	
	 
	@Override
	public void init(Map params, File configDir) throws DataProviderException {
		//TODO: find use?
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
		HashMap<String, String> update = new HashMap<String, String>();
		
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

	}

}
