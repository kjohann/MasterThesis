using System;
using NUnit.Framework;
using SignalR_Testapp.Database;
using SignalR_Testapp.Models;

namespace SignalR_Tests.Integrationtests
{
    [TestFixture]
    public class IntegrationTest
    {
        private IDataprovider _provider;

        [SetUp]
        public void SetUp()
        {
            DataHelpers.DbRefresher.refresh();
        }

        [Test]
        public void Test()
        {
            _provider = new Dataprovider();
            var result = _provider.Register(new User{adress = "Test", firstname = "test", lastname = "testson", password = "123", username = "user"});
            Assert.True(result);
        }

        [TearDown]
        public void TearDown()
        {
            DataHelpers.DbRefresher.refresh();
        }
    }
}
