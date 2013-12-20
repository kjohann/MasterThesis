using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SignalRLoad.Extensions;
using SignalRLoad.Models;
using SignalRLoad.Utils;

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

            _monitor.StartTime = DateUtils.FromMillisecondsSinceEpoch(startTime); //One hour time difference from client for some reason
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
            Clients.Caller.harvest(clientId); 

            if (!_monitor.Complete()) return;

            _monitor.Duration = DateTime.UtcNow.ToMilliseconds() - _monitor.StartTime.ToMilliseconds();
        }

        public void GetData(TestDataEntity testData)
        {
            _monitor.TestDataEntities.Add(testData);

            if (_monitor.HarvestedAll())
            {
                Clients.All.harvestComplete(new
                {
                    Duration = _monitor.Duration,
                    StartTime = _monitor.StartTime.ToMilliseconds(),
                    SentFromClientEvents = _monitor.SentFromClientEvents,
                    ReceivedAtServerEvents = _monitor.ReceivedAtServerEvents,
                    SentFromServerEvents = _monitor.SentFromServerEvents,
                    Spacing = _monitor.Spacing
                });
            }
        }

        private void RegisterReceivedAndSentFromClientEvents(Message message)
        {
            message.ReceivedAtServer = DateTime.UtcNow.ToMilliseconds();    //One hour time difference from client for some reason                   
            _monitor.RegisterReceivedAtServerEvent(message.ReceivedAtServer, _monitor.Spacing);
            _monitor.RegisterSentFromClientEvent(message.SentFromClient, _monitor.Spacing);
        }

        private void RegisterSentFromServerEvent(bool broadCast)
        {
            var sent = DateTime.UtcNow.ToMilliseconds();
            _monitor.RegisterSentFromServerEvent(sent, broadCast, _monitor.Spacing);
        }
    }
}