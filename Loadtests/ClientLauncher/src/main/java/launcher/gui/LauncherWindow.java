package launcher.gui;

import java.awt.FlowLayout;
import java.awt.Frame;

public class LauncherWindow extends Frame{
	private EventListener listener;
	
	public LauncherWindow() {
		super("Client launcher");
		listener = new EventListener();
		
		setLayout(new FlowLayout());
		
		addWindowListener(listener);
		setSize(400, 500);		
		setVisible(true);
	}
}
