using System.Collections.Generic;

namespace ChartsAPI.Models
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