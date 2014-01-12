package util;

import java.util.Iterator;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ArrayNode;

public class JSONHelper {
	private JsonNode event;
	
	public JSONHelper(JsonNode event) {
		this.event = event;
	}
	
	public String getMessageKind() {
		JsonNode kind = event.get("messageKind");
		if(kind == null) {
			throw new IllegalArgumentException("No messageKind present in JSON");
		}
		
		return kind.asText();
	}
	
	public String getCid() {
		JsonNode kind = event.get("cid");
		if(kind == null) {
			throw new IllegalArgumentException("No cid present in JSON");
		}
		
		return kind.asText();
	}
	
	public ArrayNode getArrayNode(String key) {
		JsonNode kind = event.get(key);
		if(kind == null) {
			throw new IllegalArgumentException(key + "is not present in JSON");
		} else if(!kind.isArray()) {
			throw new IllegalArgumentException(key + "is not an array");
		}
		
		return (ArrayNode) kind;
		
	}
	
	public static JsonNode getValueAt(int index, ArrayNode node) {
		int count = 0;
		
		Iterator<JsonNode> iterator = node.getElements();
		
		while(iterator.hasNext()) {
			JsonNode next = iterator.next();
			if(count++ == index) {
				return next;
			}
		}
		
		throw new ArrayIndexOutOfBoundsException("The index  " + index + " is not present in the ArrayNode");
	}
}
