package util;
import java.util.List;
import static org.junit.Assert.*;

public class AssertUtils {
	public static <T> void assertListEquals(List<T> expectedData, List<T> toEqual) {
		assertArrayEquals(expectedData.toArray(), toEqual.toArray());
	}
}
