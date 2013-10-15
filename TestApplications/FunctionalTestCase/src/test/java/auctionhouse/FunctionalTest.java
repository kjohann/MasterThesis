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
	private static boolean includeTemplate = false;
	private static WebDriver opera, firefox;
	private static Connector connector;
	static Logger logger = Logger.getLogger(FunctionalTest.class);
	private static final String username = "Testuser";
	
	
	//run with mvn test -DargLine="-Dhost=[host] -Dport=[port] -DpageUrl=[(optional)url] -DincludeTemplate=[(default=false)]" 
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		verifyUrl();
		findOutIfTemplateDivsShouldBeIncluded();
		initDatabase();
		initBrowsers();
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		closeBrowsers();
		closeDatabase();
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
		
		wait(3).until(new ExpectedCondition<Boolean>() {

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
		
		wait(3).until(new ExpectedCondition<Boolean>() {

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
		
		wait(3).until(new ExpectedCondition<Boolean>() {

			@Override
			public Boolean apply(WebDriver arg0) {
				List<WebElement> elements = findMany(firefox, By.className("item"));		
				for(WebElement el : elements) {
					if(getItemHeader(el).getText().equals("TestItem")) {
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
		List<WebElement> elements = findMany(opera, By.className("item"));
		for(WebElement el : elements) {
			WebElement header = getItemHeader(el);					
			if(header.getText().equals("TestItem")) {
				element = header;
			}
		}
		
		assertNotNull(element);
	}
	
	@Test
	public void step6_is_user_should_be_able_to_place_bid_on_newly_added_item() {		
		List<WebElement> elements = findMany(firefox, By.className("item"));		
		WebElement button = null;
		for(WebElement el : elements) {
			WebElement header = getItemHeader(el);
			if(header.getText().equals("TestItem")) {
				button = find(el, By.className("itemContent")).findElement(By.className("bidButton"));						
				break;
			}
		}
		
		assertNotNull(button);
		
		button.click();
		
		fill(find(firefox, By.id("bid")), "3333");
		find(firefox, By.id("place_bid_button")).click();
		
		
		wait(3).until(new ExpectedCondition<Boolean>() {

			@Override
			public Boolean apply(WebDriver arg0) {
				List<WebElement> elements = findMany(firefox, By.className("item"));	
				for(WebElement el : elements) {
					WebElement header = getItemHeader(el);						
					if(header.getText().equals("TestItem")) {
						List<WebElement> spans = find(el, By.className("itemContent")).findElements(By.tagName("span"));								
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
		List<WebElement> elements = findMany(opera, By.className("item"));	
		for(WebElement el : elements) {
			WebElement header = getItemHeader(el);					
			if(header.getText().equals("TestItem")) {
				List<WebElement> spans = find(el, By.className("itemContent")).findElements(By.tagName("span"));
				for(WebElement span : spans) {
					if(span.getText().equals(username)) {
						spanToFind = span;
					}
				}
			}
		}
		
		assertNotNull(spanToFind);
	}
	
	@Test
	public void step8_is_user_should_be_able_to_view_bids() {
		find(firefox, By.linkText(username)).click();
		
		wait(3).until(new ExpectedCondition<Boolean>() {

			@Override
			public Boolean apply(WebDriver arg0) {
				List<WebElement> bids = findMany(firefox, By.className("bidDialogElement"));	
				if(bids.size() > 0) { 
					int expected = includeTemplate ? 2 : 1;
					assertEquals(expected, bids.size());
					return true;
				} else {
					return false;
				}
			}
		
		});		
	}
	
	@Test
	public void step9_is_user_should_be_able_to_remove_added_item() {
		List<WebElement> elements = findMany(firefox, By.className("item"));
		
		final int numberOfItems = elements.size();
		
		WebElement button = null;
		for(WebElement el : elements) {
			WebElement header = getItemHeader(el);					
			if(header.getText().equals("TestItem")) {
				button = find(el, By.className("itemContent")).findElement(By.className("removeButton"));						
				break;
			}
		}
		
		assertNotNull(button);
		
		button.click();
		
		wait(3).until(new ExpectedCondition<Boolean>() {

			@Override
			public Boolean apply(WebDriver arg0) {
				List<WebElement> elements = findMany(firefox, By.className("item"));	
				if(elements.size() < numberOfItems) {
					return true;
				}
				
				return false;
			}
		
		});
	}
	
	@Test
	public void step_no_10_is_other_users_should_receive_update_on_removed_item_via_broadcast() {
		List<WebElement> elements = findMany(opera, By.className("item"));	
		for(WebElement el : elements) {
			WebElement header = getItemHeader(el);
			assertNotEquals(header.getText(), "TestItem"); 			
		}
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
	
	private static void findOutIfTemplateDivsShouldBeIncluded() {
		String includeTemplateString = System.getProperty("includeTemplate");
		if(includeTemplateString != null) {
			includeTemplate = true;
			logger.warn("Template divs are included in div count - make sure that this is the correct behavioir!");
		}
	}
	
	private static void initDatabase() {
		connector = MySQLConnector.getInstance("test");
		assertTrue(connector.init("n5user", "n5pass"));				
	}
	
	private static void closeBrowsers() {
		opera.quit();
		logger.info("Successfully closed Opera");
		firefox.quit();		
		logger.info("Successfully closed Firefox");
	}
	
	private static void closeDatabase() {
		assertTrue("Failed to clean database", 
				connector.delete("DELETE FROM auctionhouse.user WHERE Username = \"" + username + "\";"));
		connector.tearDown();
		logger.info("Closed database connection");
	}
	
	private WebElement find(WebDriver browser, By criteria) {
		return browser.findElement(criteria);
	}
	
	private WebElement find(WebElement element, By criteria) {
		return element.findElement(criteria);
	}
	
	private List<WebElement> findMany(WebDriver browser, By criteria) {
		return browser.findElements(criteria);
	}
	
	private void fill(WebElement element, String with) {
		element.clear();
		element.sendKeys(with);
	}
	
	private WebDriverWait wait(int seconds) {
		return new WebDriverWait(firefox, seconds);
	}
	
	private WebElement getItemHeader(WebElement el) {
		return find(el, By.className("itemHeader")).findElement(By.tagName("h2"));
	}

}
