using System;

namespace SignalRLoad.Utils
{
    public class DateUtils
    {
        public static DateTime FromMillisecondsSinceEpoch(long milliseconds)
        {
            return new DateTime(1970, 1, 1).AddMilliseconds(milliseconds);
        }
    }
}