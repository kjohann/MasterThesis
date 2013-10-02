package auctionhouse;

import static org.junit.Assert.*;

import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import com.opera.core.systems.OperaDriver;
import database.connector.*;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class FunctionalTest {
	private static String url = "";
	private static WebDriver opera, firefox;
	private static Connector connector;
	static Logger logger = Logger.getLogger(FunctionalTest.class);
	
	
	//run with mvn test -DargLine="-Dhost=[host] -Dport=[port] -DpageUrl=[(optional)url]" 
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		verifyUrl();
		initDatabase();
		initBrowsers();
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		opera.quit();
		logger.info("Successfully closed Opera");
		firefox.quit();		
		logger.info("Successfully closed Firefox");
		connector.tearDown();
	}

	@Test
	public void test1_title_in_both_browsers_should_be_Auction_House() {		
		String firefoxTitle = firefox.getTitle();
		String operaTitle = opera.getTitle();
		
		assertEquals("Auction House", firefoxTitle);
		assertEquals(firefoxTitle, operaTitle);
	}
	
	private static void verifyUrl() {
		String host = System.getProperty("host");
		assertNotNull("Need to pass host parameter! Use -DargLine=\"-Dhost=[host]\"", host);
		url+= host;
		
		
		String port = System.getProperty("port");
		assertNotNull("Need to pass port parameter! Use -DargLine=\"-Dport=[port]\"", port);
		url += ":" + port;
		
		String pageUrl = System.getProperty("pageUrl");
		if(pageUrl != null) {
			url += "/" + pageUrl;
		} else {
			logger.warn("No pageUrl parameter specified! Expecting resource at " + url);
		}
		
		logger.info("Using url: " + url);
	}
	
	private static void initBrowsers() {
		opera = new OperaDriver();
		firefox = new FirefoxDriver();
		
		firefox.navigate().to(url);
		logger.info("Successfully initialized Firefox");
		
		opera.navigate().to(url);		
		logger.info("Successfully initialized Opera");
	}
	
	private static void initDatabase() {
		connector = MySQLConnector.getInstance("test");
		connector.init("n5user", "n5pass");
		
		assertTrue(connector.executeScript("src/test/resources/dbInit.sql"));
	}

}
