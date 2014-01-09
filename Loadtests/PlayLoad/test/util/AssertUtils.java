package util;
import java.util.List;
import static org.junit.Assert.*;

public class AssertUtils {
	public static <T> void assertListEquals(List<T> expected, List<T> toEqual) {
		assertArrayEquals(expected.toArray(), toEqual.toArray());
	}
}
