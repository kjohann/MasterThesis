package util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import models.Message;
import models.TestDataEntity;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.JsonNodeFactory;
import org.codehaus.jackson.node.ObjectNode;
import org.junit.*;

import static org.junit.Assert.*;
import util.JSONHelper;

public class JSONHelperTest {
	private JSONHelper _helper;
			
	@Test
	public void getMessageKind_should_return_the_messageKind_field() {
		ObjectNode event = new ObjectNode(JsonNodeFactory.instance);
		event.put("messageKind", "test");
		
		_helper = new JSONHelper(event);
		
		assertEquals("test", _helper.getMessageKind());
	}
	
	@Test(expected=IllegalArgumentException.class)
	public void getMessageKind_should_throw_IllegalArgumentException_if_messageKind_field_is_not_present() {		
		_helper = new JSONHelper(new ObjectNode(JsonNodeFactory.instance));
		
		_helper.getMessageKind();
	}
	
	@Test
	public void getCid_should_return_the_cid_field() {
		ObjectNode event = new ObjectNode(JsonNodeFactory.instance);
		event.put("cid", "test");
		
		_helper = new JSONHelper(event);
		
		assertEquals("test", _helper.getCid());
	}
	
	@Test(expected=IllegalArgumentException.class)
	public void getCid_should_throw_IllegalArgumentException_if_cid_field_is_not_present() {		
		_helper = new JSONHelper(new ObjectNode(JsonNodeFactory.instance));
		
		_helper.getCid();
	}
	
	@Test
	public void getArrayNode_should_return_the_specified_field_as_an_ArrayNode() {
		JsonFactory factory = new JsonFactory();
		ObjectMapper om = new ObjectMapper(factory);
		ArrayNode arrayNode = om.createArrayNode();
		arrayNode.add("string1"); arrayNode.add(1); arrayNode.add(2); arrayNode.add(100L);
		
		ObjectNode event = new ObjectNode(JsonNodeFactory.instance);
		event.put("array", arrayNode);
		
		_helper = new JSONHelper(event);
		
		ArrayNode node = _helper.getArrayNode("array");
		
		assertEquals(arrayNode, node);
	}
	
	@Test(expected=IllegalArgumentException.class)
	public void getArrayNode_should_throw_IllegalArgumentException_if_the_specified_field_is_not_present() {		
		_helper = new JSONHelper(new ObjectNode(JsonNodeFactory.instance));
		
		_helper.getArrayNode("noooo");
	}
	
