using System.Collections.Generic;

namespace ChartsAPI.Models
{
    public class ChartsRepo
    {
        private static ChartsRepo _instance;
        public List<Chart> Charts { get; set; }
        
        private ChartsRepo()
        {
            Charts = new List<Chart>();
        }

        public static ChartsRepo GetInstance()
        {
            return _instance ?? (_instance = new ChartsRepo());
        }
    }
}