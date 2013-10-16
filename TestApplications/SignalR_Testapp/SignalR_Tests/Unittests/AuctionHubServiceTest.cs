using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
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
            InitService();
            var result = _service.VerifyLogin("TestUser", "123");
            Assert.NotNull(result);
            Assert.AreEqual("Testname", result.firstname);
        }

        [Test]
        public void VerifyLogin_should_return_null_if_unsuccessful()
        {
            InitService();
            Assert.Null(_service.VerifyLogin("Care", "Face"));
        }

        [Test]
        public void GetAllItems_should_return_a_list_of_prettyItems()
        {
            var items = new List<PrettyItem> {new PrettyItem {name = "Item1"}, new PrettyItem {name = "Item2"}};
            _providerMock.Setup(x => x.GetAllItems()).Returns(items);
            InitService();

            Assert.AreEqual(2, _service.GetAllItems().Count());
        }

        [Test]
        public void GetUsersBids_should_return_null_if_id_is_less_than_zero()
        {
            _service = new AuctionHubService(_providerMock.Object);
            Assert.Null(_service.GetUsersBids(-1));
        }

        [Test]
        public void GetUsersBids_should_return_a_list_of_viewBids()
        {
            var bids = new List<ViewBid> {new ViewBid {name = "Item1"}, new ViewBid {name = "Item2"}};
            _providerMock.Setup(x => x.GetUsersBids(It.IsAny<long>())).Returns(bids);
            InitService();

            Assert.AreEqual(2, _service.GetUsersBids(2).Count());
            
        }

        [Test]
        public void Register_should_return_false_if_provided_user_is_null()
        {
            InitService();
            Assert.False(_service.Register(null));
        }

        [Test]
        public void Register_should_return_the_value_returned_from_IDataprovider()
        {
            _providerMock.Setup(x => x.Register(It.IsAny<User>())).Returns(true);
            InitService();
            
            Assert.True(_service.Register(new User()));
        }

        [Test]
        public void AddItem_should_return_a_prettyItem_representation_of_the_added_item_if_successful()
        {
            _providerMock.Setup(x => x.AddItem(It.IsAny<Item>(), It.IsAny<string>()))
                .Returns(new PrettyItem {name = "Item1", addedByID = 1});
            InitService();

            var item = _service.AddItem(new Item(), "User");

            Assert.AreEqual("Item1", item.name);
            Assert.AreEqual(1, item.addedByID);
        }

        [Test]
        public void AddItem_should_return_null_if_provided_username_is_empty()
        {
            InitService();
            Assert.Null(_service.AddItem(new Item(), ""));
        }

        [Test]
        public void DeleteItem_should_return_false_if_itemno_is_negative()
        {
            InitService();
            Assert.False(_service.DeleteItem(-1));
        }

        [Test]
        public void DeleteItem_should_return_true_if_IDataprovider_returns_true()
        {
            _providerMock.Setup(x => x.DeleteItem(It.IsAny<long>())).Returns(true);
            InitService();
            Assert.True(_service.DeleteItem(1));
        }

        [Test]
        public void PlaceBid_should_return_null_if_provided_bid_is_null()
        {
            InitService();
            Assert.Null(_service.PlaceBid(null));
        }

        [Test]
        public void PlaceBid_should_return_added_bid()
        {
            _providerMock.Setup(x => x.PlaceBid(It.IsAny<Bid>())).Returns(new Bid {value = 1337});
            InitService();

            Assert.AreEqual(1337, _service.PlaceBid(new Bid()).value);
        }

        private void InitService()
        {
            _service = new AuctionHubService(_providerMock.Object);
        }  
    }
}
