package models;

import org.codehaus.jackson.node.ObjectNode;

public interface Socket {
	public void sendMessage(ObjectNode event);
}
