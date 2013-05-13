using SignalR_Testapp.Database;
using SignalR_Testapp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR_Tests.Unittests
{
    class FakeDataprovider : IDataprovider
    {
        private Db db;
        private void reset()
        {
            db = new Db();
            db.init();
        }

        public User verifyLogin(string username, string password)
        {
            reset();
            List<User> users = (from u in db.Users
                                where u.username.Equals(username) &&
                                u.password.Equals(password)
                                select new User
                                {
                                    userID = u.userID,
                                    username = u.username,
                                    firstname = u.firstname,
                                    lastname = u.lastname,
                                    adress = u.adress,
                                    password = u.password
                                }).ToList();
            return users.Count > 1 ? null : users.FirstOrDefault();
        }

        public IEnumerable<PrettyItem> getAllItems()
        {
            reset();
            return from i in db.Items
                   join b in db.Bids on i.itemno equals b.itemno
                   join u in db.Users on b.userID equals u.userID
                   join x in
                       (
                            from bi in db.Bids
                            group bi by bi.itemno into g
                            select new { itemno = g.Key, max = g.Max(y => y.value) }
                       )
                   on b.itemno equals x.itemno
                   where b.value == x.max
                   select new PrettyItem
                   {
                       itemno = b.itemno,
                       highestBidder = u.username,
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
            reset();
            return from i in db.Items
                   join b in db.Bids on i.itemno equals b.itemno
                   join u in db.Users on b.userID equals u.userID
                   join x in
                       (
                            from bi in db.Bids
                            group bi by bi.itemno into g
                            select new { itemno = g.Key, max = g.Max(y => y.value) }
                       )
                   on b.itemno equals x.itemno
                   where b.value == x.max && u.userID == userID && b.value != 0
                   select new ViewBid
                   {
                       itemno = b.itemno,
                       name = i.name,
                       value = b.value
                   };
        }

        public bool register(User user)
        {
            reset();
            if (user == null)
                return false;
            db.Users.Add(user);
            user.userID = 4;
            return true;
        }

        public PrettyItem addItem(Item item, string username)
        {
            if (item == null || string.IsNullOrEmpty(username))
                return null;
            reset();
            db.Items.Add(item);
            item.itemno = 4;
            return new PrettyItem
            {
                itemno = item.itemno,
                name = item.name,
                price = item.price,
                expires = item.expires,
                bid = 0,
                addedByID = item.addedByID,
                highestBidder = username,
                description = item.description
            };

        }

        public bool deleteItem(long itemno)
        {
            reset();
            try
            {
                Item deleteItem = (from i in db.Items where i.itemno == itemno select i).Single();
                db.Items.Remove(deleteItem);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Bid placeBid(Bid newbid)
        {
            reset();
            if (newbid == null)
                return null;
            db.Bids.Add(newbid);
            newbid.bidID = 5;
            return newbid;
        }

        private class Db
        {
            public List<User> Users;
            public List<Item> Items;
            public List<Bid> Bids;

            public void init()
            {
                populateUsers();
                populateItems();
                populateBids();
            }

            private void populateUsers()
            {
                Users = new List<User>();
                Users.Add(new User { userID = 1, username = "User1", firstname = "Test", lastname = "Testson", adress = "Teststreet", password = "123" });
                Users.Add(new User { userID = 2, username = "User2", firstname = "User", lastname = "Usersson", adress = "Usersroad", password = "123" });
                Users.Add(new User { userID = 3, username = "User3", firstname = "Ola", lastname = "Nordmann", adress = "Drammensveien", password = "123" });
            }

            private void populateItems()
            {
                Items = new List<Item>();
                Items.Add(new Item { itemno = 1, name = "iPhone", price = 3000, description = "Test description", expires = new DateTime(2013, 3, 27), addedByID = 1 });
                Items.Add(new Item { itemno = 2, name = "Asus K55V", price = 7000, description = "Test description", expires = new DateTime(2013, 4, 7), addedByID = 1 });
                Items.Add(new Item { itemno = 3, name = "Car", price = 300000, description = "Test description", expires = new DateTime(2014, 8, 15), addedByID = 2 });
            }

            private void populateBids()
            {
                Bids = new List<Bid>();
                Bids.Add(new Bid { bidID = 1, itemno = 1, userID = 2, value = 3500, username = "User2" });
                Bids.Add(new Bid { bidID = 2, itemno = 1, userID = 3, value = 4000, username = "User3" });
                Bids.Add(new Bid { bidID = 3, itemno = 3, userID = 1, value = 350000, username = "User1" });
                Bids.Add(new Bid { bidID = 4, itemno = 2, userID = 2, value = 7500, username = "User2" });
            }
        }
    }
}
