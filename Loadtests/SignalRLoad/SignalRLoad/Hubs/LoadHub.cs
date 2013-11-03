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
        private readonly TestData _testData;

        public LoadHub()
        {
            _monitor = Monitor.GetInstance();
            _testData = TestData.GetInstance();
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

            _testData.StartTime = DateTime.Now;
            _testData.Stopwatch.Start();

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
            
            _testData.Stopwatch.Stop();
            Clients.All.harvest(); //getData
        }

        public void GetData(TestDataEntity testData)
        {
            //merge data into one entity and write to file (csv or something)
            _testData.TestDataEntities.AddLast(testData);
            //if dataset is completed
            if (_testData.TestDataEntities.Count == _monitor.NumberOfClients)
            {
                //Prepare charts
                Clients.All.harvestComplete( /*Dataobject (as JSON if needed)*/);
                    //only the "master client" will use this.
            }
        }
    }
}