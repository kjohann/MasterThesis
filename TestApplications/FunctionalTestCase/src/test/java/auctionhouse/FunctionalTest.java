package auctionhouse;

import static org.junit.Assert.*;

import java.util.List;

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
	private int numberOfItems = 0;
	
	
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
	
	@Test
	public void step4_is_user_should_be_able_to_add_an_item() {
		find(firefox, By.id("addItemButton")).click();
		
		fill(find(firefox, By.id("itemname")), "TestItem");
		fill(find(firefox, By.id("minprice")), "1337");
		fill(find(firefox, By.id("expires")), "2013-10-26");
		fill(find(firefox, By.id("description")), "This is a test");
		
		find(firefox, By.id("addButton")).click();		
		
		(new WebDriverWait(firefox, 3)).until(new ExpectedCondition<Boolean>() {

			@Override
			public Boolean apply(WebDriver arg0) {
				List<WebElement> elements = firefox.findElements(By.className("item"));		
				for(WebElement el : elements) {
					if(el.findElement(By.className("itemHeader"))
							.findElement(By.tagName("h2")).getText().equals("TestItem")) {
						return true;
					}
				}
				
				return false;
			}
		
		});
	}
	
	@Test
	public void step5_is_other_users_should_have_received_new_item_via_broadcasting() {
		WebElement element = null;
		List<WebElement> elements = opera.findElements(By.className("item"));		
		for(WebElement el : elements) {
			WebElement header = el.findElement(By.className("itemHeader"))
					.findElement(By.tagName("h2"));
			if(header.getText().equals("TestItem")) {
				element = header;
			}
		}
		
		assertNotNull(element);
	}
	
	@Test
	public void step6_is_user_should_be_able_to_place_bid_on_newly_added_item() {		
		List<WebElement> elements = firefox.findElements(By.className("item"));		
		WebElement button = null;
		for(WebElement el : elements) {
			WebElement header = el.findElement(By.className("itemHeader"))
					.findElement(By.tagName("h2"));
			if(header.getText().equals("TestItem")) {
				button = el.findElement(By.className("itemContent"))
						.findElement(By.className("bidButton"));
				break;
			}
		}
		
		assertNotNull(button);
		
		button.click();
		
		fill(find(firefox, By.id("bid")), "3333");
		find(firefox, By.id("place_bid_button")).click();
		
		
		(new WebDriverWait(firefox, 3)).until(new ExpectedCondition<Boolean>() {

			@Override
			public Boolean apply(WebDriver arg0) {
				List<WebElement> elements = firefox.findElements(By.className("item"));		
				for(WebElement el : elements) {
					WebElement header = el.findElement(By.className("itemHeader"))
							.findElement(By.tagName("h2"));
					if(header.getText().equals("TestItem")) {
						List<WebElement> spans = el.findElement(By.className("itemContent"))
								.findElements(By.tagName("span"));
						for(WebElement span : spans) {
							if(span.getText().equals(username)) {
								return true;
							}
						}
					}
				}
				
				return false;
				
			}
		
		});
	}
	
	@Test
	public void step7_is_other_users_should_get_update_on_bid() {
		WebElement spanToFind = null;
		List<WebElement> elements = opera.findElements(By.className("item"));		
		for(WebElement el : elements) {
			WebElement header = el.findElement(By.className("itemHeader"))
					.findElement(By.tagName("h2"));
			if(header.getText().equals("TestItem")) {
				List<WebElement> spans = el.findElement(By.className("itemContent"))
						.findElements(By.tagName("span"));
				for(WebElement span : spans) {
					if(span.getText().equals(username)) {
						spanToFind = span;
					}
				}
			}
		}
		
		assertNotNull(spanToFind);
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
