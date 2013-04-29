package utils;

import java.util.List;

import models.*;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.ObjectNode;

import play.libs.Json;

public class JsonProvider {
	public static ObjectNode getConnectionIdJson(String cid) {
		ObjectNode event = Json.newObject();
		event.put("message", "cid");
		event.put("cid", cid);
		return event;
	}
	
	public static ObjectNode getLoginJson(User user) {
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
			return event;
		}
		return null;
	}
	
	public static ObjectNode getAllItemsJson() {
		List<PrettyItem> items = PrettyItem.findAll();
		if(items != null && items.size() > 0) {
			ObjectNode event = Json.newObject();
			event.put("message", "allItems");
			JsonFactory factory = new JsonFactory();
			ObjectMapper om = new ObjectMapper(factory);
			ArrayNode itemsNode = om.createArrayNode();
			for(PrettyItem item : items) {
				ObjectNode itemNode = Json.newObject();				
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
			return event;
		}
		return null;
	}
	
	public static ObjectNode getRegisterJson(User user) {
		user.save();
		ObjectNode event = Json.newObject();
		event.put("message", "register");
		if(user.getUserID() > 0) {
			event.put("success", true);
			return event;
		} else {
			event.put("success", false);
			System.err.println("Error registering new user");
			return event;
		}
	}
	
	public static ObjectNode getNewItemJson(Item item) {
		PrettyItem prettyItem = new PrettyItem(item.getName(), item.getDescription(), item.getAddedByID().getUsername(),
				item.getPrice(), 0, item.getAddedByID().getUserID(), item.getItemno(), item.getExpires());
		ObjectNode event = Json.newObject();
		event.put("message", "addItem");
		ObjectNode itemNode = Json.newObject();
		itemNode.put("itemno", prettyItem.getItemno());
		itemNode.put("name", prettyItem.getName());
		itemNode.put("minPrice", prettyItem.getPrice());
		itemNode.put("description", prettyItem.getDescription());
		itemNode.put("expires", prettyItem.getExpires().getTime());
		itemNode.put("addedByID", prettyItem.getAddedByID());
		itemNode.put("highestBidder", prettyItem.getHighestBidder());
		itemNode.put("bid", prettyItem.getBid());
		event.put("item", itemNode);
		
		return event;
	}
	
	public static ObjectNode getDeleteItemJson(int itemno) {
		ObjectNode event = Json.newObject();
		event.put("message", "removeItem");
		event.put("itemno", itemno);
		return event;
	}
	
	public static ObjectNode getPlaceBidJson(Bid bid) {
		ObjectNode event = Json.newObject();
		event.put("message", "placeBid");
		event.put("itemno", bid.getItemno().getItemno());
		event.put("value", bid.getValue());
		event.put("username", bid.getUsername());
		return event;
	}
	
	public static ObjectNode getViewBidsJson(int userId) {
		List<ViewBid> viewBids = ViewBid.get(userId);
		if(viewBids != null && viewBids.size() > 0) {
			ObjectNode event = Json.newObject();
			event.put("message", "viewBids");
			JsonFactory factory = new JsonFactory();
			ObjectMapper om = new ObjectMapper(factory);
			ArrayNode viewBidsNode = om.createArrayNode();
			for(ViewBid bid : viewBids) {
				ObjectNode bidNode = Json.newObject();
				bidNode.put("name", bid.getName());
				bidNode.put("itemno", bid.getItemno());
				bidNode.put("value", bid.getValue());
				viewBidsNode.add(bidNode);
			}
			event.put("bids", viewBidsNode);
			return event;
		}
		return null;
	}

}
