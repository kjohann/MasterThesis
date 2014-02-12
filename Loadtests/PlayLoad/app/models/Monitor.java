package models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;

public class Monitor {

	private static Monitor _instance;
	private Object sentCMut = new Object(), sentSeMut = new Object(), recMut = new Object();
	public long connected = 0;
	public long clientStartTime;
	public long serverStartTime;
	public int numberOfClients;
	public BlockingQueue<TestDataEntity> testDataEntities;
	public int spacing;
	public ConcurrentHashMap<Integer, Integer> sentFromServerEvents;
	public ConcurrentHashMap<Integer, Integer> sentFromClientEvents;
	public ConcurrentHashMap<Integer, Integer> receivedAtServerEvents;
	public int harvested;
	public long duration;
	public BlockingQueue<String> completedClients;

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
		testDataEntities = new LinkedBlockingQueue<TestDataEntity>();
		spacing = 0;
		sentFromServerEvents = new ConcurrentHashMap<Integer, Integer>();
		sentFromClientEvents = new ConcurrentHashMap<Integer, Integer>();
		receivedAtServerEvents = new ConcurrentHashMap<Integer, Integer>();
		harvested = 0;
		duration = 0;
		completedClients = new LinkedBlockingQueue<>();		
	}

	public int registerSentFromClientEvent(long millisecondsSinceEpoch) {
		return registerSentFromClientEvent(millisecondsSinceEpoch, 1);		
	}
	
	public int registerSentFromClientEvent(long millisecondsSinceEpoch, int spacing) {
		int key = getKey(millisecondsSinceEpoch, spacing, true);
		synchronized (sentCMut) {
			addEvent(sentFromClientEvents, key);
		}
		
		return key;
	}
	
	public void registerReceivedAtServerEvent(long millisecondsSinceEpoch) {
		registerReceivedAtServerEvent(millisecondsSinceEpoch, 1);
	}

	public void registerReceivedAtServerEvent(long millisecondsSinceEpoch, int spacing) {
		int key = getKey(millisecondsSinceEpoch, spacing, false);
		synchronized (recMut) {
			addEvent(receivedAtServerEvents, key);	
		}
	}

	public void registerSentFromServerEvent(long millisecondsSinceEpoch, boolean broadcast) {
		registerSentFromServerEvent(millisecondsSinceEpoch, broadcast, 1);
	}
	
	public void registerSentFromServerEvent(long millisecondsSinceEpoch, boolean broadcast, int spacing) {
		int key = getKey(millisecondsSinceEpoch, spacing, false);
		int nrOfEvents = broadcast ? numberOfClients : 1;
		synchronized (sentSeMut) {
			addEvent(sentFromServerEvents, key, nrOfEvents);	
		}
	}
	
	public void addEvent(ConcurrentHashMap<Integer, Integer> eventStore, int key) {
		addEvent(eventStore, key, 1);		
	}

	public void addEvent(ConcurrentHashMap<Integer, Integer> eventStore, int key, int nrOfEvents) {
		while(key > eventStore.values().size()) {
			eventStore.put(eventStore.values().size(), 0);			
		}
		if(eventStore.values().size() == key) {
			eventStore.put(key, nrOfEvents);
		} else {
			int value = eventStore.get(key);
			value += nrOfEvents;
			eventStore.replace(key, value);
		}
		
	}
	
	private int getKey(long millisecondsSinceEpoch, int spacing, boolean client) {
		long start = client ? clientStartTime : serverStartTime;
		long millisecondsSinceStart = millisecondsSinceEpoch - start;
		int seconds = round(false, (double)(millisecondsSinceStart/1000));
		return round(false, (double)(seconds/spacing));
	}
	
	private static int round(boolean up, double value) {
		return up ? (int)Math.ceil(value) : (int)Math.floor(value);
	}

	public boolean harvestedAll() {
		return harvested == numberOfClients;
	}
	
	public boolean complete() {
		return completedClients.size() == numberOfClients;
	}

}
