using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
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
        public void Hello()
        {
            _monitor.RegisterReceivedMessage();
            Clients.Caller.hello(_monitor.MessagesReceived);
        }

        public void InitTest(string testToRun, int numberOfClients, int testDurationInMillis)
        {
            _monitor.ExpectedTestDurationInMillis = testDurationInMillis;
            _monitor.NumberOfClients = numberOfClients;

            _monitor.StartTime = DateTime.Now;
            _monitor.Stopwatch.Start();

            Clients.All.initTest(testToRun);
        }

        public void Echo(Message message)
        {
            _monitor.RegisterReceivedMessage();
            message.SentFromServer = DateTime.Now;            
            Clients.Caller.receiveEcho(message);
            _monitor.RegisterSentEchoMessage();
        }

        public void Broadcast(Message message)
        {
            _monitor.RegisterReceivedMessage();
            message.SentFromServer = DateTime.Now;
            Clients.All.receiveBroadcast(message);
            _monitor.RegisterSentBroadcastMessage();
        }

        public void Complete(string clientId)
        {
            //register completed
            _monitor.CompletedClients.Add(clientId);

            if (!_monitor.Complete()) return;
            
            _monitor.Stopwatch.Stop();
            Clients.All.harvest(); //getData
        }

        public void GetData(TestDataEntity testData)
        {
            //merge data into one entity and write to file (csv or something) -> API
            _monitor.TestDataEntities.Add(testData);
            //if dataset is completed
            if (_monitor.HarvestedAll())
            {
                //Prepare charts
                Clients.All.harvestComplete(new
                {
                    Entities = _monitor.TestDataEntities,
                    Duration = _monitor.Stopwatch.ElapsedMilliseconds
                });
                //only the "master client" will use this.
                //Use WebApi to get charts

            }
        }
    }
}