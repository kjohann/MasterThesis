package views;

import org.junit.*;

import play.mvc.Content;
import static org.junit.Assert.*;
import static play.test.Helpers.*;

public class TemplateTest {
	
	@Test
	public void hasWSTest() {
		Content html = views.html.index.render(true);
		assertEquals("text/html", contentType(html));
		assertTrue(contentAsString(html).contains("wsInit.js"));
		assertTrue(contentAsString(html).contains("websocket.js"));
		assertFalse(contentAsString(html).contains("cometInit.js"));
		assertFalse(contentAsString(html).contains("comet.js"));
	}
	
	@Test
	public void noWSTest() {
		Content html = views.html.index.render(false);
		assertEquals("text/html", contentType(html));
		assertTrue(contentAsString(html).contains("cometInit.js"));
		assertTrue(contentAsString(html).contains("comet.js"));
		assertFalse(contentAsString(html).contains("wsInit.js"));
		assertFalse(contentAsString(html).contains("websocket.js"));
	}
	
	@Test
	public void hasCorrectTitle() {
		Content html = views.html.index.render(false);
		assertTrue(contentAsString(html).contains("Auction House"));
		html = views.html.index.render(true);
		assertTrue(contentAsString(html).contains("Auction House"));
	}
}
