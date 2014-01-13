package subscriptions.listeners;

import models.*;

public interface JsonSubscriptionListener {
	public abstract void initTest(String cid, String testToRun, int numberOfClients, int spacing, long startTime);
	public abstract void echo(String cid, Message message);
	public abstract void broadcast(String cid, Message message);
	public abstract void complete(String cid); //cid is clientId
	public abstract void getData(String cid, TestDataEntity testData, int numberOfClientsInBrowser);
}
