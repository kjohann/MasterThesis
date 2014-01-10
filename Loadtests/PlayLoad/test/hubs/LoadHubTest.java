package hubs;

import java.util.Calendar;

import models.Message;
import models.Monitor;

import org.junit.*;
import static org.junit.Assert.*;

public class LoadHubTest {
	private LoadHub _loadHub;
	private Monitor _monitor;
	private Message _message;
	
	@Before
	public void setUp() {
		_loadHub = new LoadHub();
		_monitor = Monitor.getInstance();
		_monitor.reset();
		_monitor.numberOfClients = 100;
		_monitor.startTime = Calendar.getInstance().getTimeInMillis();
		_message = new Message();
		_message.SentFromClient = _monitor.startTime + 50;
		_monitor.spacing = 1;
	}
	
	@Test
    public void initTest_resets_monitor() {
		_monitor.duration = 1337; 
        _loadHub.initTest("echo", 1000, 1, 100000000);
        
        assertEquals(0, _monitor.duration);
    }

    @Test
    public void initTest_sets_number_of_clients_in_monitor() {
    	final int numberOfClients = 1000;
    	_loadHub.initTest("echo", numberOfClients, 10, 1337);
    	
    	assertEquals(numberOfClients, _monitor.numberOfClients);
    }

    @Test
    public void initTest_sets_spacing_in_monitor() {
    	final int numberOfClients = 1000;
    	_loadHub.initTest("echo", numberOfClients, 10, 1337);
    	
    	assertEquals(10, _monitor.spacing);
    }

    @Test
    public void initTest_sets_incoming_startTime_in_monitor() {
    	final int numberOfClients = 1000;
    	_loadHub.initTest("echo", numberOfClients, 10, 1337);
    	long startTime = Calendar.getInstance().getTimeInMillis();
    	_loadHub.initTest("echo", numberOfClients, 10, startTime);
    	
    	assertEquals(startTime, _monitor.startTime);
    }

    @Test
    public void echo_should_set_ReceivedAtServer_in_message() {
    	
    }

    @Test
    public void echo_should_register_a_ReceivedAtServerEvent_in_monitor() {
        
    }

    @Test
    public void echo_should_register_a_SentFromClientEvent_in_monitor() {
        
    }

    @Test
    public void echo_should_register_a_SentFromServerEvent_in_monitor() {
       
    }

    @Test
    public void echo_should_add_key_to_message() {
        
    }

    @Test
    public void broadcast_should_set_ReceivedAtServer_in_message() {
  
    }

    @Test
    public void broadcast_should_register_a_ReceivedAtServerEvent_in_monitor() {
      
    }

    @Test
    public void broadcast_should_register_a_SentFromClientEvent_in_monitor() {
        
    }

    @Test
    public void broadcast_should_register_SentFromServerEvents_corresponding_to_number_of_clients_in_monitor() {
        
    }

    @Test
    public void broadcast_should_add_key_to_message() {
       
    }

    @Test
    public void complete_should_add_clientId_to_monitor_completed_list() {
        
    }

    @Test
    public void complete_should_set_duration_in_monitor_if_all_clients_have_completed() {
       
    }

    @Test
    public void getData_should_add_incoming_data_to_monitor() {
        
    }
    
    @Test
    public void getData_should_increment_number_of_harvested_clients_in_monitor_with_nrOfClientsInBrowser() {
        
    }

    @Test
    public void getData_should_only_yield_harvestedAll_when_all_clients_are_harvested() {
        
    }
	
}
