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
			if(!processor.handleInputAndValidate(mainFrame)) {
				mainFrame.lblValidationSummary.setText("One or more fields has errors - check transports!");
			}
		} else if(event.getActionCommand() == "Reset fields") {
			
		} else if(event.getActionCommand() == "Close browsers") {
			processor.closeBrowsers();
		}
	}

	@Override
	public void keyPressed(KeyEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void keyReleased(KeyEvent e) {
		String numberOfBrowsers = mainFrame.txtNumberOfBrowsers.getText();
		String numberOfClientsInBrowser = mainFrame.txtNumClientsInBrowser.getText();
		if(numberOfBrowsers.isEmpty() || 
				numberOfClientsInBrowser.isEmpty()) {
			return;
		}
		
		Integer nrOfBrowsers = InputOutputUtil.getIntValue(numberOfBrowsers);
		Integer nrOfClientsPrBrowser = InputOutputUtil.getIntValue(numberOfClientsInBrowser);
		
		if(nrOfBrowsers == null || nrOfClientsPrBrowser == null) return;
		
		mainFrame.txtNumberOfClientsTotal.setText(String.valueOf(nrOfBrowsers * nrOfClientsPrBrowser));		
	}

	@Override
	public void keyTyped(KeyEvent e) {
		// TODO Auto-generated method stub
		
	}
}
