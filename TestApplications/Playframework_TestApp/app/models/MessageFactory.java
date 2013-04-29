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

}
