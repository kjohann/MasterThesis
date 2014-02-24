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
* Broadcast message (1800 msgs): 231 bytes (packet no 753 is the first). 1800 x 231 = 415800 bytes total
* Complete message (60 msgs): 105 bytes (packet no 866). 105 x 60 = 6300 bytes
* GetData message (30 msgs): 128 bytes (packet no 876). 128 bytes x 30 = 3840 bytes

Total: 132 + 415800 + 6300 + 3840 = 425940 bytes.

###From server to clients###

* InitTest message (60 msgs): 319 bytes (packet no 748-751). 319 x 60 = 19140 bytes.
* ReceiveMessage (108000 msgs): (varies) 713 bytes (packet no 756, 757, 759-762, 764 and 765) for the first reply only.
  597 bytes (packet no 768-769 and 771-774)
  Using 597 as basis as the number varies: 597 x 109000 = 64476000 bytes.
* Harvest message (60 msgs): 433 bytes (packet no 867, 868, 870, 871, 873 and 874). 433 x 60 = 25980 bytes
* Harvest complete message (60 msgs): 632 bytes (packet no 877, 878 and 880-883) in capture 632 bytes x 60 = 52440 bytes.

Total: 19140 + 64476000 + 25980 + 52440 = 64556360 bytes.

Total bytes in test capture counting from the connect call: 14352

##Server Sent Events##

###From clients to server###

* InitTest message (1 msg): 965 bytes (packet no 331).
* Broadcast message (1800 msgs): 1114 bytes (packet no 337 is the first). 1800 x 1114 bytes = 2005200
* Complete message (60 msgs): 927 bytes (packet no 422). 927 x 60 = 55602 bytes
* GetData message (30 msgs): 973 bytes (packet no 430). 973 x 30 = 29190

Total: 965 + 2005200 + 55602 + 29190 = 2090957 bytes.

###From server to clients###

* InitTest message (60 msgs): 336 bytes (packet no 332-334 and 336)
* ReceiveMessage (108000 msgs): (varies) 1272 bytes (packet no 338, 339, 341-343, 345 and 346) for the first reply only.
  845 bytes (packet no 349-351, 353 and 354)
  Using 845 bytes as basis as the number varies. 845 x 108000 = 91260000 bytes.
* Harvest message (60 msgs): 692 bytes (packet no 423, 424 and 426-428). 692 x 60 = 41520 bytes.
* Harvest complete message (60 msgs): 893 bytes (packet no 431 - 433, 435 and 436). 893 x 60 = 53580.

Total: 336 + 91260000 + 41520 + 53580 = 91355436 bytes.

Total bytes in test capture counting from the connect call: 28458

##Long-Polling##

###From clients to server###

* InitTest message (1 msg): 956 bytes (packet no 253).
* Broadcast message (1800 msgs): 1105 bytes ( packet no 260) 1105 x 1800 = 1989000 bytes.
* Complete message (60 msgs): 918 bytes (packet no 391) 918 x 60 = 55080 bytes.
* GetData message (30 msgs): 965 bytes (packet no 401). 965 x 30 = 28950 bytes.

Total: 2073986 bytes

###From server to clients###

* InitTest message (60 msgs): 1561 bytes (packet no 247, 248 (poll request), 254 - 257 and 259). 1561 x 60 = 93660 bytes.
* ReceiveMessage (108000 msgs): (varies): 2437 (packet no 261 - 263, 266, 267, 269, 270, 272 and 273) for the first reply only.
  2071 bytes (packet no 276, 277, 279-281, 283, 284 and 286).
  Using 2071 bytes as basis as the number varies. 2071 x 108000 = 223668000
* Harvest message (60 msgs): 1857 bytes (packet no 392 - 396, 398 and 400). 1857 x 60 = 111420.
* Harvest complete message (60 msgs): 2059 (packet no 402, 405 - 407 and 409 - 411). 2059 x 60 = 123540 bytes.

Total: 223996620 bytes.

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

Total bytes in test capture counting from the connect call: 6979

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

Total bytes in test capture counting from the connect call:


NOTE: Messages vary a couple of bytes depending on message and client ids.
Should have made it a more static format (ex. m0001c0001 instead of m1c1)

NOTE: Hard to predict exact behavior with WS - can vary up to 120, maybe 180 bytes for each "response", can be 3-8 packets. 120 * 7200 = 864000 bytes.
This variation seems to be with other transports as well, but the insecurity in ignoring some of these, will not be significant. It is mostly a set behavior.

NOTE: Some of the variation is due to SignalR cursor messages

NOTE: There are some sporadic TCP packets going from the client to the server. These seem to be similar across all the transports (54 bytes) and at same interval.

NOTE: GetData message is less in capture with one browser. A full test will contain an array more like this: [911,285,519,447,418,428,357,256] totalling 58 extra bytes pr message.

NOTE: Harvest complete message is also less in capture with one browser. A full test will contain arrays for sent/received like this: [120, 120, 120, 120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120] - with spaces for some reason. Sent from server will be this: [7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200] whilst the latencyData will be like in the NOTE above. Totally, this will accumulate an extra 242 bytes pr. message.