using System;
using NUnit.Framework;
using SignalR_Testapp.Database;
using SignalR_Testapp.Models;

namespace SignalR_Tests.Integrationtests
{
    [TestFixture]
    public class IntegrationTest
    {
        private readonly IDataprovider _provider = new Dataprovider();

        [SetUp]
        public void SetUp()
        {
            DataHelpers.DbRefresher.refresh();
        }

        [Test]
        public void VerifyLogIn_should_return_user_if_credentials_are_correct()
        {
            var user = _provider.VerifyLogin("Chrome", "123");

            Assert.NotNull(user);
            Assert.AreEqual("Chrome", user.username);
        }

        [Test]
        public void VerifyLogIn_should_return_null_if_credentials_are_wrong()
        {
            Assert.Null(_provider.VerifyLogin("Some", "Noneexistent"));
        }

        [Test]
        public void If_Register_returns_true_then_VerifyLogIn_should_be_successful_with_new_users_credentials()
        {
            var result = _provider.Register(new User
            {
                username = "Testuser", adress = "Teststreet", firstname = "Test", lastname = "Testson", password = "123"
            });

            Assert.True(result);
            Assert.NotNull(_provider.VerifyLogin("Testuser", "123"));
        }

        [Test]
        public void AddItem_should_return_prettyItem_with_id_set_if_successful()
        {
            var item = _provider.AddItem(new Item
            {
                addedByID = 1, name = "Test", description = "Desc", expires = new DateTime(2013, 7, 7), price = 1337
            }, "Chrome");

            Assert.AreEqual(5, item.itemno);
            Assert.AreEqual("Chrome", item.highestBidder);
        }

        [TearDown]
        public void TearDown()
        {
            DataHelpers.DbRefresher.refresh();
        }
    }
}
