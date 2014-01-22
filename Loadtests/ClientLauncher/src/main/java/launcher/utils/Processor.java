package launcher.utils;

import launcher.gui.LauncherWindow;

public class Processor {
	public boolean handleInputAndValidate(LauncherWindow mainFrame) {
		String serverUrl = InputOutputUtil.getValueFromTextField(mainFrame.txtServerUrl);
		String nrOfBrowsers = InputOutputUtil.getValueFromTextField(mainFrame.txtNumberOfBrowsers);
		String framework = InputOutputUtil.getSelectedValueFromComboBox(mainFrame.ddmFramework);
		String chartUrl = InputOutputUtil.getValueFromTextField(mainFrame.txtChartUrl);
		String transport = InputOutputUtil.getValueFromTextField(mainFrame.txtTransport);
		String spacing = InputOutputUtil.getValueFromTextField(mainFrame.txtSpacing);
		String numberOfClientsInBrowser = InputOutputUtil.getValueFromTextField(mainFrame.txtNumClientsInBrowser);
		String totalNumberOfClients = InputOutputUtil.getValueFromTextField(mainFrame.txtNumberOfClientsTotal);
		String numberOfMessagesPrClient = InputOutputUtil.getValueFromTextField(mainFrame.txtNumMessagesClient);
		String connectionInterval = InputOutputUtil.getValueFromTextField(mainFrame.txtConnInterval);
		String typeOfTest = InputOutputUtil.getSelectedValueFromComboBox(mainFrame.ddmTestType);
		String messageInterval = InputOutputUtil.getValueFromTextField(mainFrame.txtMessageInterval);
		
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
		
		return true;
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
}
