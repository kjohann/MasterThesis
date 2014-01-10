package hubs;

import models.Message;
import models.Monitor;
import models.TestDataEntity;

public class LoadHub { //yes, I'm stealing terminology from SignalR - more for the sake of consistency really.
	private Monitor _monitor;
	
	public LoadHub() {
		_monitor = Monitor.getInstance();
	}
	
	public void initTest(String testTorRun, int numberOfClients, int spacing, long startTime) {
		_monitor.reset();
        _monitor.numberOfClients = numberOfClients;
        _monitor.spacing = spacing;

        _monitor.startTime = startTime;
	}

	public void echo(Message _message) {
		// TODO Auto-generated method stub		
	}

	public void broadcast(Message _message) {
		// TODO Auto-generated method stub		
	}

	public void complete(String clientId) {
		// TODO Auto-generated method stub		
	}

	public void getData(TestDataEntity testData, int numberOfClientsInBrowser) {
		// TODO Auto-generated method stub
	} 

}
