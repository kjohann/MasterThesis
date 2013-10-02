package auctionhouse;

import static org.junit.Assert.*;

import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.junit.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.opera.core.systems.OperaDriver;
import database.connector.*;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class FunctionalTest {
	private static String url = "";
	private static WebDriver opera, firefox;
	private static Connector connector;
	static Logger logger = Logger.getLogger(FunctionalTest.class);
	private static final String username = "Testuser";
	
	
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
		assertTrue("Failed to clean database", 
				connector.delete("DELETE FROM auctionhouse.user WHERE Username = \"" + username + "\";"));
		connector.tearDown();
		logger.info("Closed database connection");
	}

	@Test
	public void step1_is_title_in_both_browsers_should_be_Auction_House() {		
		String firefoxTitle = firefox.getTitle();
		String operaTitle = opera.getTitle();
		
		assertEquals("Auction House", firefoxTitle);
		assertEquals(firefoxTitle, operaTitle);
	}
	
	@Test
	public void step2_is_user_should_be_able_to_register_new_user() {
		find(firefox, By.linkText("Register")).click();

		fill(find(firefox, By.id("firstname")), "Kristian");
		fill(find(firefox, By.id("lastname")), "Johannessen");
		fill(find(firefox, By.id("adress")), "123 Fakestreet");
		fill(find(firefox, By.id("username")), username);
		fill(find(firefox, By.id("password")), "123");
		
		find(firefox, By.id("register_button")).click();
		(new WebDriverWait(firefox, 3)).until(new ExpectedCondition<Boolean>() {

			@Override
			public Boolean apply(WebDriver arg0) {
				Alert alert = firefox.switchTo().alert();
				if(alert != null) {
					alert.accept();
					return true;
				} else {
					return false;
				}				
			}
		
		});					
	}
	
	@Test
	public void step3_is_user_should_be_able_to_log_in_with_registered_user() {
		find(firefox, By.linkText("Log in")).click();
		
		fill(find(firefox, By.id("log_usern")), username);
		fill(find(firefox, By.id("log_pass")), "123");
		
		find(firefox, By.id("log_in_button")).click();
		
		(new WebDriverWait(firefox, 3)).until(new ExpectedCondition<Boolean>() {

			@Override
			public Boolean apply(WebDriver arg0) {
				return find(firefox, By.linkText(username)).isDisplayed();		
			}
		
		});	
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
		assertTrue(connector.init("n5user", "n5pass"));				
	}
	
	private WebElement find(WebDriver browser, By criteria) {
		return browser.findElement(criteria);
	}
	
	private void fill(WebElement element, String with) {
		element.sendKeys(with);
	}

}
