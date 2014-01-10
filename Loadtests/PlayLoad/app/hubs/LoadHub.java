package hubs;

import java.util.Calendar;

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

	public void echo(Message message) {
		registerReceivedAndSentFromClientEvents(message);
        registerSentFromServerEvent(false);		
	}

	public void broadcast(Message message) {
		registerReceivedAndSentFromClientEvents(message);
        registerSentFromServerEvent(true);		
	}

	public void complete(String clientId) {
		// TODO Auto-generated method stub		
	}

	public void getData(TestDataEntity testData, int numberOfClientsInBrowser) {
		// TODO Auto-generated method stub
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
