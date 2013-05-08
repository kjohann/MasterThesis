package pages;

import java.util.concurrent.TimeUnit;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.domain.FluentWebElement;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

import static org.fluentlenium.core.filter.FilterConstructor.withText;
import static org.junit.Assert.*;

public class IndexPage extends FluentPage {
	private String url;
	
	public IndexPage(WebDriver driver, int port) {
		super(driver);
		this.url = "http://localhost:" + port;
	}
	
	@Override
	public String getUrl() {
		return this.url;
	}
	
	@Override
	public void isAt() {
		assertEquals("Auction House", title());
	}
	
	public void canGetAllItemsTest() {
				await().atMost(5, TimeUnit.SECONDS).until(".item").hasSize().greaterThanOrEqualTo(3); 
	}
	
	public void canLogin() {
		click("a", withText("Log in"));
		fill("#log_usern").with("User1");
		fill("#log_pass").with("123");
		click("#log_in_button");
		await().atMost(5, TimeUnit.SECONDS).until("a").withText("User1").isPresent();		
	}
	
	public void canPlaceBid() {
		FluentWebElement el = findFirst(".bidButton");
		click(el);
		fill("#bid").with("7123");
		click("#place_bid_button");
		await().atMost(5, TimeUnit.SECONDS).until("span").withText("7123").isPresent();
		assertEquals(1, 1);
	}
	
}
