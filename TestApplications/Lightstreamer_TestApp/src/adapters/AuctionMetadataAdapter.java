package adapters;

import java.io.File;
import java.util.Map;

import com.lightstreamer.adapters.metadata.LiteralBasedProvider;
import com.lightstreamer.interfaces.metadata.CreditsException;
import com.lightstreamer.interfaces.metadata.MetadataProviderException;
import com.lightstreamer.interfaces.metadata.NotificationException;

import data.service.subscriptions.ItemsSubscription;

public class AuctionMetadataAdapter extends LiteralBasedProvider {
	private volatile ItemsSubscription subscription;
	
	@Override
	public void init(Map arg0, File arg1) throws MetadataProviderException {
		// TODO Auto-generated method stub
		super.init(arg0, arg1);
	}

	@Override
	public void notifyUserMessage(String user, String sessionID, String message) throws CreditsException, NotificationException {
		if(this.subscription == null){
			this.subscription = AuctionDataAdapter.getItemsSubscripton();
			if(this.subscription == null) {
				System.err.println("Error loading subscription object!");
				return;
			}
		}
		
		handleMessage(message);
	}
	
	private void handleMessage(String message) {
		String[] parts = message.split("\\|");
		if(parts[0].equals("ADD")) {
			subscription.addItem(parts[1]);
		}
		else if(parts[0].equals("DELETE")) {
			subscription.deleteItem(parts[1]);
		}
		else if(parts[0].equals("BID")) {
			subscription.placeBid(parts[1]);
		}
	}

}
