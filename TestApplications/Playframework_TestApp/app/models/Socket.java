package models;

public interface Socket {
	public abstract void sendConnectionId(String cid);
	public abstract boolean sendLogInResponse(User user);
	public abstract boolean sendAllItemsResponse();
	public abstract boolean registerUser(User user);
	public abstract void sendNewItem(Item item);
	public abstract void sendDeleteItem(int itemno);

}