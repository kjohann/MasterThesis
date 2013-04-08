package data.service.subscriptions;

import models.*;
import java.util.*;

public interface ItemsSubscriptionListener {
	public abstract void onSnapShotNeeded(ArrayList<PrettyItem> items);
	public abstract void onAdd(Item item);
	public abstract void onDelete(int itemno);
	public abstract void onBid(Bid bid);
	
}
