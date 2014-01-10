package models;

import java.util.List;
import java.util.Set;

public class Monitor {

	public long startTime;
	public int numberOfClients;
	public List<TestDataEntity> testDataEntities;
	public int spacing;
	public List<Integer> sentFromServerEvents;
	public List<Integer> sentFromClientEvents;
	public List<Integer> receivedAtServerEvents;
	public int harvested;
	public int duration;
	public Set<String> completedClients;

	public Monitor getInstance() {
		// TODO Auto-generated method stub
		return null;
	}

	public void reset() {
		// TODO Auto-generated method stub
		
	}

	public int registerSentFromClientEvent(long value) {
		return registerSentFromClientEvent(value, 1);
		
	}
	
	public int registerSentFromClientEvent(long value, int spacing) {
		return 0;
		
	}
	
	public void registerReceivedAtServerEvent(long value) {
		// TODO Auto-generated method stub
		registerReceivedAtServerEvent(value, 1);
	}

	public void registerReceivedAtServerEvent(long value, int spacing) {
		// TODO Auto-generated method stub
		
	}

	public void registerSentFromServerEvent(long value, boolean broadCast) {
		// TODO Auto-generated method stub
		registerSentFromServerEvent(value, broadCast, 1);
	}
	
	public void registerSentFromServerEvent(long value, boolean broadCast, int spacing) {
		// TODO Auto-generated method stub
		
	}

}
