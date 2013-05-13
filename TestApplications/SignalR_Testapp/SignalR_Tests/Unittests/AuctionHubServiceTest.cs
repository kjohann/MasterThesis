using System;
using NUnit.Framework;
using SignalR_Tests.Unittests;
using SignalR_Testapp.Hubs;
using SignalR_Testapp.Models;
using System.Collections.Generic;
using SignalR_Testapp.Database;

namespace SignalR_Tests
{
    [TestFixture]
    public class AuctionHubServiceTest
    {
        private IDataprovider _provider;
        private AuctionHubService _service;

        [SetUp]
        public void init()
        {
            _provider = new FakeDataprovider();
            _service = new AuctionHubService(_provider);
        }

        [Test]
        public void verifyLoginTest()
        {
            User successUser = _service.verifyLogin("User1", "123");
            Assert.NotNull(successUser);
            Assert.AreEqual("User1", successUser.username);
            Assert.AreEqual(1, successUser.userID);

            User failUser = _service.verifyLogin("User1", "wrong");
            Assert.Null(failUser);
            failUser = _service.verifyLogin("Wrong", "123");
            Assert.Null(failUser);
        }

        [Test]
        public void getAllItemsTest()
        {
            IEnumerable<PrettyItem> items = _service.getAllItems();
            Assert.AreEqual(3, count(items));
        }

        [Test]
        public void getUsersBidsTest()
        {
            IEnumerable<ViewBid> bids = _service.getUsersBids(1);
            Assert.AreEqual(1, count(bids));
            bids = _service.getUsersBids(2);
            Assert.AreEqual(1, count(bids));
        }

        [Test]
        public void registerTest()
        {
            User register = new User { username = "User4", firstname = "Insert", lastname = "Insertson", adress = "Insstreet", password = "qwe" };
            Assert.True(_service.register(register));
            Assert.AreEqual(4, register.userID);
            Assert.False(_service.register(null));
        }

        [Test]
        public void addItemTest()
        {
            Item addItem = new Item { name = "InsertItem", price = 1337, expires = new DateTime(2015, 10, 21), description = "What movie reference?", addedByID = 3 };
            PrettyItem item = _service.addItem(addItem, "User3");
            Assert.AreEqual(4, addItem.itemno);
            Assert.AreEqual(4, item.itemno);
            Assert.AreEqual(1337, item.price);
            Assert.AreEqual("User3", item.highestBidder);
            Assert.Null(_service.addItem(null, "User3"));
        }

        [Test]
        public void deleteItemTest()
        {
            Assert.True(_service.deleteItem(1));
            Assert.False(_service.deleteItem(4));
        }

        [Test]
        public void placeBidTest()
        {
            Bid bid = new Bid { itemno = 3, userID = 3, username = "User3", value = 400000 };
            Bid newbid = _service.placeBid(bid);

            Assert.AreEqual(bid, newbid);
            Assert.AreEqual(5, bid.bidID);
        }

        private int count(IEnumerable<object> list)
        {
            int i = 0;
            foreach (var o in list) { i++; }
            return i;
        }
    }
}
