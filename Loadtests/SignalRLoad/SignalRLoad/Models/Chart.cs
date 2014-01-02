using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRLoad.Models
{
    public class Chart
    {
        public string Title { get; set; }
        public string[] XAxis { get; set; }
        public string[] YAxis { get; set; }
        public List<ISeries> Series { get; set; }
        public string YAxisTitle { get; set; }
    }
}