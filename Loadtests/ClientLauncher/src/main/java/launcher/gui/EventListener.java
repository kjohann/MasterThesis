package launcher.gui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import launcher.utils.InputOutputUtil;
import launcher.utils.Processor;

public class EventListener implements ActionListener, KeyListener  {
	private LauncherWindow mainFrame;
	private Processor processor;
	
	public EventListener(LauncherWindow mainFrame) {
		this.mainFrame = mainFrame;
		processor = new Processor();		
	}
	
	@Override
	public void actionPerformed(ActionEvent event) {
		if(event.getActionCommand() == "Start") {						
			mainFrame.lblValidationSummary.setText("");
			try {
				if(!processor.handleInputAndValidate(mainFrame)) {
					mainFrame.lblValidationSummary.setText("One or more fields has errors - check transports!");
				}
			} catch (InterruptedException e) {
				System.err.println("An exception occured while launching..\n" + e.getMessage());
			}
		} else if(event.getActionCommand() == "Reset fields") {
			resetFields();
		} else if(event.getActionCommand() == "Close browsers") {
			processor.closeBrowsers();
		}
	}

	@Override
	public void keyPressed(KeyEvent e) {
		
	}

	@Override
	public void keyReleased(KeyEvent e) {
		String numberOfBrowsers = mainFrame.txtNumberOfBrowsers.getText();
		String numberOfClientsInBrowser = mainFrame.txtNumClientsInBrowser.getText();
		if(numberOfBrowsers.isEmpty() || 
				numberOfClientsInBrowser.isEmpty()) {
			mainFrame.txtNumberOfClientsTotal.setText("");
			return;
		}
		
		Integer nrOfBrowsers = InputOutputUtil.getIntValue(numberOfBrowsers);
		Integer nrOfClientsPrBrowser = InputOutputUtil.getIntValue(numberOfClientsInBrowser);
		
		if(nrOfBrowsers == null || nrOfClientsPrBrowser == null) {
			mainFrame.txtNumberOfClientsTotal.setText("");
			return;
		}
		
		mainFrame.txtNumberOfClientsTotal.setText(String.valueOf(nrOfBrowsers * nrOfClientsPrBrowser));		
	}

	@Override
	public void keyTyped(KeyEvent e) {
		
	}
	
	private void resetFields() {
		mainFrame.txtServerUrl.setText("http://");
		mainFrame.txtNumberOfBrowsers.setText("");
		mainFrame.txtTransport.setText("");
		mainFrame.txtSpacing.setText("");
		mainFrame.txtNumClientsInBrowser.setText("");
		mainFrame.txtNumberOfClientsTotal.setText("");
		mainFrame.txtNumMessagesClient.setText("");
		mainFrame.txtConnInterval.setText("");
		mainFrame.txtMessageInterval.setText("");
		mainFrame.ddmFramework.setSelectedIndex(0);
		mainFrame.ddmTestType.setSelectedIndex(0);
	}
}
