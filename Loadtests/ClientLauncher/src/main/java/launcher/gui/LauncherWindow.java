package launcher.gui;

import java.awt.*;
import java.nio.ByteOrder;

import javax.swing.SpringLayout;

public class LauncherWindow extends Frame{
	private EventListener listener;
	
	public LauncherWindow() {
		super("Client launcher");
		listener = new EventListener();
		setLayout(new BorderLayout());		
		
		Panel northPanel = getPanel(new GridLayout(6, 1), new Color(100,100,100));
		
		northPanel.add(getLabel("Available transports by framework:", true, 18));
		northPanel.add(getLabel("SignalR: webSockets, serverSentEvents, foreverFrame, longPolling", false, 14));
		northPanel.add(getLabel("Socket.IO: (Server only): websocket, htmlfile, xhr-polling, jsonp-polling", false, 14));
		northPanel.add(getLabel("Play: websocket, comet", false, 14));
		northPanel.add(getLabel("Lightstreamer: WS-STREAMING, HTTP-STREAMING, WS-POLLING, HTTP-POLLING", false, 14));
		northPanel.add(getLabel("SockJS: websocket, xhr-streaming, xhr-polling", false, 14));
		
		add(northPanel, BorderLayout.NORTH);
		
		Panel centerPanel = getPanel(new BorderLayout(), Color.RED);
		centerPanel.add(getLabel("Settings:", true, 16), BorderLayout.NORTH);
		
		Panel centerWestPanel = getPanel(new SpringLayout(), Color.GREEN);
		TextField numberOfBrowsersField = new TextField(2);
		centerWestPanel.add(getLabel("Number of browsers:", false, 14));
		centerWestPanel.add(numberOfBrowsersField);
		
		centerPanel.add(centerWestPanel, BorderLayout.CENTER);
		
		add(centerPanel, BorderLayout.CENTER);
		
		
		addWindowListener(listener);
		setSize(600, 600);		
		setVisible(true);
	}
	
	private Label getLabel(String text, boolean bold, int size) {
		Label l = new Label(text, Label.LEFT);
		int type = bold ? Font.BOLD : Font.PLAIN;
		l.setFont(new Font("Arial", type, size));
		return l;
	}
	
	private Panel getPanel(LayoutManager layout, Color c) {
		Panel p = new Panel();
		p.setLayout(layout);
		p.setBackground(c);
		return p;
	}
}
