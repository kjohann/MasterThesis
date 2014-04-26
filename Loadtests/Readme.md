#Project part 2: Load tests#

This folder contains all code and results concerning the second part of my project. 


##Problem statements##
Two problem statements from the thesis is about this part. The following text is from the thesis itself:

<b>IV: Does WebSockets outperform the old, established HTTP methods for
real time in terms of network usage, message latency and use of machine
resources? </b>
<br>If it turns out that WebSockets doesn’t perform better, is it something we need?

<b>V: Can WebSockets be the foundation for the next generation of HTTP?</b>
<br>The answer to this is coupled with the previous question. If WebSockets is just as
good as HTTP performancewise, it will not be the foundation for the next generation
of HTTP. However, if it is better, can it change the way browsers communicate with
servers in more aspects than real time?

##Folders##
The different folders contain the following:

* ChartMerger: An application for generating charts from JSON files with raw data from several test runs.
* ChartsAPI: An ASP.NET Web API application for generating charts from data gathered by the browsers during a single run.
* ClientFiles: The common client-side files for all load test applications. 
* ClientLauncher: A simple application that can launch a number of Firefox browsers and fill in necessary data for a test run.
* LightstreamerLoad: The load test application for Lightstreamer.
* PlayLoad: The load test application for Play.
* Results: Contains all the raw JSON-data from all test runs. More info within.
* Shared: Shared code between the SignalRLoad application and the ChartsAPI.
* SignalRLoad: The laod test application for SignalR.
* SocketIOLoad: The load test application for Socket.IO.
* SockJs: The load test application for SockJS.