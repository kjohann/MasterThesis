package database.connector;

import java.sql.Date;
import java.util.ArrayList;

/**
 * @author Kristian
 * A class used for representing the rows of a sql SELECT query result.
 */
public class Row {
	public ArrayList<Field> fields;

	public Row()
	{
		this.fields = new ArrayList<Field>();
	}

	/**
	 * @return A String of the form:
	 * Field1: field1data Field2: field2data ... Fieldn: fieldndata
	 */
	public String prettyPrint() {
		StringBuilder output = new StringBuilder();
		for (Field f : this.fields) {
			output.append(f.name + ": ");
			String string = f.getFieldAsString();
			if (string != null) {
				output.append(string + " ");
			} else {
				Integer i = f.getFieldAsInt();
				if (i != null) {
					output.append(i + " ");
				} else {
					Date date = f.getFieldAsDate();
					if (date != null)
						output.append(date.toString() + " ");
					else {
						output.append("corrupted data!");
					}
				}
			}
		}

		return output.toString();
	}

	/**
	 * @param f The Field to add to the Row
	 */
	public void addField(Field f) {
		this.fields.add(f);
	}
	
	/**
	 * @param fieldname The name of the field to get.
	 * @return The corresponding Field. The data can then be extracted through corresponding methods.
	 */
	public Field getField(String fieldname) {
		for(Field f : fields) {
			if(f.name.equals(fieldname)) {
				return f;
			}
		}
		return null;
	}
}