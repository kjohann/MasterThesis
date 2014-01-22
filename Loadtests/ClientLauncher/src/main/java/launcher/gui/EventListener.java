package launcher.gui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import launcher.utils.Processor;

public class EventListener implements ActionListener  {
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
}
