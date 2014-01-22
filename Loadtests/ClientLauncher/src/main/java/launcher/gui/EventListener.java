package launcher.gui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;

import javax.swing.JFrame;

import launcher.utils.InputOutputUtil;

public class EventListener implements ActionListener  {
	private LauncherWindow mainFrame;
	
	public EventListener(LauncherWindow mainFrame) {
		this.mainFrame = mainFrame;
	}
	
	@Override
	public void actionPerformed(ActionEvent event) {
		if(event.getActionCommand() == "Start") {
			String nrOfBrowsers = InputOutputUtil.getValueFromTextField(mainFrame.txtNumberOfBrowsers);
			String framework = InputOutputUtil.getSelectedValueFromComboBox(mainFrame.ddmFramework);
			String chartUrl = InputOutputUtil.getValueFromTextField(mainFrame.txtChartUrl);
			String transport = InputOutputUtil.getValueFromTextField(mainFrame.txtTransport);
		} else if(event.getActionCommand() == "Reset fields") {
			
		}
	}
}
