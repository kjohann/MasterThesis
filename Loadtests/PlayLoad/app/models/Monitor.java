package models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Monitor {

	private static Monitor _instance;
	
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

	public static Monitor getInstance() {
		if(_instance == null) {
			_instance = new Monitor();
		}
		
		return _instance;
	}
	
	private Monitor() {
		reset();
	}

	public void reset() {
		numberOfClients = 0;
		testDataEntities = new ArrayList<>();
		spacing = 0;
		sentFromServerEvents = new ArrayList<>();
		sentFromClientEvents = new ArrayList<>();
		receivedAtServerEvents = new ArrayList<>();
		harvested = 0;
		duration = 0;
		completedClients = new HashSet<>();		
	}

	public int registerSentFromClientEvent(long millisecondsSinceEpoch) {
		return registerSentFromClientEvent(millisecondsSinceEpoch, 1);		
	}
	
	public int registerSentFromClientEvent(long millisecondsSinceEpoch, int spacing) {
		int key = getKey(millisecondsSinceEpoch, spacing);
		addEvent(sentFromClientEvents, key);
		return key;
	}
	
	public void registerReceivedAtServerEvent(long millisecondsSinceEpoch) {
		registerReceivedAtServerEvent(millisecondsSinceEpoch, 1);
	}

	public void registerReceivedAtServerEvent(long millisecondsSinceEpoch, int spacing) {
		int key = getKey(millisecondsSinceEpoch, spacing);
		addEvent(receivedAtServerEvents, key);
	}

	public void registerSentFromServerEvent(long millisecondsSinceEpoch, boolean broadcast) {
		registerSentFromServerEvent(millisecondsSinceEpoch, broadcast, 1);
	}
	
	public void registerSentFromServerEvent(long millisecondsSinceEpoch, boolean broadcast, int spacing) {
		int key = getKey(millisecondsSinceEpoch, spacing);
		int nrOfEvents = broadcast ? numberOfClients : 1;
		addEvent(sentFromServerEvents, key, nrOfEvents);
	}
	
	public void addEvent(List<Integer> eventStore, int key) {
		addEvent(eventStore, key, 1);		
	}

	public void addEvent(List<Integer> eventStore, int key, int nrOfEvents) {
		while(key > eventStore.size()) {
			eventStore.add(0);			
		}
		if(eventStore.size() == key) {
			eventStore.add(nrOfEvents);
		} else {
			int value = eventStore.get(key);
			value += nrOfEvents;
			eventStore.set(key, value);
		}
		
	}
	
	private int getKey(long millisecondsSinceEpoch, int spacing) {
		long millisecondsSinceStart = millisecondsSinceEpoch - startTime;
		int seconds = round(false, (double)(millisecondsSinceStart/1000));
		return round(false, (double)(seconds/spacing));
	}
	
	private static int round(boolean up, double value) {
		return up ? (int)Math.ceil(value) : (int)Math.floor(value);
	}

}
