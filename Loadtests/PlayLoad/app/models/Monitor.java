package models;

import java.util.List;
import java.util.Set;

public class Monitor {

	public long startTime;
	public int numberOfClients;
	public List<TestDataEntity> testDataEntities;
	public int spacing;
	public List<Integer> sentFromServerEvents;
	public List<Integer> rentFromClientEvents;
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

}
