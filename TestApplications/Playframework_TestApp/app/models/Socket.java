package models;

public interface Socket {
	public abstract void sendConnectionId(String cid);
	public abstract boolean sendLogInResponse(User user);
	public abstract boolean sendAllItemsResponse();
	public abstract boolean registerUser(User user);

}
