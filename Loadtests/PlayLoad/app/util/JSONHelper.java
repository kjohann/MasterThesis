package util;

import java.io.IOException;
import java.util.Iterator;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.ObjectNode;

import play.libs.Json;

import com.avaje.ebeaninternal.server.cluster.mcast.Message;

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
	
	public static <T> T getObject(ObjectNode node, Class<T> type) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String json = node.toString();
		
		return mapper.readValue(json, type);		
	}
	
	public static <T> ObjectNode writeObjectToJson(T toWrite) throws JsonGenerationException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(toWrite, ObjectNode.class);		
	}
	
}
