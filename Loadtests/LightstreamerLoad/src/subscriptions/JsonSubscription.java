package subscriptions;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.node.ArrayNode;

import subscriptions.listeners.JsonSubscriptionListener;
import util.JSONHelper;

public class JsonSubscription {
	private final ExecutorService executor;
	private JsonSubscriptionListener listener;
	
	public JsonSubscription() {
		executor = Executors.newCachedThreadPool(); //test vs newSingleThreadExecutor()?
	}
	
	public synchronized void routeMessage(String json) throws JsonProcessingException, IOException {
		JsonNode event = JSONHelper.getJsonNodeFromJson(json);
		JSONHelper helper = new JSONHelper(event);		
    	String messageKind = helper.getMessageKind();
    	String cid = helper.getCid();    
    	ArrayNode data = helper.getArrayNode("data");
    	
    	//route message to listener -> listener calls hub --> sends response
	}
	
	public synchronized void setListener(JsonSubscriptionListener listener) {
		this.listener = listener;
	}
}
