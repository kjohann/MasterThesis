package models;

import models.MessageFactory.*;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.libs.Akka;
import play.libs.Json;
import play.libs.F.*;
import play.mvc.WebSocket;
import akka.actor.*;
import scala.concurrent.*;
import scala.concurrent.duration.*;
import static akka.pattern.Patterns.ask;
import java.util.*;

public class AuctionHouse extends UntypedActor {
	
	private static ActorRef instance = Akka.system().actorOf(new Props(AuctionHouse.class));
	private static MessageFactory messages = MessageFactory.getInstance();
	
	public static ActorRef getInstance() { //remove?
		if(instance == null) {
			instance = Akka.system().actorOf(new Props(AuctionHouse.class));
		}		
		return instance;
	}
	
	public static void webSocketJoin(String userId, WebSocket.In<JsonNode> in, WebSocket.Out<JsonNode> out) throws Exception{
		WebSocketJoin join = messages.newWSJoin(userId, out);
		
		String result = (String)Await.result(ask(instance, join, 1000), Duration.create(1, java.util.concurrent.TimeUnit.SECONDS));
		
		if(result.equalsIgnoreCase("ok")) {
            in.onMessage(new Callback<JsonNode>() {
               public void invoke(JsonNode event) {
            	   //Handle different messages: Login, Register, Additem, Place Bid, Get bids, Remove item
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
	
	Map<String, Socket> members = new HashMap<String, Socket>();
	
	public void onReceive(Object message) {
		WebSocketJoin join = (WebSocketJoin) message;
		if(message instanceof WebSocketJoin) {
			if(!members.containsKey(join.userId)) {
				WebSocketWrapper socket = new WebSocketWrapper(join.channel);
				members.put(join.userId, socket);
				socket.sendConnectionId(join.userId);
				getSender().tell("ok", getSender());
			}
		}
	}
}
