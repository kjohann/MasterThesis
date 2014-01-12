package util;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.ObjectNode;
import org.junit.*;

import play.libs.Json;
import static org.junit.Assert.*;
import static util.AssertUtils.*;

import util.JSONHelper;

public class JSONHelperTest {
	private JSONHelper _helper;
			
	@Test
	public void getMessageKind_should_return_the_messageKind_field() {
		ObjectNode event = Json.newObject();
		event.put("messageKind", "test");
		
		_helper = new JSONHelper(event);
		
		assertEquals("test", _helper.getMessageKind());
	}
	
	@Test(expected=IllegalArgumentException.class)
	public void getMessageKind_should_throw_IllegalArgumentException_if_messageKind_field_is_not_present() {		
		_helper = new JSONHelper(Json.newObject());
		
		_helper.getMessageKind();
	}
	
	@Test
	public void getCid_should_return_the_cid_field() {
		ObjectNode event = Json.newObject();
		event.put("cid", "test");
		
		_helper = new JSONHelper(event);
		
		assertEquals("test", _helper.getCid());
	}
	
	@Test(expected=IllegalArgumentException.class)
	public void getCid_should_throw_IllegalArgumentException_if_cid_field_is_not_present() {		
		_helper = new JSONHelper(Json.newObject());
		
		_helper.getCid();
	}
	
	@Test
	public void getArrayNode_should_return_the_specified_field_as_an_ArrayNode() {
		JsonFactory factory = new JsonFactory();
		ObjectMapper om = new ObjectMapper(factory);
		ArrayNode arrayNode = om.createArrayNode();
		arrayNode.add("string1"); arrayNode.add(1); arrayNode.add(2); arrayNode.add(100L);
		
		ObjectNode event = Json.newObject();
		event.put("array", arrayNode);
		
		_helper = new JSONHelper(event);
		
		ArrayNode node = _helper.getArrayNode("array");
		
		assertEquals(arrayNode, node);
	}
	
	@Test(expected=IllegalArgumentException.class)
	public void getArrayNode_should_throw_IllegalArgumentException_if_the_specified_field_is_not_present() {		
		_helper = new JSONHelper(Json.newObject());
		
		_helper.getArrayNode("noooo");
	}
	
	@Test(expected=IllegalArgumentException.class)
	public void getArrayNode_should_throw_IllegalArgumentException_if_the_specified_field_is_not_an_array() {
		ObjectNode event = Json.newObject();
		event.put("messageKind", "test");
		
		_helper = new JSONHelper(event);
		
		_helper.getArrayNode("messageKind");
	}
	
	@Test
	public void getValueAt_should_return_the_value_at_the_specified_index_from_the_provided_ArrayNode() {
		JsonFactory factory = new JsonFactory();
		ObjectMapper om = new ObjectMapper(factory);
		ArrayNode arrayNode = om.createArrayNode();
		arrayNode.add("string1"); arrayNode.add(1); arrayNode.add(2); arrayNode.add(100L);
		
		JsonNode node = JSONHelper.getValueAt(0, arrayNode);
		
		assertEquals("string1", node.asText());
	}
	
	@Test(expected=ArrayIndexOutOfBoundsException.class)
	public void getValueAt_should_throw_ArrayIndexOutOfBoundsException_if_the_index_is_out_of_bounds() {
		JsonFactory factory = new JsonFactory();
		ObjectMapper om = new ObjectMapper(factory);
		ArrayNode arrayNode = om.createArrayNode();
		arrayNode.add("string1"); arrayNode.add(1); arrayNode.add(2); arrayNode.add(100L);
		
		JSONHelper.getValueAt(42, arrayNode);
	}
	
}