	@Test(expected=IllegalArgumentException.class)
	public void getArrayNode_should_throw_IllegalArgumentException_if_the_specified_field_is_not_an_array() {
		ObjectNode event = new ObjectNode(JsonNodeFactory.instance);;
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
	
	@Test
	public void getObject_should_get_the_object_instance_from_the_provided_JsonNode() throws JsonParseException, JsonMappingException, IOException {
		ObjectNode event =new ObjectNode(JsonNodeFactory.instance);
		Message input = new Message(1, 1, "1337", "1", "c:1m:2");
		input.Key = 1;
		event.put("SentFromClient", input.SentFromClient);
		event.put("ReceivedAtServer", input.ReceivedAtServer);
		event.put("ReceivedAtClient", input.ReceivedAtClient);
		event.put("Payload", input.Payload);
		event.put("ClientId", input.ClientId);
		event.put("MessageId", input.MessageId);
		event.put("Key", input.Key);
		
		Message message = JSONHelper.getObject(event, Message.class);
		
		assertTrue(input.equals(message));
	}
	
	@Test
	public void getObject_should_get_the_object_instance_from_the_provided_JsonNode_also_with_some_fields_not_specified() throws JsonParseException, JsonMappingException, IOException {
		ObjectNode event = new ObjectNode(JsonNodeFactory.instance);
		Message input = new Message(1, 1, "1337", "1", "c:1m:2");
		event.put("SentFromClient", input.SentFromClient);
		event.put("ReceivedAtServer", input.ReceivedAtServer);
		event.put("Payload", input.Payload);
		event.put("ClientId", input.ClientId);
		event.put("MessageId", input.MessageId);
		
		Message message = JSONHelper.getObject(event, Message.class);
		
		assertTrue(input.equals(message));
	}
	
	@Test
	public void getObject_should_get_the_object_instance_from_the_provided_JsonNode_when_the_instance_has_an_ArrayList_prop() throws JsonParseException, JsonMappingException, IOException {
		ObjectNode event = new ObjectNode(JsonNodeFactory.instance);
		
		JsonFactory factory = new JsonFactory();
		ObjectMapper om = new ObjectMapper(factory);
		ArrayNode arrayNode = om.createArrayNode();
		arrayNode.add(100); arrayNode.add(100); arrayNode.add(100);
		
		event.put("LatencyData", arrayNode);
		
		TestDataEntity entity = new TestDataEntity();
		entity.LatencyData.add(100); entity.LatencyData.add(100); entity.LatencyData.add(100);
		
		TestDataEntity output = JSONHelper.getObject(event, TestDataEntity.class);		
		
		assertTrue(entity.equals(output));		
	}
	
	@Test
	public void writeObjectToJson_should_write_a_message_to_an_ObjectNode() throws JsonGenerationException, JsonMappingException, IOException {
		Message message = new Message(1, 1, "test", "1", "c:1m:100");
		ObjectNode event = new ObjectNode(JsonNodeFactory.instance);
		
		event.put("SentFromClient", message.SentFromClient);
		event.put("ReceivedAtServer", message.ReceivedAtServer);
		event.put("ReceivedAtClient", message.ReceivedAtClient);
		event.put("Payload", message.Payload);
		event.put("ClientId", message.ClientId);
		event.put("MessageId", message.MessageId);
		event.put("Key", message.Key);
		
		JsonNode node = JSONHelper.writeObjectToJson(message);
		
		assertEquals(event, node);
	}
	
	@Test
	public void writeObjectToJson_should_write_a_TestDataEntity_to_an_ObjectNode() throws JsonGenerationException, JsonMappingException, IOException {
		ObjectNode event = new ObjectNode(JsonNodeFactory.instance);
		
		JsonFactory factory = new JsonFactory();
		ObjectMapper om = new ObjectMapper(factory);
		ArrayNode arrayNode = om.createArrayNode();
		arrayNode.add(100); arrayNode.add(100); arrayNode.add(100);
		
		event.put("LatencyData", arrayNode);
		
		TestDataEntity entity = new TestDataEntity();
		entity.LatencyData.add(100); entity.LatencyData.add(100); entity.LatencyData.add(100);
		
		JsonNode node = JSONHelper.writeObjectToJson(entity); 
		
		assertEquals(event, node);
	}
	
	@Test
	public void writeConcListToJson_should_be_able_to_handle_a_list_of_integers() throws JsonGenerationException, JsonMappingException, IOException {
		JsonFactory factory = new JsonFactory();
		ObjectMapper om = new ObjectMapper(factory);
		ArrayNode arrayNode = om.createArrayNode();
		arrayNode.add(100); arrayNode.add(100); arrayNode.add(100);
		
		BlockingQueue<Integer> list = new LinkedBlockingQueue<>();
		list.add(100); list.add(100); list.add(100);
		
		ArrayNode node = JSONHelper.writeConcListToJson(list); 
		
		assertEquals(arrayNode, node);
	}
	
	@Test
	public void writeConcListToJson_should_be_able_to_handle_a_list_of_TestDataEntities() throws JsonGenerationException, JsonMappingException, IOException {
		JsonFactory factory = new JsonFactory();
		ObjectMapper om = new ObjectMapper(factory);
		ArrayNode arrayNode = om.createArrayNode();
		TestDataEntity entity1 = new TestDataEntity(); entity1.LatencyData.add(42); entity1.LatencyData.add(1337);
		arrayNode.add(JSONHelper.writeObjectToJson(entity1));
		TestDataEntity entity2 = new TestDataEntity(); entity2.LatencyData.add(101); entity2.LatencyData.add(1990);
		arrayNode.add(JSONHelper.writeObjectToJson(entity2));
		
		BlockingQueue<TestDataEntity> entities = new LinkedBlockingQueue<TestDataEntity>();
		entities.add(entity1); entities.add(entity2);
		
		ArrayNode node = JSONHelper.writeConcListToJson(entities);
		
		assertEquals(arrayNode, node);		
	}
	
	@Test
	public void getJsonNodeFromJson_should_be_able_to_retrieve_json_as_JsonNode() throws JsonProcessingException, IOException {
		ObjectNode event = new ObjectNode(JsonNodeFactory.instance);
		ObjectNode subNode = new ObjectNode(JsonNodeFactory.instance);
		subNode.put("sub", "SubZero");
		event.put("test1", 1337);
		event.put("subObj", subNode);
		
		String json = event.toString();
		
		ObjectNode node = (ObjectNode)JSONHelper.getJsonNodeFromJson(json);
		
		assertEquals(event, node);
	}
}
	