package models;

import org.codehaus.jackson.node.ObjectNode;

import play.libs.Comet;

public class CSocket implements Socket {
	public Comet channel;
	
	@Override
	public void sendMessage(ObjectNode event) {
		channel.sendMessage(event);		
	}

}
