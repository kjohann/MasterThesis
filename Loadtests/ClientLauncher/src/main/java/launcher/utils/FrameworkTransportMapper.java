package launcher.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class FrameworkTransportMapper {
	private static HashMap<String, List<String>> availableTransports;
	
	public FrameworkTransportMapper() {
		availableTransports = new HashMap<>();
	}
	
	public void addFramework(String name, String ...transports) {
		for(String transport : transports) {
			addTransportToFramework(name, transport);
		}
	}	
	
	public static boolean isAvailable(String framework, String transport) {
		if(availableTransports == null) {
			throw new IllegalStateException("Need to initialize class first");			
		}
		
		if(!availableTransports.containsKey(framework)) {
			return true;
		}
		
		for(String t : availableTransports.get(framework)) {
			if(t.equals(transport)) {
				return true;
			}
		}
		
		return false;
	}
	
	private void addTransportToFramework(String name, String transport) {
		if(availableTransports.get(name) == null) {
			availableTransports.put(name, new ArrayList<String>());
		} 
		
		availableTransports.get(name).add(transport);
	}
} 
