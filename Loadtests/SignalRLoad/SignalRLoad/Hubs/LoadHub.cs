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
        //Remove this..
        public void Hello(long timeInMillis)
        {            
            var date = new DateTime(1970,1,1).AddMilliseconds(timeInMillis);
            Clients.Caller.hello((date- new DateTime(1970, 1, 1)).TotalMilliseconds);
        }

        public void InitTest(string testToRun, int numberOfClients, int testDurationInMillis)
        {
            _monitor.Reset();
            _monitor.ExpectedTestDurationInMillis = testDurationInMillis;
            _monitor.NumberOfClients = numberOfClients;            

            _monitor.StartTime = DateTime.Now;
            _monitor.Stopwatch.Start();

            Clients.All.initTest(testToRun);
        }

        public void Echo(Message message)
        {
            _monitor.RegisterReceivedMessage();
            message.SentFromServer = DateTime.Now.ToMilliseconds();            
            Clients.Caller.receiveEcho(message);
            _monitor.RegisterSentEchoMessage();
        }

        public void Broadcast(Message message)
        {
            _monitor.RegisterReceivedMessage();           
            message.SentFromServer = DateTime.Now.ToMilliseconds();
            Clients.All.receiveBroadcast(message);
            _monitor.RegisterSentBroadcastMessage();
        }

        public void Complete(string clientId)
        {
            _monitor.CompletedClients.Add(clientId);

            if (!_monitor.Complete()) return;
            
            _monitor.Stopwatch.Stop();
            Clients.All.harvest(); 
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
                    StartTime = _monitor.StartTime
                });
            }
        }
    }
}