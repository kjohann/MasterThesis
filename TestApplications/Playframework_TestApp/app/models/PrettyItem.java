package models;

import java.sql.Timestamp;
import java.util.*;

import javax.persistence.*;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.RawSql;
import com.avaje.ebean.RawSqlBuilder;
import com.avaje.ebean.annotation.Sql;
import play.db.ebean.Model;
import utils.SpecialQueryStore;

@Entity
@Sql
public class PrettyItem extends Model {
	private String name, description, highestBidder;
	private int price, bid, addedByID, itemno;
	private Timestamp expires;
		
	public PrettyItem(String name, String description, String highestBidder, int price, int bid, int addedByID, int itemno, Timestamp expires) {
		this.name = name;
		this.description = description;
		this.highestBidder = highestBidder;
		this.price = price;
		this.bid = bid;
		this.addedByID = addedByID;
		this.itemno = itemno;
		this.expires = expires;
	}
	
	public static List<PrettyItem> findAll() {
		String sql = SpecialQueryStore.getAllItemsQuery();
		RawSql rawSql = RawSqlBuilder.parse(sql).columnMapping("u.username", "highestBidder")
				.columnMapping("b.itemno", "itemno").columnMapping("i.name", "name")
				.columnMapping("i.price", "price").columnMapping("i.expires", "expires")
				.columnMapping("i.description", "description").columnMapping("b.value", "bid")
				.columnMapping("i.addedByID", "addedByID").create();
		
		com.avaje.ebean.Query<PrettyItem> query = Ebean.find(PrettyItem.class); 
		query.setRawSql(rawSql);
		
		List<PrettyItem> items = query.findList();
		return items;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public String getHighestBidder() {
		return highestBidder;
	}

	public int getPrice() {
		return price;
	}

	public int getBid() {
		return bid;
	}

	public int getAddedByID() {
		return addedByID;
	}

	public int getItemno() {
		return itemno;
	}

	public Timestamp getExpires() {
		return expires;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setHighestBidder(String highestBidder) {
		this.highestBidder = highestBidder;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public void setBid(int bid) {
		this.bid = bid;
	}

	public void setAddedByID(int addedByID) {
		this.addedByID = addedByID;
	}

	public void setItemno(int itemno) {
		this.itemno = itemno;
	}

	public void setExpires(Timestamp expires) {
		this.expires = expires;
	}
}
