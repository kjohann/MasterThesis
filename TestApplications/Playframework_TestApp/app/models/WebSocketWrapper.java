package models;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.libs.Json;
import play.mvc.WebSocket;

public class WebSocketWrapper implements Socket {
	private WebSocket.Out<JsonNode> channel;
	
	public WebSocketWrapper(WebSocket.Out<JsonNode> channel) {
		this.channel = channel;
	}

	@Override
	public void sendConnectionId(String cid) {		
		ObjectNode event = Json.newObject();
		event.put("message", "cid");
		event.put("cid", cid);
		channel.write(event);
	}
}
