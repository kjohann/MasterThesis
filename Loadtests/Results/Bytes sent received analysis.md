#How the test works#
1. "initTest" message is sent from the master client to the server (1 message only)
2. "initTest" message is broadcasted from the server to all clients (60 messages).
3. Each client sends x number of "broadcast" messages to the server with specified interval (60 messages at a time)
   With interval of 500ms and 30 messages total, that amounts to 1800 messages sent from all clients combined.
4. The server broadcasts "receiveMessage" for each broadcast message it receives (3600 messages for each 60 send from client).
   With interval of 500ms and 30 messages total that amounts to 108000 messages sent from the server to all clients combined.
5. Each client sends 1 "complete" message to the server upon receiving a response on the final "broadcast" (60 messages).
6. When all clients are completed, the server broadcasts a "harvest" message to all clients (60 messages).
7. Each browser sends one "getData" message to the server (30 messages).
8. When all browsers has sent their data, the server broadcasts a "harvestComplete" message to all clients (60 messages).


#SignalR#


##WebSockets##

###From clients to server### 

* InitTest (1 msg) message:  132 bytes (packet no 746)
* Broadcast message (1800 msgs): 231 bytes (packet no 753). 1800 x 231 = 415800 bytes total
* Complete message (60 msgs): 105 bytes (packet no 866). 105 x 60 = 6300 bytes
* GetData message (30 msgs): 128 bytes (packet no 876). 128 bytes x 30 = 3840 bytes

Total: 425940 bytes.

###From server to clients###

* InitTest message (60 msgs): 319 bytes (packet no 748-751). 319 x 60 = 19140 bytes.
* ReceiveMessage (108000 msgs): (varies) 713 bytes (packet no 756, 757, 759-762, 764 and 765) for the first reply only.
  597 bytes (packet no 768-769 and 771-774)
  Using 597 as basis as the number varies: 597 x 109000 = 64476000 bytes.
* Harvest message (60 msgs): 433 bytes (packet no 867, 868, 870, 871, 873 and 874). 433 x 60 = 25980 bytes
* Harvest complete message (60 msgs): 632 bytes (packet no 877, 878 and 880-883) in capture 632 bytes x 60 = 52440 bytes.

Total: 64556360 bytes.

Overall: 64982300

Total bytes in test capture counting from the connect call: 14960

##Server Sent Events##

###From clients to server###

* InitTest message (1 msg): 1025 bytes (packet no 331 and 339).
* Broadcast message (1800 msgs): 1174 bytes (packet no 337 and 346). 1800 x 1174 bytes = 2113200
* Complete message (60 msgs): 987 bytes (packet no 422 and 428). 987 x 60 = 59220 bytes
* GetData message (30 msgs): 1033 bytes (packet no 430 and 436). 1033 x 30 = 30990

Total: 2204435 bytes.

###From server to clients###

* InitTest message (60 msgs): 336 bytes (packet no 332-334 and 336). 336 x 60 = 20160 bytes
* ReceiveMessage (108000 msgs): (varies) 1152 bytes (packet no 338, 341-343 and 345) for the first reply only.
  785 bytes (packet no 349-351 and 353)
  Using 785 bytes as basis as the number varies. 785 x 108000 = 84780000 bytes.
* Harvest message (60 msgs): 632 bytes (packet no 423, 424, 426 and 427). 632 x 60 = 37920 bytes.
* Harvest complete message (60 msgs): 833 bytes (packet no 431 - 433 and 435). 833 x 60 = 49980.

Total: 84888060 bytes.

Overall: 87092495

Total bytes in test capture counting from the connect call: 29066

##Long-Polling##

###From clients to server###

* InitTest message (1 msg): 1016 bytes (packet no 253 and 259).
* Broadcast message (1800 msgs): 1165 bytes (packet no 260 and 263) 1165 x 1800 = 2097000 bytes.
* Complete message (60 msgs): 978 bytes (packet no 391 and 398) 978 x 60 = 58680 bytes.
* GetData message (30 msgs): 1025 bytes (packet no 401 and 409). 1025 x 30 = 30750 bytes.

Total: 2187446 bytes

###From server to clients###

* InitTest message (60 msgs): 1501 bytes (packet no 247, 248 and 254 - 257). 1501 x 60 = 90060 bytes.
* ReceiveMessage (108000 msgs): (varies): 2377 (packet no 261, 262, 266, 267, 269, 270, 272 and 273) for the first reply only.
  2011 bytes (packet no 276, 277, 279-281, 283, and 286).
  Using 2011 bytes as basis as the number varies. 2011 x 108000 = 217188000
* Harvest message (60 msgs): 1797 bytes (packet no 392 - 396, and 400). 1797 x 60 = 107820.
* Harvest complete message (60 msgs): 1999 (packet no 402, 405 - 407, 410 and 411). 1999 x 60 = 119940 bytes.

Total: 217505820 bytes.

