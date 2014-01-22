package launcher.gui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;

import javax.swing.JFrame;

public class EventListener implements ActionListener  {
	private JFrame mainFrame;
	
	public EventListener(JFrame mainFrame) {
		this.mainFrame = mainFrame;
	}
	
	@Override
	public void actionPerformed(ActionEvent event) {
		if(event.getActionCommand() == "Start") {
			
		} else if(event.getActionCommand() == "Reset fields") {
			
		}
	}
}
