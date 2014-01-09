package models;

import java.util.Calendar;
import java.util.List;

import org.junit.*;
import static org.junit.Assert.*;

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
        _monitor.rentFromClientEvents.add(5);
        _monitor.sentFromServerEvents.add(25);
        _monitor.spacing = 10;            
        _monitor.testDataEntities.add(new TestDataEntity());
	}
}
