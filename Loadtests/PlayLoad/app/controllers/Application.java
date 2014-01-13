package controllers;

import java.io.IOException;

import hubs.LoadHub;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.ObjectNode;

import play.*;
import play.libs.F.Callback;
import play.libs.F.Callback0;
import play.libs.Json;
import play.mvc.*;

import views.html.*;
import models.*;
import util.JSONHelper;

public class Application extends Controller {	
   private static final LoadHub _loadHub = new LoadHub();
   private static final Monitor _monitor = Monitor.getInstance();
	
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
				
				_loadHub.members.put(cid, socket);
				
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
    
    public static void routeMessage(JsonNode event) throws JsonParseException, JsonMappingException, IOException {
    	JSONHelper helper = new JSONHelper(event);
    	String messageKind = helper.getMessageKind();
    	String cid = helper.getCid();    	
    	ArrayNode data = helper.getArrayNode("data");
    	if(messageKind.equals("initTest")) {
    		String testToRun = JSONHelper.getValueAt(0, data).asText();
    		int numberOfClients = JSONHelper.getValueAt(1, data).asInt();
    		int spacing = JSONHelper.getValueAt(2, data).asInt();
    		long startTime = JSONHelper.getValueAt(3, data).asLong();
    		_loadHub.initTest(testToRun, numberOfClients, spacing, startTime);
    		ObjectNode response = Json.newObject();
			response.put("messageKind", "initTest");
			response.put("testToRun", testToRun);
    		sendToAll(response);
    	} else if(messageKind.equals("echo")) {
    		Socket socket = _loadHub.members.get(cid);
    		ObjectNode node = (ObjectNode)JSONHelper.getValueAt(0, data);
    		Message message = JSONHelper.getObject(node, Message.class);
    		_loadHub.echo(message);
    		ObjectNode response = Json.newObject();
    		response.put("messageKind", "receiveMessage");
    		response.put("data", JSONHelper.writeObjectToJson(message));
    		socket.sendMessage(response);
    	} else if(messageKind.equals("broadcast")) {
    		ObjectNode node = (ObjectNode)JSONHelper.getValueAt(0, data);
    		Message message = JSONHelper.getObject(node, Message.class);
    		_loadHub.broadcast(message);
    		ObjectNode response = Json.newObject();
    		response.put("messageKind", "receiveMessage");
    		response.put("data", JSONHelper.writeObjectToJson(message));
    		sendToAll(response);
    	} else if(messageKind.equals("complete")) {
    		String clientId = JSONHelper.getValueAt(0, data).asText();
			if(_loadHub.complete(clientId)) {
				ObjectNode response = Json.newObject();
	    		response.put("messageKind", "harvest");
				sendToAll(response);
			}
    	} else if(messageKind.equals("getData")) {
    		ObjectNode node = (ObjectNode)JSONHelper.getValueAt(0, data);
    		TestDataEntity testData = JSONHelper.getObject(node, TestDataEntity.class);
    		int numberOfClientsInBrowser = JSONHelper.getValueAt(1, data).asInt();
    		if(_loadHub.getData(testData, numberOfClientsInBrowser)){
    			ObjectNode response = Json.newObject();
    			response.put("messageKind", "harvestComplete");
    			
    			ObjectNode dataObj = Json.newObject();
    			dataObj.put("Duration", _monitor.duration);
    			dataObj.put("StartTime", _monitor.startTime);
    			dataObj.put("SentFromClientEvents", JSONHelper.writeListToJson(_monitor.sentFromClientEvents));
    			dataObj.put("ReceivedAtServerEvents", JSONHelper.writeListToJson(_monitor.receivedAtServerEvents));
    			dataObj.put("SentFromServerEvents", JSONHelper.writeListToJson(_monitor.sentFromServerEvents));
    			dataObj.put("Spacing", _monitor.spacing);
    			dataObj.put("TestDataEntities", JSONHelper.writeListToJson(_monitor.testDataEntities));    			
    			
    			response.put("data", dataObj);
    			
    			sendToAll(response);
    		}
    	}
    }
    
    private static void sendToAll(ObjectNode event) {
    	for(Socket s : _loadHub.members.values()) {
			s.sendMessage(event);
		}
    }
  
}
