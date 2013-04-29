package models;

import java.sql.Timestamp;
import java.util.List;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
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

	@Override
	public boolean sendAllItemsResponse() {
		List<PrettyItem> items = PrettyItem.findAll();
		if(items != null && items.size() > 0) {
			ObjectNode event = Json.newObject();
			event.put("message", "allItems");
			JsonFactory factory = new JsonFactory();
			ObjectMapper om = new ObjectMapper(factory);
			ArrayNode itemsNode = om.createArrayNode();
			for(PrettyItem item : items) {
				ObjectNode itemNode = Json.newObject();
				//(String name, String description, String highestBidder, int price, int bid, int addedByID, int itemno, Timestamp expires
				itemNode.put("name", item.getName());
				itemNode.put("description", item.getDescription());
				itemNode.put("highestBidder", item.getHighestBidder());
				itemNode.put("minPrice", item.getPrice());
				itemNode.put("bid", item.getBid());
				itemNode.put("addedByID", item.getAddedByID());
				itemNode.put("itemno", item.getItemno());
				itemNode.put("expires", item.getExpires().getTime());
				itemsNode.add(itemNode);
			}
			event.put("items", itemsNode);
			channel.write(event);
			return true;
		} else {
			System.err.println("Error logging in");
			return false;
		}
		
	}
}
