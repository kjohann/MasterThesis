using System;
using System.Collections.Generic;
using System.Linq;
using SignalR_Testapp.Models;

namespace SignalR_Testapp.Database
{
    public class Dataprovider : IDataprovider
    {
        auctionhouseEntities db = new auctionhouseEntities();
        public User verifyLogin(string username, string password)
        {

            List<User> users = (from u in db.user
                                where u.Username.Equals(username) &&
                                u.Password.Equals(password)
                                select new User
                                {
                                    userID = u.UserID,
                                    username = u.Username,
                                    firstname = u.Firstname,
                                    lastname = u.Lastname,
                                    adress = u.Adress,
                                    password = u.Password
                                }).ToList();
            return users.Count > 1 ? null : users.FirstOrDefault();
        }

        public IEnumerable<PrettyItem> getAllItems()
        {
            return from i in db.item
                   join b in db.bid on i.itemno equals b.itemno
                   join u in db.user on b.userID equals u.UserID
                   join x in 
                       ( 
                            from bi in db.bid
                            group bi by bi.itemno into g
                            select new {itemno = g.Key, max = g.Max(y => y.value)}
                       ) 
                   on b.itemno equals x.itemno
                   where b.value == x.max
                   select new PrettyItem
                   {
                       itemno = b.itemno,
                       highestBidder = u.Username,
                       name = i.name,
                       price = i.price,
                       expires = i.expires,
                       description = i.description,
                       bid = b.value,
                       addedByID = i.addedByID
                   };                   
        }

        public IEnumerable<ViewBid> getUsersBids(long userID)
        {
            return from i in db.item
                   join b in db.bid on i.itemno equals b.itemno
                   join u in db.user on b.userID equals u.UserID
                   join x in
                       (
                            from bi in db.bid
                            group bi by bi.itemno into g
                            select new { itemno = g.Key, max = g.Max(y => y.value) }
                       )
                   on b.itemno equals x.itemno
                   where b.value == x.max && u.UserID == userID && b.value != 0
                   select new ViewBid
                   {
                       itemno = b.itemno,
                       name = i.name,
                       value = b.value
                   };
        }
    }
}