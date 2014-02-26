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

##Http-Streaming using IE##

###From clients to server###

NOTE: There is a TCP packet of 744 (in one case 743) being sent along with each post. I believe that this is part of the post request.

* InitTest message (1 msg): 991 bytes (packet no 89, 90 and 100).
* Broadcast message (1800 msgs): 1140 bytes (packet no 96, 97 and 104). 1140 x 1800 = 2052000 bytes.
* Complete message (60 msgs): 953 bytes (packet no 213, 214 and 223). 953 x 60 = 57180 bytes.
* GetData message (30 msgs): 1000 bytes (packet no 225, 226 and 238). 1000 x 30 = 30000 bytes.

Total: 2140171

###From server to clients###

* InitTest message (60 msgs): 294 bytes (packet no 92-94). 294 x 60 = 17640 bytes.
* ReceiveMessage (108000 msgs): (varies): 1230 (packet no 98, 99, 102, 103, 105 and 106) for the first reply only.
  863 bytes (packet no 112, 113 and 115 - 117).
  Using 863 bytes as basis as the number varies. 863 x 108000 = 93204000
* Harvest message (60 msgs): 710 bytes (packet no 215-217, 219 and 220). 710 x 60 = 42600 bytes.
* Harvest complete message (60 msgs): 912 bytes (packet no 227, 232 - 234 and 236). 912 x 60 = 54720 bytes.

Total: 93301614

Overall: 95441785

Total bytes in test capture counting from the connect call: 30353

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

#Play#

##WebSockets##

###From clients to server###

* InitTest message (1 msg): 136 bytes (packet no 474).
* Broadcast message (1800 msgs): 235 bytes (packet no 477). 235 x 1800 = 423000 bytes.
* Complete message (60 msgs): 108 bytes (packet no 498). 108 x 60 = 6480 bytes.
* GetData message (30 msgs): 132 bytes (packet no 500). 132 x 30 = 3960 bytes.

Total: 433576

###From server to clients###

* InitTest message (60 msgs): 177 bytes (packet no 475 and 476). 117 x 60 = 10620 bytes.
* ReceiveMessage (108000 msgs): 256 bytes (packet no 479 -> a 60 byte TCP package is sent along with the first message, but none of the others).
  256 x 108000 = 27648000 bytes.
* Harvest message (60 msgs): 92 bytes (packet no 499). 92 x 60 = 5520 bytes.
* Harvest complete message (60 msgs): 300 bytes (packet no 501). 300 x 60 = 18000 bytes.

Total: 27682140

Overall: 28115716

Total bytes in test capture counting from the connect call: 6949

##Http-Streaming##

###From clients to server###

* InitTest message (1 msg): 748 bytes (packet no 370 and 373).
* Broadcast message (1800 msgs): 846 bytes (packet no 374 and 376). 846 x 1800 = 1522800 bytes.
* Complete message (60 msgs): 720 bytes (packet no 418 and 419). 720 x 60 = 43200 bytes.
* GetData message (30 msgs): 745 bytes (packet no 422 and 423). 745 x 30 = 22350 bytes.

Total: 1589098

###From server to clients###

* InitTest message (60 msgs): 243 bytes (packet no 371 and 372). 243 x 60 = 14580 bytes.
* ReceiveMessage (108000 msgs): 321 bytes (packet no 378 -> -> a 60 byte TCP package is sent along with the first message, but none of the others).
  321 x 108000 = 34668000 bytes.
* Harvest message (60 msgs): 158 bytes (packet 421). 158 x 60 = 9480 bytes.
* Harvest complete message (60 msgs): 366 bytes (packet no 425). 366 x 60 = 21960 bytes.

Total: 34714020

Overall: 36303118

Total bytes in test capture counting from the connect call: 21668

#Lightstreamer#

##WebSockets##

###From clients to server###

* InitTest message (1 msg): 162 bytes (packet no 462).
* Broadcast message (1800 msgs): 262 bytes (packet no 470). 262 x 1800 = 471600 bytes.
* Complete message (60 msgs): 134 bytes (packet no 500). 134 x 60 = 8040 bytes.
* GetData message (30 msgs): 161 bytes (packet no 502). 161 x 30 = 4830 bytes.

Total: 484632

###From server to clients###

