using Moq;
using NUnit.Framework;
using SignalR_Testapp.Database;
using SignalR_Testapp.Hubs;
using SignalR_Testapp.Models;

namespace SignalR_Tests.Unittests
{
    [TestFixture]
    public class AuctionHubServiceTest
    {
        private AuctionHubService _service;
        private Mock<IDataprovider> _providerMock;

        [SetUp]
        public void SetUp()
        {
            _providerMock = new Mock<IDataprovider>();
        }

        [Test]
        public void VerifyLogin_should_return_a_user_if_successful()
        {
            _providerMock.Setup(x => x.VerifyLogin(It.IsAny<string>(), It.IsAny<string>())).Returns(new User() {userID = 1, firstname = "Testname", username = "Testuser"});
            _service = new AuctionHubService(_providerMock.Object);
            var result = _service.VerifyLogin("TestUser", "123");
            Assert.NotNull(result);
            Assert.AreEqual("Testname", result.firstname);
            //User failUser = _service.VerifyLogin("User1", "wrong");
            //Assert.Null(failUser);
            //failUser = _service.VerifyLogin("Wrong", "123");
            //Assert.Null(failUser);
        }

        [Test]
        public void VerifyLogin_should_return_null_if_unsuccessful()
        {
            _service = new AuctionHubService(_providerMock.Object);
            Assert.Null(_service.VerifyLogin("Care", "Face"));
        }

        //[Test]
        //public void getAllItemsTest()
        //{
        //    IEnumerable<PrettyItem> items = _service.GetAllItems();
        //    Assert.AreEqual(3, count(items));
        //}

        //[Test]
        //public void getUsersBidsTest()
        //{
        //    IEnumerable<ViewBid> bids = _service.GetUsersBids(1);
        //    Assert.AreEqual(1, count(bids));
        //    bids = _service.GetUsersBids(2);
        //    Assert.AreEqual(1, count(bids));
        //}

        //[Test]
        //public void registerTest()
        //{
        //    User register = new User { username = "User4", firstname = "Insert", lastname = "Insertson", adress = "Insstreet", password = "qwe" };
        //    Assert.True(_service.Register(register));
        //    Assert.AreEqual(4, register.userID);
        //    Assert.False(_service.Register(null));
        //}

        //[Test]
        //public void addItemTest()
        //{
        //    Item addItem = new Item { name = "InsertItem", price = 1337, expires = new DateTime(2015, 10, 21), description = "What movie reference?", addedByID = 3 };
        //    PrettyItem item = _service.AddItem(addItem, "User3");
        //    Assert.AreEqual(4, addItem.itemno);
        //    Assert.AreEqual(4, item.itemno);
        //    Assert.AreEqual(1337, item.price);
        //    Assert.AreEqual("User3", item.highestBidder);
        //    Assert.Null(_service.AddItem(null, "User3"));
        //}

        //[Test]
        //public void deleteItemTest()
        //{
        //    Assert.True(_service.DeleteItem(1));
        //    Assert.False(_service.DeleteItem(4));
        //}

        //[Test]
        //public void placeBidTest()
        //{
        //    Bid bid = new Bid { itemno = 3, userID = 3, username = "User3", value = 400000 };
        //    Bid newbid = _service.PlaceBid(bid);

        //    Assert.AreEqual(bid, newbid);
        //    Assert.AreEqual(5, bid.bidID);
        //}

        //private int count(IEnumerable<object> list)
        //{
        //    int i = 0;
        //    foreach (var o in list) { i++; }
        //    return i;
        //}
    }
}