Overall: 219693266

Total bytes in test capture counting from the connect call: 45879

#Socket.IO#

##WebSockets##

###From clients to server###

* InitTest message (1 msg): 124 bytes (packet no 793)
* Broadcast message (1800 msgs): 223 bytes (packet no 795). 223 x 1800 = 401400 bytes.
* Complete message (60 msgs): 96 bytes (packet no 825). 96 x 60 = 5760 bytes.
* GetData message (30 msgs): 119 bytes (packet no 827). 119 x 30 = 3570 bytes.

Total: 410854 bytes

###From server to clients###

* InitTest message (60 msgs): 100 bytes (packet no 794). 100 x 60 = 6000 bytes
* ReceiveMessage (108000 msgs): 242 bytes (packet no 796). 242 x 108000 = 26136000 bytes
* Harvest message (60 msgs): 78 bytes (packet no 826). 78 x 60 = 4680 bytes.
* Harvest complete message (60 msgs): 287 bytes (packet no 828). 287 x 60 = 17220 bytes.

Total: 26163900 bytes.

Overall: 26574754

Total bytes in test capture counting from the connect call: 6979

##Long-Polling##

###From clients to server###

* InitTest message (1 msg): 871 bytes (packet no 456 and 457).
* Broadcast message (1800 msgs): 969 bytes (packet no 459 and 461). 969 x 1800 = 1744200 bytes.
* Complete message (60 msgs): 843 bytes (packet no 514 and 516). 843 x 60 = 50580 bytes.
* GetData message (30 msgs): 866 bytes (packet no 518 and 520). 866 x 30 = 25980 bytes.

Total: 1821632 bytes.

###From server to clients###

* InitTest message (60 msgs): 807 bytes (packet no 452, 453, and 458). 807 x 60 = 48420 bytes
* ReceiveMessage (108000 msgs): 948 bytes (packet no 460, 462 and 464). 948 x 108000 = 102384000 bytes.
* Harvest message (60 msgs): 725 bytes (packet no 515 and 517). 725 x 60 = 43500 bytes.
* Harvest complete message (60 msgs): 933 (packet no 519 and 521). 933 x 60 = 55980 bytes.

Total: 102531900 bytes.

Overall: 104353532

Total bytes in test capture counting from the connect call: 26541

##Polling##

###From clients to server###

* InitTest message (1 msg): 922 bytes (packet no 396 and 397).
* Broadcast message (1800 msgs): 1113 bytes (packet no 400 and 401). 1113 x 1800 = 2003400 bytes.
* Complete message (60 msgs): 877 bytes (packet no 458 and 459). 877 x 60 = 52620 bytes.
* GetData message (30 msgs): 926 bytes (packet no 462 and 463). 926 x 30 = 27780 bytes.

Total: 2084722

###From server to clients###

* InitTest message (60 msgs): 799 bytes (packet no 392, 393 and 398). 799 x 60 = 47940 bytes.
* ReceiveMessage (108000 msgs): 956 bytes (packet no 399 402 and 404) 956 x 108000 = 103248000 bytes.
* Harvest message (60 msgs): 713 bytes (packet no 457 and 460). 713 x 60 = 42780 bytes.
* Harvest complete message (60 msgs): 940 bytes (packet no 462 and 464). 940 x 60 = 56400 bytes.

Total: 103395120

Overall: 105479842

Total bytes in test capture counting from the connect call: 28274



####Template (delete this)####

###From clients to server###

* InitTest message (1 msg):
* Broadcast message (1800 msgs):
* Complete message (60 msgs):
* GetData message (30 msgs):

Total:

###From server to clients###

* InitTest message (60 msgs):
* ReceiveMessage (108000 msgs):
* Harvest message (60 msgs):
* Harvest complete message (60 msgs):

Total:

Overall: 

Total bytes in test capture counting from the connect call:


NOTE: Messages vary a couple of bytes depending on message and client ids.
Should have made it a more static format (ex. m0001c0001 instead of m1c1)

NOTE: Hard to predict exact behavior with WS - can vary up to 120, maybe 180 bytes for each "response", can be 3-8 packets. 120 * 7200 = 864000 bytes.
This variation seems to be with other transports as well, but the insecurity in ignoring some of these, will not be significant. It is mostly a set behavior.

NOTE: Some of the variation is due to SignalR cursor messages

NOTE: There are some sporadic TCP packets going from the client to the server. These seem to be similar across all the transports (54 bytes) and at same interval.

NOTE: GetData message is less in capture with one browser. A full test will contain an array more like this: [911,285,519,447,418,428,357,256] totalling 58 extra bytes pr message.

NOTE: Harvest complete message is also less in capture with one browser. A full test will contain arrays for sent/received like this: [120, 120, 120, 120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120] - with spaces for some reason. Sent from server will be this: [7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200] whilst the latencyData will be like in the NOTE above. Totally, this will accumulate an extra 242 bytes pr. message.