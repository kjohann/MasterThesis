#How the test works#
1. "initTest" message is sent from the master client to the server (1 message only)
2. "initTest" message is broadcasted from the server to all clients (60 messages).
3. Each client sends x number of "broadcast" messages to the server with specified interval (60 messages at a time)
   With interval of 500ms and 30 messages total, that amounts to 1800 messages sent from all clients combined.
4. The server broadcasts "receiveMessage" for each broadcast message it receives (3600 messages for each 60 send from client).
5. Each client sends 1 "complete" message to the server upon receiving a response on the final "broadcast" (60 messages).
6. When all clients are completed, the server broadcasts a "harvest" message to all clients (60 messages).
7. Each browser sends one "getData" message to the server (30 messages).
8. When all browsers has sent their data, the server broadcasts a "harvestComplete" message to all clients (60 messages).


#SignalR#


##WebSockets##

###From clients to server###

* InitTest message:  192 bytes (packet no 746 adn 747)
* Broadcast message: 393 bytes (packet no 753, 758, 763 and 766 is the first). 1800 x 393 = 707400 bytes total
* Complete message: 267 bytes (packet no 866, 869, 872 and 875). 105 x 60 = 16020 bytes
* GetData message: 236 bytes (packet no 876, 879 and 884) in capture => 294 after correction to account for larger latencyData array.
  294 bytes * 30 = 8820 bytes

Total: 192 + 707400 + 16020 + 8820 = 732432 bytes.

###From server to clients###

* InitTest message: 319 bytes (packet no 748-751). 319 x 60 = 19140 bytes.
* ReceiveMessage: (varies) 773 bytes (packet no 755-757, 759-762, 764 and 765) for the first reply only.
  597 bytes (packet no 768-769 and 771-774)
  Using 597 as basis, the number varies: 597 x 7200 = 4298400 bytes.
* Harvest message: 433 bytes (packet no 867, 868, 870, 871, 873 and 874). 433 * 60 = 25980 bytes
* Harvest complete message: 632 bytes (packet no 877, 878 and 880-883) in capture => 874 bytes after correction to account for larger data arrays.
  874 bytes * 60 = 52440 bytes.

Total: 19140 + 4298400 + 25980 + 52440 = 4395960 bytes.


####Template (delete this)####

###From clients to server###

* InitTest message:
* Broadcast message:
* Complete message:
* GetData message:

###From server to clients###

* InitTest message:
* ReceiveMessage:
* Harvest message:
* Harvest complete message:


NOTE: Messages vary a couple of bytes depending on message and client ids.
Should have made it a more static format (ex. m0001c0001 instead of m1c1)

NOTE: Hard to predict exact behavior with WS - can vary up to 120, maybe 180 bytes for each "response", can be 3-8 packets. 120 * 7200 = 864000 bytes. 
There are also some sporadic TCP messages going from the server from the client. These are 60 bytes each.

NOTE: Some of the variation is due to SignalR cursor messages

NOTE: GetData message is less in capture with one browser. A full test will contain an array more like this: [911,285,519,447,418,428,357,256] totalling 58 extra bytes pr message.

NOTE: Harvest complete message is also less in capture with one browser. A full test will contain arrays for sent/received like this: [120, 120, 120, 120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120 ,120] - with spaces for some reason. Sent from server will be this: [7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200,7200] whilst the latencyData will be like in the NOTE above. Totally, this will accumulate an extra 242 bytes pr. message.