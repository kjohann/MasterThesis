package data.service.subscriptions;

import models.*;
import java.util.*;

public interface ItemsSubscriptionListener {
	public abstract void onSnapShotNeeded(ArrayList<PrettyItem> items);
	
}
