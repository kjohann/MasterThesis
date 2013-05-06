package test;

import java.util.concurrent.TimeUnit;

import org.fluentlenium.adapter.FluentTest;
import static org.fluentlenium.core.filter.FilterConstructor.*;
import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;
import com.lightstreamer.*;

@RunWith(JUnit4.class)
public class IntegrationTest extends FluentTest{
	@BeforeClass
	public static void setUp() {
		String arg0 = "C:/Lightstreamer/Lightstreamer/conf/lightstreamer_conf.xml";
		String [] args = new String [1]; args[0] = arg0;
		LS.main(args);		
	}
	
	@Test
	public void titleTest() {
		goTo("http://localhost:8080//AuctionHouse/View/");
		System.out.println(title());
		assertEquals("Auction House", title());
	}
	
	@Test
	public void canGetInitialItems() {
		goTo("http://localhost:8080//AuctionHouse/View/");
		await().atMost(5, TimeUnit.SECONDS).until(".item").hasSize().greaterThan(2);
	}
	
}
