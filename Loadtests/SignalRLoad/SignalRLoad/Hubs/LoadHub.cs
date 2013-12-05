using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SignalRLoad.Extensions;
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
     
        public void InitTest(string testToRun, int numberOfClients)
        {
            _monitor.Reset();
            _monitor.NumberOfClients = numberOfClients;            

            _monitor.StartTime = DateTime.UtcNow; //One hour time difference from client for some reason
            _monitor.Stopwatch.Start();
            Clients.All.initTest(testToRun);
        }

        public void Echo(Message message)
        {
            message.ReceivedAtServer = DateTime.UtcNow.ToMilliseconds();    //One hour time difference from client for some reason  
            _monitor.RegisterReceivedMessage();                   
            Clients.Caller.receiveEcho(message);
            var sent = DateTime.UtcNow.ToMilliseconds();
            _monitor.RegisterSentEchoMessage(sent);
        }

        public void Broadcast(Message message)
        {
            message.ReceivedAtServer = DateTime.UtcNow.ToMilliseconds();  //One hour time difference from client for some reason
            _monitor.RegisterReceivedMessage();            
            Clients.All.receiveBroadcast(message);
            var sent = DateTime.UtcNow.ToMilliseconds();
            _monitor.RegisterSentBroadcastMessage(sent);
        }

        public void Complete(string clientId)
        {
            _monitor.CompletedClients.Add(clientId);
            Clients.Caller.harvest(clientId); 

            if (!_monitor.Complete()) return;
            
            _monitor.Stopwatch.Stop();
        }

        public void GetData(TestDataEntity testData)
        {
            _monitor.TestDataEntities.Add(testData);

            if (_monitor.HarvestedAll())
            {
                Clients.All.harvestComplete(new
                {
                    Entities = _monitor.TestDataEntities,
                    Duration = _monitor.Stopwatch.ElapsedMilliseconds,
                    StartTime = _monitor.StartTime.ToMilliseconds(),
                    SendEvents = _monitor.SendEvents
                });
            }
        }
    }
}