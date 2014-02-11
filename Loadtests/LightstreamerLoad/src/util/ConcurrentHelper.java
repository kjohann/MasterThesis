package util;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentHelper {
	public static<T> List<T> getListFromConcHashMap(ConcurrentHashMap<Integer, T> map) {
		List<T> values = new ArrayList<T>();
		for(int i = 0; i < map.size(); i++) {
			values.add(map.get(i));
		}
		
		return values;
	}
}
