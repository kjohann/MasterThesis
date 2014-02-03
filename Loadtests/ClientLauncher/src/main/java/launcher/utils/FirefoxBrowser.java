package launcher.utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class FirefoxBrowser {
	private static WebDriver firefox;
	
	public FirefoxBrowser() {
		System.out.println("Starting browser!");
		firefox = new FirefoxDriver();
	}
	
	public void navigate(String url) {
		firefox.navigate().to(url);
	}
	
	public void close() {
		firefox.quit();
	}
	
	public void setChartAPIUrl(String url) {
		fill(find(By.id("chartAPIInput")), url);
	}
	
	public void setTransport(String transport) {
		WebElement el = find(By.id("transports"));
		if(!el.getTagName().equals("label")) {
			fill(el, transport);
		}
	}
	
	public void setSpacing(String spacing) {
		fill(find(By.id("spacing")), spacing);		
	}
	
	public void setBrowserId(String id) {
		fill(find(By.id("instanceId")), id);		
	}
	
	public void setTotalNumberOfClients(String number) {
		fill(find(By.id("totalClients")), number);
	}
		
	public void setNumberOfClientsInBrowser(String number) {
		fill(find(By.id("clientsBrowser")), number);
	}
	
	public void setConnectionInterval(String interval) {
		fill(find(By.id("connInterval")), interval);
	}
	
	public void setNumberOfMessagesPrClient(String number) {
		fill(find(By.id("msgs")), number);
	}
	
	public void setMessageInterval(String interval) {
		fill(find(By.id("msgInterval")), interval);
	}
	
	public void setTestType(String type) {
		Select typeSelect = new Select(find(By.id("type")));
		typeSelect.selectByValue(type);
	}
	
	public void makeMaster() {
		find(By.id("masterBtn")).click();
	}
	
	public void clickInitTest() {
		find(By.id("connect")).click();
	}
	
	private WebElement find(By criteria) {
		return firefox.findElement(criteria);
	}	
	
	private void fill(WebElement element, String with) {
		element.clear();
		element.sendKeys(with);
	}
}