* InitTest message (60 msgs): 188 bytes (packet no 468 and 469). 188 x 60 = 11280 bytes.
* ReceiveMessage (108000 msgs): 267 (packet no 472 -> a 60 byte TCP package is sent along with the first message, but none of the others).
  267 x 108000 = 28836000 bytes.
* Harvest message (60 msgs): 102 bytes (packet no 501). 102 x 60 = 6120 bytes.
* Harvest complete message (60 msgs): 316 bytes (packet no 503). 316 x 60 = 18960 bytes.

Total: 28872360

Overall: 29356992

Total bytes in test capture counting from the connect call: 12735

##Http-Streaming##

###From clients to server###

* InitTest message (1 msg): 1466 bytes (packet no 384 and 385).
* Broadcast message (1800 msgs): 1615 bytes (packet no 390 and 391). 1615 x 1800 = 2907000 bytes.
* Complete message (60 msgs): 1429 bytes (packet no 446 and 447). 1429 x 60 = 85740 bytes.
* GetData message (30 msgs): 1476 bytes (packet no 451 and 452). 1476 x 30 = 44280 bytes.

Total: 3038486

###From server to clients###

* InitTest message (60 msgs): 225 bytes (packet no 386 and 389). 225 x 60 = 13500 bytes.
* ReceiveMessage (108000 msgs): 362 bytes (packet no 392 and 394). 362 x 108000 = 39096000 bytes.
* Harvest message (60 msgs): 200 bytes (packet no 448 and 449). 200 x 60 = 12000 bytes
* Harvest complete message (60 msgs): 413 bytes (packet no 453 and 454). 413 x 60 = 24780 bytes.

Total: 39146280

Overall: 42184766

Total bytes in test capture counting from the connect call: 34364

##WS-Polling##

###From clients to server###

* InitTest message (1 msg): 162 bytes (packet no 317).
* Broadcast message (1800 msgs): 262 bytes (packet no 321). 262 x 1800 = 471600 bytes.
* Complete message (60 msgs): 134 bytes (packet no 361). 134 x 60 = 8040 bytes.
* GetData message (30 msgs): 161 bytes (packet no 365). 161 x 30 = 4830 bytes.

Total: 484632

###From server to clients###

* InitTest message (60 msgs): 491 bytes (packet no 313, 318 and 319). 491 x 60 = 29460 bytes.
* ReceiveMessage (108000 msgs): 628 bytes (packet no 320, 322 and 323). 628 x 108000 = 67824000 bytes.
* Harvest message (60 msgs): 465 bytes (packet no 360, 362 and 363). 465 x 60 = 27900 bytes.
* Harvest complete message (60 msgs): 677 (packet no 364, 366 and 367). 677 x 60 = 40620 bytes.

Total: 67921980

Overall: 68406612

Total bytes in test capture counting from the connect call: 17458

##Polling##

###From clients to server###

* InitTest message (1 msg): 1466 bytes (packet no 345 and 346). 
* Broadcast message (1800 msgs): 1615 bytes (packet no 353 and 354). 1615 x 1800 = 2907000 bytes.
* Complete message (60 msgs): 1429 bytes (packet no 429 and 430). 1429 x 60 = 85740 bytes.
* GetData message (30 msgs): 1476 bytes (packet no 435 and 436). 1476 x 30 = 44280 bytes.

Total: 3038486

###From server to clients###

* InitTest message (60 msgs): 1581 bytes (packet no 348, 349 and 351). 1581 x 60 = 94860 bytes.
* ReceiveMessage (108000 msgs): 1718 bytes (packet no 356, 357 and 359). 1718 x 108000 = 185544000 bytes.
* Harvest message (60 msgs): 1495 bytes (packet no 432 and 433). 1495 x 60 = 89700 bytes.
* Harvest complete message (60 msgs): 1707 bytes (packet no 438 and 439). 1707 x 60 = 102420 bytes.

Total: 185830980

Overall: 188869466

Total bytes in test capture counting from the connect call: 72617

#SockJS#

##WebSockets##

###From clients to server###

* InitTest message (1 msg): 110 bytes (packet no 373).
* Broadcast message (1800 msgs): 223 bytes (packet no 375). 223 x 1800 = 401400 bytes.
* Complete message (60 msgs): 80 bytes (packet no 419). 80 x 60 = 4800 bytes.
* GetData message (30 msgs): 105 bytes (packet no 421). 105 x 30 = 3150 bytes.

