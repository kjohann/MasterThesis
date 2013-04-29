package controllers;

import models.*;

import org.codehaus.jackson.JsonNode;

import akka.actor.ActorRef;

import play.*;
import play.libs.Comet;
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
    
    public static Result cometMessage(String json) {
    	return ok();
    }
  
}
