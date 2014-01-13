package hubs;

import java.util.Calendar;

import models.*;

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

	public void echo(Message message) {
		registerReceivedAndSentFromClientEvents(message);
        registerSentFromServerEvent(false);		
	}

	public void broadcast(Message message) {
		registerReceivedAndSentFromClientEvents(message);
        registerSentFromServerEvent(true);		
	}

	public boolean complete(String clientId) {
		 _monitor.completedClients.add(clientId);

        if (!_monitor.complete()) return false;

        _monitor.duration = Calendar.getInstance().getTimeInMillis() - _monitor.startTime;
        return true;
	}

	public boolean getData(TestDataEntity testData, int numberOfClientsInBrowser) {
		 _monitor.testDataEntities.add(testData);
         _monitor.harvested += numberOfClientsInBrowser;
         
         return _monitor.harvestedAll();
	} 
	
	private void registerReceivedAndSentFromClientEvents(Message message)
    {
        message.ReceivedAtServer = Calendar.getInstance().getTimeInMillis();                   
        _monitor.registerReceivedAtServerEvent(message.ReceivedAtServer, _monitor.spacing);
        int key = _monitor.registerSentFromClientEvent(message.SentFromClient, _monitor.spacing);
        message.Key = key;
    }

    private void registerSentFromServerEvent(boolean broadCast)
    {
        long sent = Calendar.getInstance().getTimeInMillis();
        _monitor.registerSentFromServerEvent(sent, broadCast, _monitor.spacing);
    }

}
