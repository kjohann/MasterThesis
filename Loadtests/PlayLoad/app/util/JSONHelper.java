package util;

import org.codehaus.jackson.JsonNode;

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
}
