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
        private Monitor _monitor;

        public LoadHub()
        {
            _monitor = Monitor.GetInstance();
        }
        //Remove this..
        public void Hello()
        {
            Clients.Caller.hello();
        }

        public void InitTest(string testToRun, int numberOfClients, int testDurationInMillis)
        {
            _monitor.ExpectedTestDurationInMillis = testDurationInMillis;
            _monitor.NumberOfClients = numberOfClients;

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

            if (_monitor.Complete())
            {
                Clients.All.harvest(); //getData
            }
        }

        public void GetData( /*Some object containting data*/)
        {
            //merge data into one entity and write to file (csv or something)
            Clients.All.harvestComplete( /*Dataobject (as JSON if needed)*/); //only the "master client" will get this.
        }
    }
}