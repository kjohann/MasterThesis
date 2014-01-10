package models;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.junit.*;
import static org.junit.Assert.*;
import static util.AssertUtils.*;

public class MonitorTest {
	private Monitor _monitor;
	
	@Before
	public void setUp() {
		_monitor = _monitor.getInstance();
		_monitor.reset();
		Calendar c = Calendar.getInstance();
		c.set(2014, 1, 9);
		_monitor.startTime = c.getTimeInMillis();
		_monitor.numberOfClients = 100;
	}
	
	@Test
	public void reset_sets_all_public_fields_of_the_monitor_exept_startTime_back_to_initial_values() {
		_monitor.completedClients.add("Something");
        _monitor.duration = 1000;
        _monitor.harvested = 10;
        _monitor.numberOfClients = 10;
        _monitor.receivedAtServerEvents.add(5);
        _monitor.sentFromClientEvents.add(5);
        _monitor.sentFromServerEvents.add(25);
        _monitor.spacing = 10;            
        _monitor.testDataEntities.add(new TestDataEntity());
        
        _monitor.reset();
        
        assertEquals(_monitor.completedClients.size(), 0);
        assertEquals(_monitor.duration, 0);
        assertEquals(_monitor.harvested, 0);
        assertEquals(_monitor.numberOfClients, 0);
        assertEquals(_monitor.receivedAtServerEvents.size(), 0);
        assertEquals(_monitor.sentFromClientEvents.size(), 0);
        assertEquals(_monitor.sentFromServerEvents.size(), 0);
        assertEquals(_monitor.spacing, 0);
        assertEquals(_monitor.testDataEntities.size(), 0);
	}
	
	@Test
	public void registerSentFromClientEvent_should_register_an_event_within_the_correct_interval() {
		List<Long> values = getDummyMillisecondValues(200, 20);
		registerSentFromClientEvents(values);
		
		List<Integer> expectedData = getList(4, 5, 5, 5, 1);
		
		assertListEquals(expectedData, _monitor.sentFromClientEvents);
	}
	
	@Test
    public void registerSentFromClientEvent_should_register_an_event_also_with_different_spacing() {
		List<Long> values = getDummyMillisecondValues(200, 40);
		registerSentFromClientEvents(values, 5);
		
		List<Integer> expectedData = getList(24, 16);
		
		assertListEquals(expectedData, _monitor.sentFromClientEvents);
    }

	@Test
    public void registerSentFromClientEvent_should_be_able_to_handle_large_dataSets() {
        List<Long> values = getDummyMillisecondValues(100, 1000);
        registerSentFromClientEvents(values, 10);
        
        List<Integer> expectedData = getList(99, 100, 100, 100, 100, 100, 100, 100, 100, 100, 1);
        
        assertListEquals(expectedData, _monitor.sentFromClientEvents);
    }

	@Test
    public void registerSentFromClientEvent_should_return_the_corresponding_key_for_the_event_with_spacing_one() {
		long startLong = _monitor.startTime;
		int key = _monitor.registerSentFromClientEvent(startLong + 999);
		assertEquals(key, 0);
    }

	@Test
    public void registerSentFromClientEvent_should_return_the_corresponding_key_for_the_event_with_spacing_more_than_one() {
		long startLong = _monitor.startTime;
		int key = _monitor.registerSentFromClientEvent(startLong + 100000, 10);
		assertEquals(key, 10);
    }

	@Test
    public void registerReceivedAtServerEvent_should_register_an_event_within_the_correct_interval() {
          List<Long> values = getDummyMillisecondValues(200, 20);
          registerReceivedAtServerEvents(values);
          
          List<Integer> expectedData = getList(4, 5, 5, 5, 1);
          
          assertListEquals(expectedData, _monitor.receivedAtServerEvents);
    }

	@Test
    public void registerReceivedAtServerEvent_should_register_an_event_also_with_different_spacing() {
		List<Long> values = getDummyMillisecondValues(200, 40);
        registerReceivedAtServerEvents(values);
        
        List<Integer> expectedData = getList(24, 16);
        
        assertListEquals(expectedData, _monitor.receivedAtServerEvents);
    }

	@Test
    public void registerReceivedAtServerEvent_should_be_able_to_handle_large_dataSets() {
        List<Long> values = getDummyMillisecondValues(100, 1000);
        registerReceivedAtServerEvents(values, 10);
        
        List<Integer> expectedData = getList(99, 100, 100, 100, 100, 100, 100, 100, 100, 100, 1);
        
        assertListEquals(expectedData, _monitor.receivedAtServerEvents);
	}

	@Test
    public void registerSentFromServerEvent_should_register_an_echo_event_within_the_correct_interval() {
        
    }

	@Test
    public void registerSentFromServerEvent_should_register_a_broadcast_event_within_the_correct_interval() {       
    
	}

	@Test
    public void registerSentFromServerEvent_should_register_an_echo_event_also_with_different_spacing() {
        
    }

	@Test
    public void registerSentFromServerEvent_should_register_a_boradcast_event_also_with_different_spacing() {
       
    }

	@Test
    public void registerSentFromServerEvent_should_be_able_to_handle_large_dataSets_with_echo() {
        
    }

	@Test
    public void registerSentFromServerEvent_should_be_able_to_handle_large_dataSets_with_broadcast() {
       
    }

	@Test
    public void addEvent_should_fill_in_zero_events_if_key_points_to_an_out_of_bounds_index() {
    	
    }
	
	private List<Long> getDummyMillisecondValues(int eventInterval, int totalNumber) {
		List<Long> values = new ArrayList<Long>();
		
		long startLong = _monitor.startTime;

        for (int i = 0; i < totalNumber; i++)
        {
            long value = startLong + eventInterval;
            startLong += eventInterval;
            values.add(value);
        }
		
		return values;
	}
	
	private void registerSentFromClientEvents(List<Long> values) {
		registerSentFromClientEvents(values, 1);
	}
	
	private void registerSentFromClientEvents(List<Long> values, int spacing)
    {
        for (long value : values)
        {
            _monitor.registerSentFromClientEvent(value, spacing);
        }
    }

	private void registerReceivedAtServerEvents(List<Long> values) {
		registerReceivedAtServerEvents(values, 1);
	}
	
    private void registerReceivedAtServerEvents(List<Long> values, int spacing)
    {
    	for (long value : values)
        {
            _monitor.registerReceivedAtServerEvent(value, spacing);
        }
    }

    private void registerSentFromServerEvents(List<Long> values, boolean broadCast) {
    	registerSentFromServerEvents(values, broadCast, 1);
    }
    
    private void registerSentFromServerEvents(List<Long> values, boolean broadCast, int spacing)
    {
    	for (long value : values)
        {
            _monitor.registerSentFromServerEvent(value, broadCast, spacing);
        }
    }
    
    private <T> List<T> getList(T ...data) {
    	List<T> list = new ArrayList<T>();
    	
    	for(T d : data) {
    		list.add(d);
    	}
    	
    	return list;
    }
}
