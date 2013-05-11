using System;

namespace SignalR_Testapp.Models
{
    public class Item
    {
        private int itemno { get; set; }
        private string name { get; set; }
        private int price { get; set; }
        private DateTime expires { get; set; }
        private string description { get; set; }
        private int addedByID { get; set; }
    }
}