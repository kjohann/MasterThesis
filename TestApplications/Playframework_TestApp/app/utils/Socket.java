package utils;

import org.codehaus.jackson.node.ObjectNode;
import models.*;

//TODO: make in to abstract class?
public abstract class Socket {
	public abstract void sendMessage(ObjectNode event);

	public void sendConnectionId(String cid) {		
		ObjectNode event = JsonProvider.getConnectionIdJson(cid);
		sendMessage(event);
	}

	public boolean sendLogInResponse(User user) {
		ObjectNode event = JsonProvider.getLoginJson(user);
		if(event != null) {			
			sendMessage(event);
			return true;
		}
		else {
			System.err.println("Error logging in");
			return false;
		}		
	}

	public boolean sendAllItemsResponse() {
		ObjectNode event = JsonProvider.getAllItemsJson();
		if(event != null) {			
			sendMessage(event);
			return true;
		} else {
			System.err.println("Error getting all items");
			return false;
		}		
	}

	public boolean registerUser(User user) {
		ObjectNode event = JsonProvider.getRegisterJson(user);
		if(event.get("success").asBoolean()) {
			sendMessage(event);
			return true;
		} else {
			sendMessage(event);
			System.err.println("Error registering new user");
			return false;
		}
	}

	public void sendNewItem(Item item) {
		ObjectNode event = JsonProvider.getNewItemJson(item);
		sendMessage(event);		
	}

	public void sendDeleteItem(int itemno) {
		ObjectNode event = JsonProvider.getDeleteItemJson(itemno);
		sendMessage(event);
	}

	public void sendPlaceBid(Bid bid) {
		ObjectNode event = JsonProvider.getPlaceBidJson(bid);
		sendMessage(event);		
	}

	public boolean sendViewBids(int userId) {
		ObjectNode event = JsonProvider.getViewBidsJson(userId);
		if(event != null) {
			sendMessage(event);
			return true;
		} else {
			System.err.println("Error getting viewBids");
			return false;
		}
	}
}
