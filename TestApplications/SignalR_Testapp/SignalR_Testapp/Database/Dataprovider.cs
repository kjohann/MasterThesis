using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using SignalR_Testapp.Models;

namespace SignalR_Testapp.Database
{
    public class Dataprovider : IDataprovider
    {
        private readonly auctionhouseEntities _db = new auctionhouseEntities(); 
        public User VerifyLogin(string username, string password)
        {

            var users = (_db.user.Where(u => u.Username.Equals(username) &&
                                            u.Password.Equals(password)).Select(u => new User
                                                {
                                                    userID = u.UserID,
                                                    username = u.Username,
                                                    firstname = u.Firstname,
                                                    lastname = u.Lastname,
                                                    adress = u.Adress,
                                                    password = u.Password
                                                })).ToList();
            return users.Count > 1 ? null : users.FirstOrDefault();
        }

        public IEnumerable<PrettyItem> GetAllItems()
        {
            return from i in _db.item
                   join b in _db.bid on i.itemno equals b.itemno
                   join u in _db.user on b.userID equals u.UserID
                   join x in 
                       ( 
                            from bi in _db.bid
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

        public IEnumerable<ViewBid> GetUsersBids(long userID)
        {
            return from i in _db.item
                   join b in _db.bid on i.itemno equals b.itemno
                   join u in _db.user on b.userID equals u.UserID
                   join x in
                       (
                            from bi in _db.bid
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

        public bool Register(User user)
        {
            try
            {
                var add = new user
                {
                    Username = user.username,
                    Firstname = user.firstname,
                    Lastname = user.lastname,
                    Adress = user.adress,
                    Password = user.password
                };
                _db.user.Add(add);
                _db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("Register user threw: \n" + e.Message);
                return false;
            }
        }

        public PrettyItem AddItem(Item item, string username)
        {
            try
            {
                var addItem = new item
                {
                    name = item.name,
                    expires = item.expires,
                    price = item.price,
                    description = item.description,
                    addedByID = item.addedByID
                };
                
                _db.item.Add(addItem);
                _db.SaveChanges();
                var nullBid = new bid
                {
                    itemno = addItem.itemno,
                    value = 0,
                    userID = item.addedByID,
                    username = username
                };
                
                _db.bid.Add(nullBid);
                _db.SaveChanges(); 
                
                return new PrettyItem
                {
                    itemno = addItem.itemno, 
                    name = item.name,
                    price = item.price,
                    expires = item.expires,
                    bid = 0,
                    addedByID = item.addedByID,
                    highestBidder = username,
                    description = item.description
                };
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("Add item threw: \n" + e.Message);
                return null;
            }
        }

        public bool DeleteItem(long itemno)
        {
            try
            {
                _db.item.Remove((from i in _db.item where i.itemno == itemno select i).Single());
                _db.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                Console.Error.WriteLine("Remove item threw: \n" + e.Message);
                return false;
            }
        }

        public Bid PlaceBid(Bid newbid)
        {
            try
            {
                var b = new bid
                {
                    itemno = newbid.itemno,
                    userID = newbid.userID,
                    value = newbid.value,
                    username = newbid.username
                };

                _db.bid.Add(b);
                _db.SaveChanges();

                newbid.bidID = b.bidID;
                return newbid;
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("Place bid threw: \n" + e.Message);
                return null;
            }
        }
    }
}