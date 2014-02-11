package util;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.junit.Assert.*;

public class AssertUtils {
	public static <T> void assertListEquals(List<T> expectedData, Collection<T> toEqual) {
		assertArrayEquals(expectedData.toArray(), toEqual.toArray());
	}
	
//	public static <T> void assertCon
	
    public static <T> List<T> getList(T ...data) {
    	List<T> list = new ArrayList<T>();
    	
    	for(T d : data) {
    		list.add(d);
    	}
    	
    	return list;
    }
}
