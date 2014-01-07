using System;

namespace SignalRLoad.Extensions
{
    public static class DateTimeExtensions
    {
        public static long ToMilliseconds(this DateTime date)
        {
            var beginningOfTime = new DateTime(1970, 1, 1, 0,0,0, DateTimeKind.Utc);
            var diff = date - beginningOfTime;
            return (long) (diff).TotalMilliseconds;
        }
    }
}