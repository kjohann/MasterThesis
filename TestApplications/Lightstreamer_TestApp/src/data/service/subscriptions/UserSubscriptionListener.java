package data.service.subscriptions;

import java.util.ArrayList;

import models.User;
import models.ViewBid;

public interface UserSubscriptionListener {
	public abstract void onLogin(User user);
	public abstract void onViewBids(ArrayList<ViewBid> viewBids);
}
