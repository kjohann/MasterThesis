package adapters;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.MissingResourceException;

import org.codehaus.jackson.JsonProcessingException;

import subscriptions.JsonSubscription;

import com.lightstreamer.adapters.metadata.LiteralBasedProvider;
import com.lightstreamer.interfaces.metadata.CreditsException;
import com.lightstreamer.interfaces.metadata.MetadataProviderException;
import com.lightstreamer.interfaces.metadata.NotificationException;

public class LoadMetadataAdapter extends LiteralBasedProvider {
	private volatile JsonSubscription subscription;
	
	@Override
	public void init(Map arg0, File arg1) throws MetadataProviderException {
		// TODO Auto-generated method stub
		super.init(arg0, arg1);
	}
	
	@Override
	public void notifyUserMessage(String user, String sessionID, String message) throws CreditsException, NotificationException {
		//Let message be json-data
		if(subscription == null) {
			subscription = LoadAdapter.subscription;
			if(subscription == null) {
				throw new NullPointerException("Failed to load JsonSubscription");
			}
		}
		
		try {
			subscription.routeMessage(message);
		} catch (JsonProcessingException e) {
			e.printStackTrace();	
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
