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

        [TearDown]
        public void TearDown()
        {
            DataHelpers.DbRefresher.refresh();
        }
    }
}
