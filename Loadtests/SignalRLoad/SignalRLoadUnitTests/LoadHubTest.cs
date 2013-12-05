﻿using System;
using NUnit.Framework;
using SignalRLoad.Extensions;
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
        private Message _message;

        [SetUp]
        public void SetUp()
        {
            _loadHub = new TestableLoadHub();
            _monitor = Monitor.GetInstance();            
            _monitor.Reset();
            _monitor.NumberOfClients = 100;
            _monitor.StartTime = DateTime.UtcNow;
            _message = new Message { SentFromClient = _monitor.StartTime.AddMilliseconds(50).ToMilliseconds() };
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

    }
}
