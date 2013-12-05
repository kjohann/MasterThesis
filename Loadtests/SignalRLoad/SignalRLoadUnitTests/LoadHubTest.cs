using NUnit.Framework;
using SignalRLoad.Models;
using SignalRLoadUnitTests.Hubs;
using FluentAssertions;

namespace SignalRLoadUnitTests
{
    [TestFixture]
    public class LoadHubTest
    {
        private TestableLoadHub _loadHub;
        private Monitor _monitor;

        [SetUp]
        public void SetUp()
        {
            _loadHub = new TestableLoadHub();
            _monitor = Monitor.GetInstance();
            _monitor.Reset();
        }

        [Test]
        public void InitTest_resets_monitor()
        {
            _monitor.Duration = 1337; 
            _loadHub.InitTest("echo", 1000);
            _monitor.Duration.Should().Be(0);
        }

        [Test]
        public void InitTest_sets_incoming_parameters_in_monitor()
        {
            const int numberOfClients = 1000;
            _loadHub.InitTest("echo", numberOfClients);
            _monitor.NumberOfClients.ShouldBeEquivalentTo(numberOfClients);
        }


    }
}
