package models;

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
public class ViewBid extends Model {
	private String name;
	private int itemno, value;
	
	public ViewBid(String name, int itemno, int value) {
		this.name = name;
		this.itemno = itemno;
		this.value = value;
	}

	public static List<ViewBid> get(int userId) {
		String sql = SpecialQueryStore.getBidsByUserQuery(userId);
		RawSql rawSql = RawSqlBuilder.parse(sql).columnMapping("b.itemno", "itemno")
				.columnMapping("b.value", "value").columnMapping("i.name", "name").create();
		
		com.avaje.ebean.Query<ViewBid> query = Ebean.find(ViewBid.class);
		query.setRawSql(rawSql);
		return query.findList();
	}
	
	public String getName() {
		return name;
	}

	public int getItemno() {
		return itemno;
	}

	public int getValue() {
		return value;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setItemno(int itemno) {
		this.itemno = itemno;
	}

	public void setValue(int value) {
		this.value = value;
	}		
}
