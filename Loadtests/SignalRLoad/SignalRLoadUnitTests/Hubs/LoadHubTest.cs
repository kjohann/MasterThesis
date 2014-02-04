using System;
using System.Collections.Generic;
using System.Threading;
using FluentAssertions;
using NUnit.Framework;
using Shared.Extensions;
using Shared.Models;
using SignalRLoad.Models;
using Monitor = SignalRLoad.Models.Monitor;

namespace SignalRLoadUnitTests.Hubs
{
    [TestFixture]
    public class LoadHubTest
    {
        private TestableLoadHub _loadHub;
        private Monitor _monitor;
        private Message _message;

        [SetUp]
        public void SetUp()
        {
            _loadHub = new TestableLoadHub();
            _monitor = Monitor.GetInstance();            
            _monitor.Reset();
            _monitor.NumberOfClients = 100;
            _monitor.ClientStartTime = DateTime.UtcNow;
            _monitor.ServerStartTime = _monitor.ClientStartTime;
            _message = new Message { SentFromClient = _monitor.ClientStartTime.AddMilliseconds(50).ToMilliseconds() };
            _monitor.Spacing = 1;
        }

        [Test]
        public void InitTest_resets_monitor()
        {
            _monitor.Duration = 1337; 
            _loadHub.InitTest("echo", 1000, 1, 100000000);
            _monitor.Duration.Should().Be(0);
        }

        [Test]
        public void InitTest_sets_number_of_clients_in_monitor()
        {
            const int numberOfClients = 1000;
            _loadHub.InitTest("echo", numberOfClients, 10, 1337);
            _monitor.NumberOfClients.ShouldBeEquivalentTo(numberOfClients);
        }

        [Test]
        public void InitTest_sets_spacing_in_monitor()
        {
            const int numberOfClients = 1000;
            _loadHub.InitTest("echo", numberOfClients, 10, 1337);
            _monitor.Spacing.ShouldBeEquivalentTo(10);
        }

        [Test]
        public void InitTest_sets_incoming_startTime_as_date_in_monitor()
        {
            const int numberOfClients = 1000;
            var startTime = DateTime.UtcNow;
            _loadHub.InitTest("echo", numberOfClients, 10, startTime.ToMilliseconds());
            _monitor.ClientStartTime.ToMilliseconds().ShouldBeEquivalentTo(startTime.ToMilliseconds());
        }

        [Test]
        public void Echo_should_set_ReceivedAtServer_in_message()
        {
            _loadHub.Echo(_message);
            _message.ReceivedAtServer.Should().NotBe(0);
        }

        [Test]
        public void Echo_should_register_a_ReceivedAtServerEvent_in_monitor()
        {
            _loadHub.Echo(_message);
            var expected = new[] {1};
            _monitor.ReceivedAtServerEvents.ShouldAllBeEquivalentTo(expected);
        }

        [Test]
        public void Echo_should_register_a_SentFromClientEvent_in_monitor()
        {
            _loadHub.Echo(_message);
            var expected = new[] {1};
            _monitor.SentFromClientEvents.ShouldAllBeEquivalentTo(expected);
        }

        [Test]
        public void Echo_should_register_a_SentFromServerEvent_in_monitor()
        {
            _loadHub.Echo(_message);
            var expected = new[] {1};
            _monitor.SentFromServerEvents.ShouldAllBeEquivalentTo(expected);
        }

        [Test]
        public void Echo_should_add_key_to_message()
        {
            _message.Key = 1337; //Will definitely not be this after echo-call
            _loadHub.Echo(_message);
            _message.Key.Should().Be(0);
        }

        [Test]
        public void Broadcast_should_set_ReceivedAtServer_in_message()
        {
            _loadHub.Broadcast(_message);
            _message.ReceivedAtServer.Should().NotBe(0);
        }

        [Test]
        public void Broadcast_should_register_a_ReceivedAtServerEvent_in_monitor()
        {
            _loadHub.Broadcast(_message);
            var expected = new[] { 1 };
            _monitor.ReceivedAtServerEvents.ShouldAllBeEquivalentTo(expected);
        }

        [Test]
        public void Broadcast_should_register_a_SentFromClientEvent_in_monitor()
        {
            _loadHub.Broadcast(_message);
            var expected = new[] { 1 };
            _monitor.SentFromClientEvents.ShouldAllBeEquivalentTo(expected);
        }

        [Test]
        public void Broadcast_should_register_SentFromServerEvents_corresponding_to_number_of_clients_in_monitor()
        {
            _loadHub.Broadcast(_message);
            var expected = new[] { 100 };
            _monitor.SentFromServerEvents.ShouldAllBeEquivalentTo(expected);
        }

        [Test]
        public void Broadcast_should_add_key_to_message()
        {
            _message.Key = 1337; //Will definitely not be this after broadcast-call
            _loadHub.Broadcast(_message);
            _message.Key.Should().Be(0);
        }

        [Test]
        public void Complete_should_add_clientId_to_monitor_completed_list()
        {
            _loadHub.Complete("1337");
            _monitor.CompletedClients.Count.Should().Be(1);
            _monitor.Duration.Should().Be(0); //not complete yet
        }

        [Test]
        public void Complete_should_set_duration_in_monitor_if_all_clients_have_completed()
        {
            for (var i = 0; i < _monitor.NumberOfClients; i++)
            {
                Thread.Sleep(2);
                _loadHub.Complete(i + "");
            }            
            _monitor.CompletedClients.Count.Should().Be(_monitor.NumberOfClients);
            _monitor.Duration.Should().NotBe(0);
        }

        [Test]
        public void GetData_should_add_incoming_data_to_monitor()
        {
            var testData = new TestDataEntity
            {
                LatencyData = new List<int> {300, 300, 300}
            };

            _loadHub.GetData(testData, 5);

            _monitor.TestDataEntities[0].Should().Be(testData);
        }

        [Test]
        public void GetData_should_increment_number_of_harvested_clients_in_monitor_with_nrOfClientsInBrowser()
        {
            _loadHub.GetData(new TestDataEntity(), 10);

            _monitor.Harvested.Should().Be(10);
        }

        [Test]
        public void GetData_should_only_yield_harvestedAll_when_all_clients_are_harvested()
        {
            _monitor.NumberOfClients = 15;

            for (var i = 0; i < 3; i++)
            {
                _loadHub.GetData(new TestDataEntity(), 5);
                _monitor.HarvestedAll().Should().Be(i == 2);
            }
        }
    }
}
