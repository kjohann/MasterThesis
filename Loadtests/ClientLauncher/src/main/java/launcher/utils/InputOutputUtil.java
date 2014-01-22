package launcher.utils;

public class InputOutputUtil {
	public static Integer getIntValue(String value) {
		try {
			return Integer.parseInt(value);
		} catch(NumberFormatException e) {
			return null;
		}
	}
}
