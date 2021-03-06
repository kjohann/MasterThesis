﻿using System;
using Microsoft.AspNet.SignalR;
using Shared.Extensions;
using Shared.Models;
using Shared.Utils;
using SignalRLoad.Models;

namespace SignalRLoad.Hubs
{
    public class LoadHub : Hub
    {
        private readonly Monitor _monitor;

        public LoadHub()
        {
            _monitor = Monitor.GetInstance();
        }

        public void InitTest(string testToRun, int numberOfClients, int spacing, long startTime)
        {
            _monitor.Reset();
            _monitor.NumberOfClients = numberOfClients;
            _monitor.Spacing = spacing;

            _monitor.ClientStartTime = DateUtils.FromMillisecondsSinceEpoch(startTime); //One hour time difference from client for some reason
            _monitor.ServerStartTime = DateTime.UtcNow;
            Clients.All.initTest(testToRun);
        }

        public void Echo(Message message)
        {
            RegisterReceivedAndSentFromClientEvents(message);
            Clients.Caller.receiveMessage(message);
            RegisterSentFromServerEvent(false);
        }

        public void Broadcast(Message message)
        {
            RegisterReceivedAndSentFromClientEvents(message);
            Clients.All.receiveMessage(message);
            RegisterSentFromServerEvent(true);
        }

        public void Complete(string clientId)
        {
            _monitor.CompletedClients.Add(clientId);

            if (!_monitor.Complete()) return;

            _monitor.Duration = DateTime.UtcNow.ToMilliseconds() - _monitor.ServerStartTime.ToMilliseconds();
            Clients.All.harvest();
        }

        public void GetData(TestDataEntity testData, int numberOfClientsInBrowser)
        {
            _monitor.TestDataEntities.Add(testData);
            _monitor.Harvested += numberOfClientsInBrowser;

            if (_monitor.HarvestedAll())
            {
                Clients.All.harvestComplete(new
                {
                    Duration = _monitor.Duration,
                    StartTime = _monitor.ClientStartTime.ToMilliseconds(),
                    SentFromClientEvents = _monitor.SentFromClientEvents,
                    ReceivedAtServerEvents = _monitor.ReceivedAtServerEvents,
                    SentFromServerEvents = _monitor.SentFromServerEvents,
                    Spacing = _monitor.Spacing,
                    TestDataEntities = _monitor.TestDataEntities
                });
            }
        }

        private void RegisterReceivedAndSentFromClientEvents(Message message)
        {
            message.ReceivedAtServer = DateTime.UtcNow.ToMilliseconds();    //One hour time difference from client for some reason                   
            _monitor.RegisterReceivedAtServerEvent(message.ReceivedAtServer, _monitor.Spacing);
            var key = _monitor.RegisterSentFromClientEvent(message.SentFromClient, _monitor.Spacing);
            message.Key = key;
        }

        private void RegisterSentFromServerEvent(bool broadCast)
        {
            var sent = DateTime.UtcNow.ToMilliseconds();
            _monitor.RegisterSentFromServerEvent(sent, broadCast, _monitor.Spacing);
        }
    }
}