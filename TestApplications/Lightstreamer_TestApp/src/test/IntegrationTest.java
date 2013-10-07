package test;

import java.util.concurrent.TimeUnit;

import org.fluentlenium.adapter.FluentTest;
import static org.fluentlenium.core.filter.FilterConstructor.*;
import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;
import com.lightstreamer.*;

import data.database.MySQLDatabaseHandler;

@RunWith(JUnit4.class)
public class IntegrationTest extends FluentTest{
	@BeforeClass
	public static void setUp() {
		MySQLDatabaseHandler handler = MySQLDatabaseHandler.getInstance("test", "n5user", "n5pass");
		handler.executeScript("C:/Users/Kristian/Documents/GitHub/MasterThesis/TestApplications/Lightstreamer_TestApp/src/test/files/dbRefresh.sql");
		String arg0 = "C:/Lightstreamer/Lightstreamer/conf/lightstreamer_conf.xml";
		String [] args = new String [1]; args[0] = arg0;
		LS.main(args);		
	}	
	
	
	@AfterClass
	public static void tearDown() {
		MySQLDatabaseHandler handler = MySQLDatabaseHandler.getInstance("test", "n5user", "n5pass");
		handler.executeScript("C:/Users/Kristian/Documents/GitHub/MasterThesis/TestApplications/Lightstreamer_TestApp/src/test/files/dbRefresh.sql");
	}
	
}
