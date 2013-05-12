using SignalR_Testapp.Database;
using SignalR_Testapp.Models;
using SignalR_Testapp.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalR_Testapp.Hubs
{
    public class AuctionHubService
    {
        private IDataprovider _provider;

        public AuctionHubService(IDataprovider provider)
        {
            _provider = provider;
        }

        public User verifyLogin(string username, string password)
        {
            if (username == null || username.Equals("") || password == null || password.Equals(""))
            {
                return null;
            }

            return _provider.verifyLogin(username, password);
        }

        public IEnumerable<PrettyItem> getAllItems()
        {
            return _provider.getAllItems();
        }

        public IEnumerable<ViewBid> getUsersBids(long userID)
        {
            if (userID < 0)
            {
                Console.Error.WriteLine("Corrupt data received for getUsersBids. UserID: " + userID);
                return null;
            }
            return _provider.getUsersBids(userID);
        }
    }
}