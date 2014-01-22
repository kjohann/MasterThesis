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
	
	public boolean handleInputAndValidate(LauncherWindow mainFrame) {
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
		
		if(!validateStringFields(serverUrl, framework, chartUrl, transport, typeOfTest)) {
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
	
	public void closeBrowsers() {
		for(FirefoxBrowser browser : browsers) {
			browser.close();
		}
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
	
	private void launchBrowsers() {
		int numberOfBrowsers = InputOutputUtil.getIntValue(nrOfBrowsers);
		
		for(int i = 0; i < numberOfBrowsers; i++) {
			FirefoxBrowser browser = new FirefoxBrowser();
			browser.navigate(serverUrl);
			
			browsers.add(browser);
		}
	}
}
