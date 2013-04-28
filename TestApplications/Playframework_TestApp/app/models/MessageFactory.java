package models;

import play.mvc.*;
import org.codehaus.jackson.JsonNode;

public class MessageFactory {
	private static MessageFactory instance;
	
	private MessageFactory() {}
	
	public static MessageFactory getInstance() {
		if(instance == null) {
			instance = new MessageFactory();
		}
		return instance;
	}
	
	public WebSocketJoin newWSJoin(String userId, WebSocket.Out<JsonNode> channel) {
		return new WebSocketJoin(userId, channel);
	}
	
	public class WebSocketJoin {
		final String userId;
        final WebSocket.Out<JsonNode> channel;
        
        public WebSocketJoin(String userId, WebSocket.Out<JsonNode> channel) {
            this.userId = userId;
            this.channel = channel;
        }
	}

}
