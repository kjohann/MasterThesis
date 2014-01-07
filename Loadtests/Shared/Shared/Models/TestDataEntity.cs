using System.Collections.Generic;

namespace Shared.Models
{
    /// <summary>
    /// Contains test data for a single browser
    /// </summary>
    public class TestDataEntity
    {
        public IEnumerable<int> LatencyData { get; set; }
    }
}