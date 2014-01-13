package adapters;

import java.io.File;
import java.util.Map;

import com.lightstreamer.adapters.metadata.LiteralBasedProvider;
import com.lightstreamer.interfaces.metadata.CreditsException;
import com.lightstreamer.interfaces.metadata.MetadataProviderException;
import com.lightstreamer.interfaces.metadata.NotificationException;

public class LoadMetadataAdapter extends LiteralBasedProvider {
	@Override
	public void init(Map arg0, File arg1) throws MetadataProviderException {
		// TODO Auto-generated method stub
		super.init(arg0, arg1);
	}
	
	@Override
	public void notifyUserMessage(String user, String sessionID, String message) throws CreditsException, NotificationException {
		//Let message be json-data
		
	}
}
