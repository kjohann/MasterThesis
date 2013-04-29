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

	@Override
	public boolean sendLogInResponse(User user) {
		if(user != null) {
			ObjectNode event = Json.newObject();
			event.put("message", "login");
			ObjectNode userNode = Json.newObject();
			userNode.put("userID", user.getUserID());
			userNode.put("username", user.getUsername());
			userNode.put("firstname", user.getFirstname());
			userNode.put("lastname", user.getLastname());
			userNode.put("adress", user.getAdress());
			//Password not needed by client..
			event.put("user", userNode);
			channel.write(event);
			return true;
		}
		else {
			System.err.println("Error logging in");
			return false;
		}
		
	}
}
