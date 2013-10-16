using SignalR_Testapp.Models;
using System.Collections.Generic;

namespace SignalR_Testapp.Database
{
    public interface IDataprovider
    {
        User VerifyLogin(string username, string password);
        IEnumerable<PrettyItem> GetAllItems();
        IEnumerable<ViewBid> GetUsersBids(long userID);
        bool Register(User user);
        PrettyItem AddItem(Item item, string username);
        bool DeleteItem(long itemno);
        Bid PlaceBid(Bid newbid);
    }
}
