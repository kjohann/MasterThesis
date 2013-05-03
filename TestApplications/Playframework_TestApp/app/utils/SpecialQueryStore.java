package utils;

public class SpecialQueryStore {
	public static String getBidsByUserQuery(int userId) {
	    String query = "SELECT b.itemno, b.value, i.name " +
                "FROM item i " +
                "INNER JOIN bid b " +
                "ON b.itemno = i.itemno " +
                "INNER JOIN user u " +
                "ON b.userID = u.userID " +
                "INNER JOIN " +
                "(" +
                "SELECT bid.itemno, MAX(value) AS max " +
                "FROM bid " +
                "GROUP BY bid.itemno " +
                ") x " +
                "ON b.itemno = x.itemno AND " +
                "b.value = x.max " +
                "WHERE u.userID = " + userId + " AND b.value != " + 0 + ";";
	    return query;
	}
	
	public static String getAllItemsQuery(){
		 String query = "SELECT u.username as highestbidder, b.itemno, i.name, i.price, i.expires as expiredate, i.description, b.value as bid, i.addedByID " +
			        "FROM item i " +
			        "INNER JOIN bid b " +
			        "ON b.itemno = i.itemno " +
			        "INNER JOIN user u " +
			        "ON b.userID = u.userID " +
			        "INNER JOIN " +
			        "(" +
			        "SELECT bid.itemno, MAX(value) AS max " +
			        "FROM bid " +
			        "GROUP BY bid.itemno " +
			        ") x " +
			        "ON b.itemno = x.itemno AND " +
			        "b.value = x.max";
		 return query;
	}
}
