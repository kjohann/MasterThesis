using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SignalR_Testapp.Database;

namespace SignalR_Tests.DataHelpers
{
    public class DbRefresher
    {
        public static bool refresh()
        {
            try
            {
                var path = "C:\\Users\\Kristian\\Documents\\GitHub\\MasterThesis\\TestApplications\\" +
                           "SignalR_Testapp\\SignalR_Tests\\DataHelpers\\RestoreDb.sql";
                var sql = File.ReadAllText(path);
                var db = new auctionhouseEntities();
                db.Database.ExecuteSqlCommand(sql);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
