package launcher.utils;

import java.util.ArrayList;
import java.util.List;

import launcher.gui.LauncherWindow;

public class Processor {
	private List<FirefoxBrowser> browsers;
	private String serverUrl, nrOfBrowsers, framework, chartUrl, transport,
	spacing, numberOfClientsInBrowser, totalNumberOfClients, numberOfMessagesPrClient,
	connectionInterval, typeOfTest, messageInterval;
	
	public Processor() {
		browsers = new ArrayList<>();
	}
	
	public boolean handleInputAndValidate(LauncherWindow mainFrame) throws InterruptedException {
		serverUrl = InputOutputUtil.getValueFromTextField(mainFrame.txtServerUrl);
		nrOfBrowsers = InputOutputUtil.getValueFromTextField(mainFrame.txtNumberOfBrowsers);
		framework = InputOutputUtil.getSelectedValueFromComboBox(mainFrame.ddmFramework);
		chartUrl = InputOutputUtil.getValueFromTextField(mainFrame.txtChartUrl);
		transport = InputOutputUtil.getValueFromTextField(mainFrame.txtTransport);
		spacing = InputOutputUtil.getValueFromTextField(mainFrame.txtSpacing);
		numberOfClientsInBrowser = InputOutputUtil.getValueFromTextField(mainFrame.txtNumClientsInBrowser);
		totalNumberOfClients = InputOutputUtil.getValueFromTextField(mainFrame.txtNumberOfClientsTotal);
		numberOfMessagesPrClient = InputOutputUtil.getValueFromTextField(mainFrame.txtNumMessagesClient);
		connectionInterval = InputOutputUtil.getValueFromTextField(mainFrame.txtConnInterval);
		typeOfTest = InputOutputUtil.getSelectedValueFromComboBox(mainFrame.ddmTestType);
		messageInterval = InputOutputUtil.getValueFromTextField(mainFrame.txtMessageInterval);
		
		if(!validateStringFields(serverUrl, framework, chartUrl, typeOfTest)) {
			return false;
		} 
		
		if(!validateIntegerFields(nrOfBrowsers, spacing, numberOfClientsInBrowser, totalNumberOfClients, numberOfMessagesPrClient, 
				connectionInterval, messageInterval)) {
			return false;
		}
		
		if(!FrameworkTransportMapper.isAvailable(framework, transport)) {
			return false;
		}				
		
		launchBrowsers();
		
		return true;
	}
	
	public void clearBrowsers() {
		for(FirefoxBrowser browser : browsers) {
			browser.close();
		}
		
		browsers.removeAll(browsers);
		System.out.println(browsers.size());
	}
	
	private boolean validateStringFields(String ...fields) {
		for(String f : fields) {
			if(!InputOutputUtil.validateString(f)) {
				return false;
			}
		}
		
		return true;
	}
	
	private boolean validateIntegerFields(String ...fields) {
		for(String f : fields) {
			if(!InputOutputUtil.validateInteger((f))) {
				return false;
			}
		}
		
		return true;
	}
	
	private void launchBrowsers() throws InterruptedException {
		int numberOfBrowsers = InputOutputUtil.getIntValue(nrOfBrowsers);
		System.out.println(numberOfBrowsers);
		for(int i = 0; i < numberOfBrowsers; i++) {
			FirefoxBrowser browser = new FirefoxBrowser();
			browser.navigate(serverUrl);
			browser.setChartAPIUrl(chartUrl);
			browser.setTransport(transport);
			browser.setSpacing(spacing);
			browser.setBrowserId(getBrowserId(i));
			browser.setTotalNumberOfClients(totalNumberOfClients);
			browser.setNumberOfClientsInBrowser(numberOfClientsInBrowser);
			browser.setConnectionInterval(connectionInterval);
			browser.setNumberOfMessagesPrClient(numberOfMessagesPrClient);
			browser.setMessageInterval(messageInterval);
			browser.setTestType(typeOfTest.toLowerCase());
			if(i == 0) {
				browser.makeMaster();
			}

			browser.clickInitTest();
			
			browsers.add(browser);
			
			Thread.sleep(getSleepTime());
		}
	}
	
	private String getBrowserId(int currentIndex) {
		int numberOfClientsPrBrowser = InputOutputUtil.getIntValue(numberOfClientsInBrowser);
		
		int id = (numberOfClientsPrBrowser * currentIndex) + 1;
		return String.valueOf(id);
	}
	
	private int getSleepTime() {
		int connInterval = InputOutputUtil.getIntValue(connectionInterval);
		int numberOfClientsPrBrowser = InputOutputUtil.getIntValue(numberOfClientsInBrowser);
		
		return connInterval * numberOfClientsPrBrowser;
	}
}
