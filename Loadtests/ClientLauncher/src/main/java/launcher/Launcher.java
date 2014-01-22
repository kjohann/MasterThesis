package launcher;

import launcher.gui.LauncherWindow;
import launcher.utils.FrameworkTransportMapper;

public class Launcher {
	private static FrameworkTransportMapper mapper = new FrameworkTransportMapper();;
	
	public Launcher() {
		
	}
	
	@SuppressWarnings("unused")
	public static void main(String[] args) {		
		mapFrameworkTransports();
		LauncherWindow window = new LauncherWindow();		
	}
	
	private static void mapFrameworkTransports() {
		mapper.addFramework("SignalR", "webSockets", "serverSentEvents", "foreverFrame", "longPolling");
		mapper.addFramework("Play", "websocket", "comet");
		mapper.addFramework("Lightstreamer", "WS-STREAMING", "HTTP-STREAMING", "WS-POLLING", "HTTP-POLLING");
		mapper.addFramework("SockJS", "websocket", "xhr-streaming", "xhr-polling");
	}

}
