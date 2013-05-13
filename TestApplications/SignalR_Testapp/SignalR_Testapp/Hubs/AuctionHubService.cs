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
            return string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) ? null : _provider.verifyLogin(username, password);
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

        public bool register(User user)
        {
            return user != null ?_provider.register(user) : false;
        }

        public PrettyItem addItem(Item item, string username)
        {                        
            return item == null || string.IsNullOrEmpty(username) ? null : _provider.addItem(item, username);
        }

        public Bid placeBid(Bid newbid)
        {
            return newbid != null ? _provider.placeBid(newbid) : null;
        }
    }
}