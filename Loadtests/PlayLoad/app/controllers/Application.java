package controllers;

import hubs.LoadHub;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.*;
import play.libs.F.Callback;
import play.libs.F.Callback0;
import play.libs.Json;
import play.mvc.*;

import views.html.*;
import models.*;

public class Application extends Controller {	
   private static final LoadHub _loadHub = new LoadHub();
	
	public static Result index() {
    	return ok(index.render("Your new application is ready."));
    }
    
    public static WebSocket<JsonNode> wsConnect() {
    	final String cid = String.valueOf(ctx().id());
    	return new WebSocket<JsonNode>() {

			@Override
			public void onReady(WebSocket.In<JsonNode> in, WebSocket.Out<JsonNode> out) {
				WSocket socket = new WSocket();
				socket.channel = out;
				
				ObjectNode event = Json.newObject();
				event.put("messageKind", "cid");
				event.put("cid", cid);
				socket.sendMessage(event);
				
				in.onMessage(new Callback<JsonNode>() {
					
					@Override
					public void invoke(JsonNode event) throws Throwable {
						routeMessage(event);
						
					}
				});
				
				in.onClose(new Callback0() {
					
					@Override
					public void invoke() throws Throwable {
						_loadHub.members.remove(cid);						
					}
				});
			}
    		
    	};
    }      
    
    public static void routeMessage(JsonNode event) {
    	String messageKind = event.get("messageKind").asText();
    	String cid = event.get("cid").asText();
    	Socket socket = _loadHub.members.get(cid);
    	if(messageKind.equals("initTest")) {
//    		_loadHub.initTest(testTorRun, numberOfClients, spacing, startTime);
//    		socket.sendMessage(response);
    	} else if(messageKind.equals("echo")) {
//    		_loadHub.echo(message);
//    		socket.sendMessage(response);
    	} else if(messageKind.equals("broadcast")) {
//    		_loadHub.echo(message);
//    		socket.sendMessage(response);
    	} else if(messageKind.equals("complete")) {
//    		_loadHub.complete(clientId);
//    		socket.sendMessage(response);
    	} else if(messageKind.equals("getData")) {
//    		_loadHub.getData(testData, numberOfClientsInBrowser);
//    		socket.sendMessage(response);
    	}
    }
  
}
