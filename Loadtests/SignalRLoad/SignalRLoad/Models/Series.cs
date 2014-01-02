using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRLoad.Models
{
    public class Series<T> :ISeries where T : struct 
    {
        public T[] Data { get; set; }
        public string Name { get; set; }
    }
}