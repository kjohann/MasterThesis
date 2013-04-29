package models;

import models.MessageFactory.*;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.libs.Akka;
import play.libs.Comet;
import play.libs.Json;
import play.libs.F.*;
import play.mvc.WebSocket;
import akka.actor.*;
import scala.concurrent.*;
import scala.concurrent.duration.*;
import sun.security.jgss.LoginConfigImpl;
import static akka.pattern.Patterns.ask;

import java.sql.Timestamp;
import java.util.*;

public class AuctionHouse extends UntypedActor {
	
	public static ActorRef instance = Akka.system().actorOf(new Props(AuctionHouse.class));
	private static MessageFactory messages = MessageFactory.getInstance();		
	Map<String, Socket> members = new HashMap<String, Socket>();
	
	public static void cometJoin(String cid, Comet socket) throws Exception {
		CometJoin join = messages.newCometJoin(cid, socket);
		
		String result = (String)Await.result(ask(instance, join, 1000), Duration.create(1, java.util.concurrent.TimeUnit.SECONDS));
		
		if(result.equalsIgnoreCase("ok")) {
			
		}
	}
	
	public static void webSocketJoin(String userId, WebSocket.In<JsonNode> in, WebSocket.Out<JsonNode> out) throws Exception {
		WebSocketJoin join = messages.newWSJoin(userId, out);
		
		String result = (String)Await.result(ask(instance, join, 1000), Duration.create(1, java.util.concurrent.TimeUnit.SECONDS));
		
		if(result.equalsIgnoreCase("ok")) {
            in.onMessage(new Callback<JsonNode>() {
               public void invoke(JsonNode event) {
            	   String type = event.get("type").asText();
            	   if(type.equalsIgnoreCase("login")) {
            		   String username = event.get("username").asText();
            		   String password = event.get("password").asText();
            		   User user = User.logIn(username, password);
            		   String cid = event.get("cid").asText();
            		   Login login = messages.newLogin(user, cid);
            		   instance.tell(login, instance);
            		   
            	   } else if(type.equalsIgnoreCase("allItems")) {
            		   String cid = event.get("cid").asText();
            		   AllItems allItems = messages.newAllItems(cid);
            		   instance.tell(allItems, instance);
            	   } else if(type.equalsIgnoreCase("register")) {
            		   String cid = event.get("cid").asText();
            		   String Username = event.get("username").asText(),
            				  Firstname = event.get("firstname").asText(),
            				  Lastname = event.get("lastname").asText(),
            				  Adress = event.get("adress").asText(),
            				  Password = event.get("password").asText();
            		   Register register = messages.newRegister(cid, Firstname, Lastname, Adress, Username, Password);
            		   instance.tell(register, instance);
            	   } else if(type.equalsIgnoreCase("addItem")) {
            		   String cid = event.get("cid").asText();
            		   String name = event.get("name").asText(),
            				  description = event.get("description").asText();
            		   int price = event.get("price").asInt(),
            			   addedByID = event.get("addedByID").asInt();
            		   Timestamp expires = new Timestamp(event.get("expires").asLong());
            		   AddItem addItem = messages.newAddItem(cid, name, description, price, addedByID, expires);
            		   instance.tell(addItem, instance);            		   
            	   } else if(type.equalsIgnoreCase("removeItem")) {
            		   String cid = event.get("cid").asText();
            		   int itemno = event.get("itemno").asInt();
            		   RemoveItem removeItem = messages.newRemoveItem(cid, itemno);
            		   instance.tell(removeItem, instance);
            	   } else if(type.equalsIgnoreCase("placeBid")) {
            		   String cid = event.get("cid").asText();
            		   int itemno = event.get("itemno").asInt();
            		   int value = event.get("value").asInt();
            		   int userID = event.get("userId").asInt();
            		   String username = event.get("username").asText();
            		   PlaceBid placeBid = messages.newPlaceBid(cid, itemno, value, username, userID);
            		   instance.tell(placeBid, instance);
            	   } else if(type.equalsIgnoreCase("viewBids")) {
            		   String cid = event.get("cid").asText();
            		   int userId = event.get("userId").asInt();
            		   ViewBids viewBids = messages.newViewBids(cid, userId);
            		   instance.tell(viewBids, instance);
            	   }
               } 
            });
            
            in.onClose(new Callback0() {
               public void invoke() {                                    
                   
               }
            });
			
		} else {
            ObjectNode error = Json.newObject();
            error.put("error", result);           
            out.write(error);
		}
	}	
	
	public void onReceive(Object message) {
		if(message instanceof WebSocketJoin) {
			WebSocketJoin join = (WebSocketJoin) message;
			if(!members.containsKey(join.userId)) {
				WebSocketWrapper socket = new WebSocketWrapper(join.channel);
				members.put(join.userId, socket);
				socket.sendConnectionId(join.userId);
				getSender().tell("ok", getSender());
			}
		} else if(message instanceof CometJoin){
			CometJoin join = (CometJoin) message;
			if(!members.containsKey(join.cid)) {
				CometWrapper socket = new CometWrapper(join.channel);
				members.put(join.cid, socket);
				socket.sendConnectionId(join.cid);
				getSender().tell("ok", getSender());
			}
		}else if(message instanceof Login) {
			Login login = (Login) message; 
			Socket socket = members.get(login.cid);
			socket.sendLogInResponse(login.user);
		} else if(message instanceof AllItems) {
			AllItems allItems = (AllItems) message;
			Socket socket = members.get(allItems.cid);
			socket.sendAllItemsResponse();
		} else if(message instanceof Register) {
			Register register = (Register) message;
			Socket socket = members.get(register.cid);
			socket.registerUser(register.user);
		} else if(message instanceof AddItem) {
			AddItem addItem = (AddItem) message;			
			if(addItem.item.add()) {
				for(Socket socket : members.values()) {
					socket.sendNewItem(addItem.item);
				}
			}
		} else if(message instanceof RemoveItem) {
			RemoveItem removeItem = (RemoveItem) message;
			Item.remove(removeItem.itemno);
			for(Socket socket : members.values()) {
				socket.sendDeleteItem(removeItem.itemno);
			}
		} else if(message instanceof PlaceBid) {
			PlaceBid placeBid = (PlaceBid) message;
			Bid bid = new Bid(placeBid.itemno, placeBid.userId, placeBid.value, placeBid.username);
			if(bid.add()) {
				for(Socket socket : members.values()) {
					socket.sendPlaceBid(bid);
				}
			}			
		} else if(message instanceof ViewBids) {
			ViewBids viewbids = (ViewBids) message;
			Socket socket = members.get(viewbids.cid);
			socket.sendViewBids(viewbids.userId);
		}
	}
}
