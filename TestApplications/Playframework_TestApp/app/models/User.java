package models;

import play.db.ebean.*;
import javax.persistence.*;

@Entity
public class User extends Model{
	@Id
	@Column(name="UserID")
	private int UserID;
	@Column(name="Username")
	private String Username;
	@Column(name="Password")
	private String Password;
	@Column(name="Firstname")
	private String Firstname;
	@Column(name="Lastname")
	private String Lastname;
	@Column(name="Adress")
	private String Adress;
		
	public User(String username, String password, String firstname, String lastname, String adress) {
		Username = username;
		Password = password;
		Firstname = firstname;
		Lastname = lastname;
		Adress = adress;
	}
	
	public static Finder<Long,User> find = new Finder<Long,User>(Long.class, User.class);

	public static User logIn(String username, String password) {
		if(username == null || password == null) {
			return null;
		}
		return find.where().eq("Username", username).eq("Password", password).findUnique();
	}
	
	public int getUserID() {
		return UserID;
	}
	public String getUsername() {
		return Username;
	}
	public String getPassword() {
		return Password;
	}
	public String getFirstname() {
		return Firstname;
	}
	public String getLastname() {
		return Lastname;
	}
	public String getAdress() {
		return Adress;
	}
	public void setUserID(int userID) {
		UserID = userID;
	}
	public void setUsername(String username) {
		Username = username;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public void setFirstname(String firstname) {
		Firstname = firstname;
	}
	public void setLastname(String lastname) {
		Lastname = lastname;
	}
	public void setAdress(String adress) {
		Adress = adress;
	}				
}
