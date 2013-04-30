package controllers;

import models.actors.AuctionHouse;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.*;
import play.libs.Comet;
import play.libs.Json;
import play.mvc.*;

import views.html.*;
import utils.*;

public class Application extends Controller {
	//private ActorRef auctionHouse = AuctionHouse.getInstance();	//need?
	
    public static Result index() {
    	boolean hasWS = UserAgentHelper.hasWebSockets(request().headers().get("User-Agent")[0]); 
        return ok(index.render(hasWS));
    }
    
    public static WebSocket<JsonNode> wsAuction() {
    	final long cid = ctx().id();
    	return new WebSocket<JsonNode>() {
			@Override
			public void onReady(WebSocket.In<JsonNode> in, WebSocket.Out<JsonNode> out) {
				try {
					AuctionHouse.webSocketJoin(String.valueOf(cid), in, out); 
				} catch(Exception e) {
					e.printStackTrace();
				}
			}    		
    	};
    }
    
    public static Result cometAuction() {
    	final long cid = ctx().id();
        return ok(new Comet("parent.onmessage") {  
        	@Override
        	public void onConnected() {
        		try {
        			AuctionHouse.cometJoin(String.valueOf(cid), this);
        		} catch (Exception e) {
        			e.printStackTrace();
        		}
            } 
        });   	
    }
    
    public static Result cometMessage() {
    	JsonNode event = request().body().asJson();
    	if(event == null) {
    		return badRequest("Expecting json data");
    	} else {
    		AuctionHouse.onCometMessage(event);
    	}
    	ObjectNode responseJson = Json.newObject();
    	responseJson.put("success", true);
    	return ok(responseJson);
    }
  
}
