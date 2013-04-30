package utils;

import org.codehaus.jackson.node.ObjectNode;
import play.libs.Comet;

public class CometWrapper extends Socket {
	private Comet channel;
	
	public CometWrapper(Comet channel) {
		this.channel = channel;
	}

	@Override
	public void sendMessage(ObjectNode event) {
		channel.sendMessage(event);
	}
}
