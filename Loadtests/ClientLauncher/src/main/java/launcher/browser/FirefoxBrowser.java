package launcher.browser;

import java.util.List;

import launcher.utils.FrameworkTransportMapper;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class FirefoxBrowser {
	private static WebDriver firefox;
	
	public FirefoxBrowser() {
		firefox = new FirefoxDriver();
	}
	
	public void setChartAPIUrl(String url) {
		if(url != null) {
			fill(find(By.id("chartAPIInput")), url);
		}
	}
	
	public void setTransport(String framework, String transport) {
		if(FrameworkTransportMapper.isAvailable(framework, transport)) {
			fill(find(By.id("transports")), transport);
		}
	}
	
	private WebElement find(By criteria) {
		return firefox.findElement(criteria);
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
}
