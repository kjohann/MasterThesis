package util;

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
	
}
