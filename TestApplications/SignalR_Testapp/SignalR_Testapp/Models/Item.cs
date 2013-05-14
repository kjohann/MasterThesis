using System;

namespace SignalR_Testapp.Models
{
    public class Item
    {
        public long itemno { get; set; }
        public string name { get; set; }
        public int price { get; set; }
        public DateTime expires { get; set; }
        public string description { get; set; }
        public long addedByID { get; set; }
    }
}