using System;

namespace Shared.Utils
{
    public class DateUtils
    {
        public static DateTime FromMillisecondsSinceEpoch(long milliseconds)
        {
            return new DateTime(1970, 1, 1).AddMilliseconds(milliseconds);
        }
    }
}