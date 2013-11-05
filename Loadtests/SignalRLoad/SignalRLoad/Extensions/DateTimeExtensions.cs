using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRLoad.Extensions
{
    public static class DateTimeExtensions
    {
        public static long ToMilliseconds(this DateTime date)
        {
            return (long) (date - new DateTime(1970, 1, 1)).TotalMilliseconds;
        }
    }
}