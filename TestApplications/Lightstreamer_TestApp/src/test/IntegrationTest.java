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
		MySQLDatabaseHandler handler = MySQLDatabaseHandler.getInstance("auctionhouse", "n5user", "n5pass");
		handler.executeScript("C:/Users/Kristian/Documents/GitHub/MasterThesis/TestApplications/Lightstreamer_TestApp/src/test/files/dbRefresh.sql");
		String arg0 = "C:/Lightstreamer/Lightstreamer/conf/lightstreamer_conf.xml";
		String [] args = new String [1]; args[0] = arg0;
		LS.main(args);		
	}	
	
	@Test
	public void titleTest() {
		goTo("http://localhost:8080//AuctionHouse/View/");
		assertEquals("Auction House", title());
	}
	
	@Test
	public void canGetInitialItems() {
		goTo("http://localhost:8080//AuctionHouse/View/");
		await().atMost(5, TimeUnit.SECONDS).until(".item").hasSize().greaterThanOrEqualTo(4); //3 items + the template div
	}
	
	@Test
	public void canLogIn() {
		goTo("http://localhost:8080//AuctionHouse/View/");
		click("a", withText("Log in"));
		fill("#log_usern").with("Chrome");
		fill("#log_pass").with("123");
		click("#log_in_button");
		await().atMost(5, TimeUnit.SECONDS).until(".logged_in_as_link").hasText("Chrome");
	}
	
	@Test
	public void canAddItem() {
		goTo("http://localhost:8080//AuctionHouse/View/");
		click("a", withText("Log in"));
		fill("#log_usern").with("Chrome");
		fill("#log_pass").with("123");
		click("#log_in_button");
		await().atMost(5, TimeUnit.SECONDS).until(".logged_in_as_link").hasText("Chrome");
		click("#addItemButton");
		fill("#itemname").with("Fluentlenium");
		fill("#minprice").with("1337");
		fill("#expires").with("2014-03-12");
		fill("#description").with("This was added by an automated test.");
		click("#addButton");
		await().atMost(5, TimeUnit.SECONDS).until(".item").hasSize().greaterThanOrEqualTo(5);
	}	
	
	@AfterClass
	public static void tearDown() {
		MySQLDatabaseHandler handler = MySQLDatabaseHandler.getInstance("auctionhouse", "n5user", "n5pass");
		handler.executeScript("C:/Users/Kristian/Documents/GitHub/MasterThesis/TestApplications/Lightstreamer_TestApp/src/test/files/dbRefresh.sql");
	}
	
}
