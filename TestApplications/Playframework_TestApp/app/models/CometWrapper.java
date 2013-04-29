package models;

import org.codehaus.jackson.node.ObjectNode;

import play.libs.Comet;
import play.libs.Json;
import utils.JsonProvider;

public class CometWrapper implements Socket {
	private Comet channel;
	
	public CometWrapper(Comet channel) {
		this.channel = channel;
	}
	@Override
	public void sendConnectionId(String cid) {
		ObjectNode event = JsonProvider.getConnectionIdJson(cid);
		channel.sendMessage(event);
	}

	@Override
	public boolean sendLogInResponse(User user) {
		ObjectNode event = JsonProvider.getLoginJson(user);
		if(event != null) {			
			channel.sendMessage(event);
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
			channel.sendMessage(event);
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
			channel.sendMessage(event);
			return true;
		} else {
			channel.sendMessage(event);
			System.err.println("Error registering new user");
			return false;
		}
	}

	@Override
	public void sendNewItem(Item item) {
		ObjectNode event = JsonProvider.getNewItemJson(item);
		channel.sendMessage(event);
	}

	@Override
	public void sendDeleteItem(int itemno) {
		ObjectNode event = JsonProvider.getDeleteItemJson(itemno);
		channel.sendMessage(event);
	}

	@Override
	public void sendPlaceBid(Bid bid) {
		ObjectNode event = JsonProvider.getPlaceBidJson(bid);
		channel.sendMessage(event);		
	}

	@Override
	public boolean sendViewBids(int userId) {
		ObjectNode event = JsonProvider.getViewBidsJson(userId);
		if(event != null) {
			channel.sendMessage(event);
			return true;
		} else {
			System.err.println("Error getting viewBids");
			return false;
		}
	}

}