Total: 409460

###From server to clients###

* InitTest message (60 msgs): 89 bytes (packet no 374). 89 x 60 = 5340 bytes.
* ReceiveMessage (108000 msgs): 247 bytes (packet no 376). 247 x 108000 = 26676000 bytes.
* Harvest message (60 msgs): 74 bytes (packet no 420). 74 x 60 = 4440 bytes. 
* Harvest complete message (60 msgs): 290 bytes (packet no 422). 290 x 60 = 17400 bytes.

Total: 26703180

Overall: 27112640

Total bytes in test capture counting from the connect call: 6580

##Http-Streaming##

###From clients to server###

* InitTest message (1 msg): 947 bytes (packet no 330 and 332). 
* Broadcast message (1800 msgs): 1059 bytes (packet no 333 and 334). 1059 x 1800 = 1906200 bytes.
* Complete message (60 msgs): 917 bytes (packet no 375 and 376). 917 x 60 = 55020 bytes.
* GetData message (30 msgs): 943 bytes (packet no 379 and 380). 943 x 30 = 28290 bytes.

Total: 1990457

###From server to clients###

* InitTest message (60 msgs): 94 bytes (packet no 331). 94 x 60 = 5640 bytes.
* ReceiveMessage (108000 msgs): 250 bytes (packet no 344 -> the first two messages was responded to in the same TCP packet (446 bytes) - this only occured once)
  250 x 108000 = 27000000 bytes.
* Harvest message (60 msgs): 79 bytes (packet no 378). 79 x 60 = 4740 bytes.
* Harvest complete message (60 msgs): 294 bytes (packet no 382). 294 x 60 = 17640 bytes.

Total: 27028020

Overall: 29018477

Total bytes in test capture counting from the connect call: 21129

##Long-Polling##

###From clients to server###

* InitTest message (1 msg): 947 bytes (packet no 376 and 377)
* Broadcast message (1800 msgs): 1059 bytes (packet no 380 and 381). 1059 x 1800 = 1906200 bytes.
* Complete message (60 msgs): 917 bytes (packet no 464 and 465). 917 x 60 = 55020 bytes.
* GetData message (30 msgs): 945 bytes (packet no 475 and 476). 945 x 30 = 28350 bytes.

Total: 1990517

###From server to clients###

* InitTest message (60 msgs): 1042 bytes (packet no 371, 374, 377, 395). 1042 x 60 = 62520 bytes.
* ReceiveMessage (108000 msgs): 1138 bytes (packet no 396, 397 and 406). 1138 x 108000 = 122904000 bytes.
* Harvest message (60 msgs): 967 bytes (packet no 473, 474 and 478). 967 x 60 = 58020 bytes.
* Harvest complete message (60 msgs): 1184 bytes (packet no 479, 480 and 483). 1184 x 60 = 71040 bytes.

Total: 123095580

Overall: 125086097

Total bytes in test capture counting from the connect call: 31269

##Server Sent Events using Opera##

###From clients to server###

* InitTest message (1 msg): 944 bytes (packet no 147 and 148)
* Broadcast message (1800 msgs): 1056 bytes (packet no 159 and 162). 1056 x 1800 = 1900800 bytes.
* Complete message (60 msgs): 914 bytes (packet no 285 and 286). 914 x 60 = 54840 bytes.
* GetData message (30 msgs): 943 bytes (packet no 296 and 297). 943 x 30 = 28290 bytes.

Total: 1984874

###From server to clients###

* InitTest message (60 msgs): 349 bytes (packet no 149, 152, 153, 155 and 156). 349 x 60 = 20940 bytes.
* ReceiveMessage (108000 msgs): 625 bytes (packet no 160, 164, 165, 168, 170, 172 and 173). 625 x 108000 = 67500000 bytes.
* Harvest message (60 msgs): 274 bytes (packet no 288, 289, 292 and 294). 274 x 60 = 16440 bytes.
* Harvest complete message (60 msgs): 426 bytes (packet no 299, 300 and 303). 426 x 60 = 25560 bytes.

Total: 67562940

Overall: 69547814

Total bytes in test capture counting from the connect call: 25533

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

NOTE: WS-Polling keeps the initial WS-connection open - what is the benefit of using this transport then?