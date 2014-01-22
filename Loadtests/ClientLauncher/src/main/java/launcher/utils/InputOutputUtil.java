package launcher.utils;

import javax.swing.JComboBox;
import javax.swing.JTextField;

public class InputOutputUtil {
	public static Integer getIntValue(String value) {
		try {
			return Integer.parseInt(value);
		} catch(NumberFormatException e) {
			return null;
		}
	}
	
	public static String getValueFromTextField(JTextField field) {
		return field.getText();		
	}
	
	public static String getSelectedValueFromComboBox(JComboBox box) {
		return box.getSelectedItem().toString();
	}
}
