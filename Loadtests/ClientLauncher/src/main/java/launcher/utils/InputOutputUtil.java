package launcher.utils;

import javax.swing.JComboBox;
import javax.swing.JTextField;

public class InputOutputUtil {	
	public static String getValueFromTextField(JTextField field) {
		return field.getText();		
	}
	
	public static String getSelectedValueFromComboBox(JComboBox box) {
		return box.getSelectedItem().toString();
	}
	
	public static boolean validateString(String value) {
		return value != null && !value.isEmpty();
	}
	
	public static boolean validateInteger(String value) {
		Integer val = getIntValue(value);
		return val != null && val > 0;
	}
	
	public static Integer getIntValue(String value) {
		try {
			return Integer.parseInt(value);
		} catch(NumberFormatException e) {
			return null;
		}
	}
}
