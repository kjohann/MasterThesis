package adapters;

import java.io.File;
import java.util.Map;

import com.lightstreamer.interfaces.data.DataProviderException;
import com.lightstreamer.interfaces.data.FailureException;
import com.lightstreamer.interfaces.data.ItemEventListener;
import com.lightstreamer.interfaces.data.SmartDataProvider;
import com.lightstreamer.interfaces.data.SubscriptionException;

public class AuctionDataAdapter implements SmartDataProvider {

	@Override
	public void init(Map arg0, File arg1) throws DataProviderException {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean isSnapshotAvailable(String arg0)
			throws SubscriptionException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setListener(ItemEventListener arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void unsubscribe(String arg0) throws SubscriptionException,
			FailureException {
		// TODO Auto-generated method stub

	}

	@Override
	public void subscribe(String arg0, boolean arg1)
			throws SubscriptionException, FailureException {
		// TODO Auto-generated method stub

	}

	@Override
	public void subscribe(String arg0, Object arg1, boolean arg2)
			throws SubscriptionException, FailureException {
		// TODO Auto-generated method stub

	}

}
