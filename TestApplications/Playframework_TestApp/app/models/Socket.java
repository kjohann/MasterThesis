package models;
//TODO: make in to abstract class?
public interface Socket {
	public abstract void sendConnectionId(String cid);
	public abstract boolean sendLogInResponse(User user);
	public abstract boolean sendAllItemsResponse();
	public abstract boolean registerUser(User user);
	public abstract void sendNewItem(Item item);
	public abstract void sendDeleteItem(int itemno);
	public abstract void sendPlaceBid(Bid bid);
	public abstract boolean sendViewBids(int userId);
}
