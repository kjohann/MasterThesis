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
        //Remove this..
        public void Hello()
        {
            Clients.Caller.hello();
        }

        public void InitTest(string testToRun, int numberOfClients, int testDurationInMillis)
        {
            //save numberOfClients and duration
            Clients.All.initTest(testToRun);
        }

        public void Echo(Message message)
        {
            message.SentFromServer = DateTime.Now;
            Clients.Caller.receiveEcho(message);
        }

        public void Broadcast(Message message)
        {
            message.SentFromServer = DateTime.Now;
            Clients.All.receiveBroadcast(message);
        }

        public void Complete(string clientId)
        {
            //register completed
            //if all are completed
            Clients.All.harvest(); //getData
        }

        public void GetData( /*Some object containting data*/)
        {
            //merge data into one entity and write to file (csv or something)
            Clients.All.harvestComplete( /*Dataobject (as JSON if needed)*/); //only the "master client" will get this.
        }

    }
}