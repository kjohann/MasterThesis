package data.database;

public class QueryStore {
	
	private QueryStore(){
		//No need
	}
	
	public static String getVerifyLogInQuery(String username, String password){
	    String query = "SELECT * FROM auctionhouse.user " +
	            "WHERE Username = \"" + username + "\"" +
	            " AND Password = \"" + password + "\";";
	    return query;
	}
	
	public static String getBidsByUserQuery(int userId) {
	    String query = "SELECT b.itemno, b.value, i.name " +
                "FROM auctionhouse.item i " +
                "INNER JOIN auctionhouse.bid b " +
                "ON b.itemno = i.itemno " +
                "INNER JOIN auctionhouse.user u " +
                "ON b.userID = u.userID " +
                "INNER JOIN " +
                "(" +
                "SELECT bid.itemno, MAX(value) AS max " +
                "FROM auctionhouse.bid " +
                "GROUP BY bid.itemno " +
                ") x " +
                "ON b.itemno = x.itemno AND " +
                "b.value = x.max " +
                "WHERE u.userID = \"" + userId + "\" AND b.value != \"" + 0 + "\";";
	    return query;
	}
	
	public static String getPlaceBidQuery(int itemno, int userId, int value, String username){
		String query = "INSERT INTO auctionhouse.bid " +
				"(itemno, userID, value, username) VALUES (\"" + itemno + "\", \"" + userId + "\", \"" + value + "\", \"" + username + "\");";
		return query;
	}
	
	public static String getRegisterUserQuery(String username, String firstname, String lastname, String adress, String password){
	    String query = "INSERT INTO auctionhouse.user " +
	            "(Username, Firstname, Lastname, Adress, Password) "+
	            "VALUES (\"" + username + "\", \"" + firstname + "\", \"" + lastname +
	            "\", \"" + adress + "\", \"" + password + "\");";
	    return query;
	}
	
	public static String getRegisterItemQuery(String name, int price, String expires, String description, int addedByID){
		 String query = "INSERT INTO auctionhouse.item (name, price, expires, description, addedByID) " +
			        "VALUES (\"" + name + "\", \"" + price + "\", \"" + expires + "\", \"" + description + "\" , \"" + addedByID +"\");";
			    return query;
	}
	
	public static String getDeleteItemQuery(int itemno){
	    String query = "DELETE FROM auctionhouse.item " +
                "WHERE itemno = \"" + itemno + "\";";
	    return query;
	}
	
	public static String getAllItemsQuery(){
		 String query = "SELECT u.username as highestbidder, b.itemno, i.name, i.price, i.expires as expiredate, i.description, b.value as bid, i.addedByID " +
			        "FROM auctionhouse.item i " +
			        "INNER JOIN auctionhouse.bid b " +
			        "ON b.itemno = i.itemno " +
			        "INNER JOIN auctionhouse.user u " +
			        "ON b.userID = u.userID " +
			        "INNER JOIN " +
			        "(" +
			        "SELECT bid.itemno, MAX(value) AS max " +
			        "FROM auctionhouse.bid " +
			        "GROUP BY bid.itemno " +
			        ") x " +
			        "ON b.itemno = x.itemno AND " +
			        "b.value = x.max";
		 return query;
	}
	/*Not sure if I'll need these two in Java*/
	public static String getLatestBidQuery(int bidID){
		String query = "SELECT * FROM auctionhouse.bid WHERE bidID = \"" + bidID + "\";";
	    return query;
	}
	
	public static String getLatestItemQuery(String itemno, String userId, String username){
		String query = "SELECT itemno, name, price, UNIX_TIMESTAMP(expires) as expireDate, description, addedByID " +
                "FROM auctionhouse.item WHERE itemno = \"" + itemno + "\"; " +
                "INSERT INTO auctionhouse.bid " +
                "(itemno, userID, value, username) VALUES (\"" + itemno + "\", \"" + userId + "\", \"" + 0 + "\", \"" + username + "\");";
    	return query;
	}
}
