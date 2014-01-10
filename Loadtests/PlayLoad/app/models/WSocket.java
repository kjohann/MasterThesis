package models;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.mvc.WebSocket;

public class WSocket implements Socket {
	
	public WebSocket.Out<JsonNode> channel;		

	@Override
	public void sendMessage(ObjectNode event) {
		// TODO Auto-generated method stub
		
	}

}
