package models;

import java.sql.Timestamp;

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
	
	public Login newLogin(User user, String cid) {
		return new Login(user, cid);
	}
	
	public AllItems newAllItems(String cid) {
		return new AllItems(cid);
	}
	
	public Register newRegister(String cid, String Firstname, String Lastname, String Adress, String Username, String Password) {
		User user = new User(Username, Password, Firstname, Lastname, Adress);
		return new Register(cid, user);
	}
	
	public AddItem newAddItem(String cid, String name, String description, int price, int addedByID, Timestamp expires) {
		Item item = new Item(name, description, expires, price, addedByID);
		return new AddItem(cid, item);
	}
	
	public RemoveItem newRemoveItem(String cid, int itemno) {
		return new RemoveItem(cid, itemno);
	}
	
	public PlaceBid newPlaceBid(String cid, int itemno, int value, String username, int userId) {
		return new PlaceBid(cid, value, itemno, username, userId);
	}
	
	public ViewBids newViewBids(String cid, int userId) {
		return new ViewBids(cid, userId);
	}
	
	public class WebSocketJoin {
		final String userId;
        final WebSocket.Out<JsonNode> channel;
        
        public WebSocketJoin(String userId, WebSocket.Out<JsonNode> channel) {
            this.userId = userId;
            this.channel = channel;
        }
	}
	
	public class Login {
		final User user;
		final String cid;
		
		public Login(User user, String cid) {
			this.user = user;
			this.cid = cid;
		}
	}
	
	public class AllItems {
		final String cid;
		
		public AllItems(String cid) {
			this.cid = cid;
		}
	}
	
	public class Register {
		final String cid;
		final User user;
		
		public Register(String cid, User user) {
			this.cid = cid;
			this.user = user;
		}
	}
	
	public class AddItem {
		final String cid;
		final Item item;
		
		public AddItem(String cid, Item item) {
			this.cid = cid;
			this.item = item;
		}
	}
	
	public class RemoveItem {
		final String cid;
		final int itemno;
		
		public RemoveItem(String cid, int itemno) {
			this.cid = cid;
			this.itemno = itemno;
		}
	}
	
	public class PlaceBid {
		final String cid, username;
		final int value, itemno, userId;
		
		public PlaceBid(String cid, int value, int itemno, String username, int userId) {
			this.cid = cid;
			this.value = value;
			this.itemno = itemno;
			this.username = username;
			this.userId = userId;
		}
	}
	
	public class ViewBids {
		final String cid;
		final int userId;
		
		public ViewBids(String cid, int userId) {
			this.cid = cid;
			this.userId = userId;
		}
	}
}
