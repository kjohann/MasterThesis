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
        private readonly IDataprovider _provider;

        public AuctionHubService(IDataprovider provider)
        {
            _provider = provider;
        }

        public User VerifyLogin(string username, string password)
        {
            return string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) ? null : _provider.VerifyLogin(username, password);
        }

        public IEnumerable<PrettyItem> GetAllItems()
        {
            return _provider.GetAllItems();
        }

        public IEnumerable<ViewBid> GetUsersBids(long userID)
        {
            if (userID < 0)
            {
                Console.Error.WriteLine("Corrupt data received for getUsersBids. UserID: " + userID);
                return null;
            }
            return _provider.GetUsersBids(userID);
        }

        public bool Register(User user)
        {
            return user != null && _provider.Register(user);
        }

        public PrettyItem AddItem(Item item, string username)
        {                        
            return item == null || string.IsNullOrEmpty(username) ? null : _provider.AddItem(item, username);
        }

        public bool DeleteItem(long itemno)
        {
            return itemno > 0 && _provider.DeleteItem(itemno);
        }

        public Bid PlaceBid(Bid newbid)
        {
            return newbid != null ? _provider.PlaceBid(newbid) : null;
        }
    }
}