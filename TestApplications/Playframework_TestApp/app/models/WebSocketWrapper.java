package models;

import org.codehaus.jackson.JsonNode;

import play.mvc.WebSocket;

public class WebSocketWrapper implements Socket {
	private WebSocket.Out<JsonNode> channel;
	
	public WebSocketWrapper(WebSocket.Out<JsonNode> channel) {
		this.channel = channel;
	}
}
