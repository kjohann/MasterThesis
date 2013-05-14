using SignalR_Testapp.Models;
using System.Collections.Generic;

namespace SignalR_Testapp.Database
{
    public interface IDataprovider
    {
        User verifyLogin(string username, string password);
        IEnumerable<PrettyItem> getAllItems();
        IEnumerable<ViewBid> getUsersBids(long userID);
        bool register(User user);
        PrettyItem addItem(Item item, string username);
        bool deleteItem(long itemno);
        Bid placeBid(Bid newbid);
    }
}
