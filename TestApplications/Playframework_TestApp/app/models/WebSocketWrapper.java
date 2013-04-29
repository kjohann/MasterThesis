package models;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;
import play.mvc.WebSocket;
import utils.JsonProvider;

public class WebSocketWrapper implements Socket {
	private WebSocket.Out<JsonNode> channel;
	
	public WebSocketWrapper(WebSocket.Out<JsonNode> channel) {
		this.channel = channel;
	}

	@Override
	public void sendConnectionId(String cid) {		
		ObjectNode event = JsonProvider.getConnectionIdJson(cid);
		channel.write(event);
	}

	@Override
	public boolean sendLogInResponse(User user) {
		ObjectNode event = JsonProvider.getLoginJson(user);
		if(event != null) {			
			channel.write(event);
			return true;
		}
		else {
			System.err.println("Error logging in");
			return false;
		}		
	}

	@Override
	public boolean sendAllItemsResponse() {
		ObjectNode event = JsonProvider.getAllItemsJson();
		if(event != null) {			
			channel.write(event);
			return true;
		} else {
			System.err.println("Error getting all items");
			return false;
		}		
	}

	@Override
	public boolean registerUser(User user) {
		ObjectNode event = JsonProvider.getRegisterJson(user);
		if(event.get("success").asBoolean()) {
			channel.write(event);
			return true;
		} else {
			channel.write(event);
			System.err.println("Error registering new user");
			return false;
		}
	}

	@Override
	public void sendNewItem(Item item) {
		ObjectNode event = JsonProvider.getNewItemJson(item);
		channel.write(event);		
	}

	@Override
	public void sendDeleteItem(int itemno) {
		ObjectNode event = JsonProvider.getDeleteItemJson(itemno);
		channel.write(event);
	}

	@Override
	public void sendPlaceBid(Bid bid) {
		ObjectNode event = JsonProvider.getPlaceBidJson(bid);
		channel.write(event);		
	}

	@Override
	public boolean sendViewBids(int userId) {
		ObjectNode event = JsonProvider.getViewBidsJson(userId);
		if(event != null) {
			channel.write(event);
			return true;
		} else {
			System.err.println("Error getting viewBids");
			return false;
		}
	}
}
