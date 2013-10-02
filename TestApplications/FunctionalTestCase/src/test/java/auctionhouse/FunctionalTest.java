package auctionhouse;

import static org.junit.Assert.*;

import javax.swing.JOptionPane;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.junit.Test;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class FunctionalTest {
	private static String url = "";
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
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Test
	public void test() {
		assertEquals("localhost:80/test/", url);
	}

}
