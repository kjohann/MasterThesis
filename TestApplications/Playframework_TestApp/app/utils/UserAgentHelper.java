package utils;

public class UserAgentHelper {
	public static boolean hasWebSockets(String useragent) {
		return useragent.contains("Chrome") || useragent.contains("Firefox") 
				|| useragent.contains("MSIE 10") || useragent.contains("Opera");
	}
}
