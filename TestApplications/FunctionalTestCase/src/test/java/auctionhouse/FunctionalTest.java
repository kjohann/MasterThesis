package auctionhouse;

import static org.junit.Assert.*;

import javax.swing.JOptionPane;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import com.opera.core.systems.OperaDriver;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class FunctionalTest {
	private static String url = "";
	private static WebDriver opera, firefox;
	
	//run with mvn test -DargLine="-Dhost=[host] -Dport=[port] -DpageUrl=[(optional)url]" 
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		String host = System.getProperty("host");
		assertNotNull("Need to pass host parameter! Use -DargLine=\"-Dhost=[host]\"", host);
		url+= host;
		
		
		String port = System.getProperty("port");
		assertNotNull("Need to pass port parameter! Use -DargLine=\"-Dport=[port]\"", port);
		url += ":" + port;
		
		String pageUrl = System.getProperty("pageUrl");
		if(pageUrl != null) {
			url += "/" + pageUrl;
		}
		
		opera = new OperaDriver();
		firefox = new FirefoxDriver();
		
		firefox.navigate().to(url);
		opera.navigate().to(url);			
		
		System.out.println("Title: " + firefox.getTitle());
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		opera.quit();
		firefox.quit();
	}

	@Test
	public void test1_title_in_both_browsers_should_be_Auction_House() {		
		String firefoxTitle = firefox.getTitle();
		String operaTitle = opera.getTitle();
		
		assertEquals("Auction House", firefoxTitle);
		assertEquals(firefoxTitle, operaTitle);
	}

}
