using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalR_Testapp.Models
{
    public class ViewBid
    {
        private string _name;
        private long _itemno;
        private long _value;

        public string name { get { return this._name; } set { this._name = value; } }
        public long itemno { get { return this._itemno; } set { this._itemno = value; } }
        public long value { get { return this._value; } set { this._value = value; } }
    }
}