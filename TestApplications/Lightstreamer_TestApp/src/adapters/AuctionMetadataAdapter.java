package adapters;

import java.io.File;
import java.util.Map;

import com.lightstreamer.adapters.metadata.LiteralBasedProvider;
import com.lightstreamer.interfaces.metadata.CreditsException;
import com.lightstreamer.interfaces.metadata.MetadataProviderException;
import com.lightstreamer.interfaces.metadata.NotificationException;

import data.service.subscriptions.ItemsSubscription;
import data.service.subscriptions.UserSubscription;

public class AuctionMetadataAdapter extends LiteralBasedProvider {
	private volatile ItemsSubscription itemSubscription;
	private volatile UserSubscription userSubscription;
	
	@Override
	public void init(Map arg0, File arg1) throws MetadataProviderException {
		// TODO Auto-generated method stub
		super.init(arg0, arg1);
	}

	@Override
	public void notifyUserMessage(String user, String sessionID, String message) throws CreditsException, NotificationException {
		if(this.itemSubscription == null) {
			this.itemSubscription = AuctionDataAdapter.getItemsSubscripton();
			if(this.itemSubscription == null) {
				System.err.println("Error loading items subscription object!");
				return;
			}
		}
		if(this.userSubscription == null) {
			this.userSubscription = AuctionDataAdapter.getUserSubscription();
			if(this.userSubscription == null) {
				System.err.println("Error loading user subscription object!");
				return;
			}
		}
		
		handleMessage(message);
	}
	
	private void handleMessage(String message) {
		String[] parts = message.split("\\|");
		if(parts[0].equals("ADD")) {
			itemSubscription.addItem(parts[1]);
		}
		else if(parts[0].equals("DELETE")) {
			itemSubscription.deleteItem(parts[1]);
		}
		else if(parts[0].equals("BID")) {
			itemSubscription.placeBid(parts[1]);
		}
		else if(parts[0].equals("LOGIN")) {
			userSubscription.login(parts[1]);
		}
	}

}
