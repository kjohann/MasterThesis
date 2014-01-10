package hubs;

import java.util.Calendar;
import java.util.List;

import models.Message;
import models.Monitor;
import models.TestDataEntity;

import org.junit.*;
import static org.junit.Assert.*;
import static util.AssertUtils.*;

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
    	_loadHub.echo(_message);
    	
    	assertNotSame(0, _message.ReceivedAtServer);
    }

    @Test
    public void echo_should_register_a_ReceivedAtServerEvent_in_monitor() {
    	_loadHub.echo(_message);
    	List<Integer> expectedData = getList(1);
    	
    	assertListEquals(expectedData, _monitor.receivedAtServerEvents);
    }

    @Test
    public void echo_should_register_a_SentFromClientEvent_in_monitor() {
    	_loadHub.echo(_message);
    	List<Integer> expectedData = getList(1);
    	
    	assertListEquals(expectedData, _monitor.sentFromClientEvents);
    }

    @Test
    public void echo_should_register_a_SentFromServerEvent_in_monitor() {
    	_loadHub.echo(_message);
    	List<Integer> expectedData = getList(1);
    	
    	assertListEquals(expectedData, _monitor.sentFromServerEvents);
    }

    @Test
    public void echo_should_add_key_to_message() {
    	_message.Key = 1337; //Will definitely not be this after echo-call
        _loadHub.echo(_message);
        
        assertEquals(0, _message.Key);
    }

    @Test
    public void broadcast_should_set_ReceivedAtServer_in_message() {
    	_loadHub.broadcast(_message);
    	
    	assertNotSame(0, _message.ReceivedAtServer);
    }

    @Test
    public void broadcast_should_register_a_ReceivedAtServerEvent_in_monitor() {
    	_loadHub.broadcast(_message);
    	List<Integer> expectedData = getList(1);
    	
    	assertListEquals(expectedData, _monitor.receivedAtServerEvents);
    }

    @Test
    public void broadcast_should_register_a_SentFromClientEvent_in_monitor() {
    	_loadHub.broadcast(_message);
    	List<Integer> expectedData = getList(1);
    	
    	assertListEquals(expectedData, _monitor.sentFromClientEvents);
    }

    @Test
    public void broadcast_should_register_SentFromServerEvents_corresponding_to_number_of_clients_in_monitor() {
    	_loadHub.broadcast(_message);
    	List<Integer> expectedData = getList(100);
    	
    	assertListEquals(expectedData, _monitor.sentFromServerEvents);
    }

    @Test
    public void broadcast_should_add_key_to_message() {
    	_message.Key = 1337; //Will definitely not be this after broadcast-call
        _loadHub.broadcast(_message);
        
        assertEquals(0, _message.Key);
    }

    @Test
    public void complete_should_add_clientId_to_monitor_completed_list() {
    	_loadHub.complete("1337");
        assertEquals(1, _monitor.completedClients.size());
        assertEquals(0, _monitor.duration);  //not complete yet
    }

    @Test
    public void complete_should_set_duration_in_monitor_if_all_clients_have_completed() throws InterruptedException {
    	for (int i = 0; i < _monitor.numberOfClients; i++)
        {
            Thread.sleep(2);
            _loadHub.complete(i + "");
        }      
    	
    	assertEquals(_monitor.numberOfClients, _monitor.completedClients);
    	assertNotSame(0, _monitor.duration);
    }

    @Test
    public void getData_should_add_incoming_data_to_monitor() {
        TestDataEntity testData = new TestDataEntity();
        testData.LatencyData = getList(300, 300, 300);
        
        _loadHub.getData(testData, 5);
        
        assertEquals(testData, _monitor.testDataEntities.get(0));
    }
    
    @Test
    public void getData_should_increment_number_of_harvested_clients_in_monitor_with_nrOfClientsInBrowser() {
        _loadHub.getData(new TestDataEntity(), 10);
        
        assertEquals(10, _monitor.harvested);
    }

    @Test
    public void getData_should_only_yield_harvestedAll_when_all_clients_are_harvested() {
    	_monitor.numberOfClients = 15;

        for (int i = 0; i < 3; i++)
        {
            _loadHub.getData(new TestDataEntity(), 5);
            assertEquals(i == 2, _monitor.harvestedAll());
        }
    }
	
}
