package utils;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;
import play.mvc.WebSocket;

public class WebSocketWrapper extends Socket {
	private WebSocket.Out<JsonNode> channel;
	
	public WebSocketWrapper(WebSocket.Out<JsonNode> channel) {
		this.channel = channel;
	}

	@Override
	public void sendMessage(ObjectNode event) {		
		channel.write(event);
	}


}
