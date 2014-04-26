#Project part 1: Hands on development#

This folder contains all code and results concerning the first part of my project. 

##Problem statements##

Two problem statements from the thesis is about this part. The following text is from the thesis itself:

<b>I: How are the frameworks that are featured in this thesis with respect to
usability?</b>
<br>Usability is a nuanced property of a framework. Some people may regard certain
aspects, like programming environment, important, while others are indifferent
towards it. In this thesis, I will evaluate the usability of each framework based on my
opinions. However, I will strive to do so within objective boundaries, discussing each
usability property thoroughly.

<b>III: Are there any real time web applications that may benefit from not
using the aid a framework provides?</b>
<br>If the functionality you need is simple, does your project benefit from an extra
dependency? Or can you make it yourself without much extra work? Sometimes you
would like as few dependencies as possible. But if it takes up a lot of time to do
something yourself, a framework may be a better solution.

##Test application##

In order to answer problem statements I and III, I developed an application with each framework. 
The application is an auction house and it has the following requirements specification: 
* Users must receive real time updates regarding all global events.
* Global events are defined as all actions except from logging in and registering a
new user.
* Users must be able to register an account and log in.
* Users must be able to add and remove items.
* Users can only remove an item added by themselves.
* An item does at least have the following properties: name, minimum price, info
about who added it and who has the leading bid.
* Users must be able to place bids on all items, including their own.
* If the framework does not specify a specific template language or other means of
creating a user interface, the application will utilize a common user interface
implemented with Knockout [66] 17.
* MySql will be utilized as database unless implementing it requires substantial
workarounds, that may cause the framework to misbehave.
* All applications should have tests covering the most critical aspects of the
program logic.

##Folders##
The different folders contain the following:

* AuctionHouseUI: Has all files for a common user interface implemented with Knockout. Not all of the test applications used this.
* FunctionalTestCase: A Maven test project with some functional tests for the test applications (not Meteor).
* Lightstreamer_TestApp: The auction house implemented with Lightstreamer.
* Meteor_TestApp: The auction house implemented with Meteor.
* Playframework_TestApp: The auction house implemented with Play.
* SignalR_Testapp: The auction house implemented with SignalR.
* Socket.IO_TestApp: The auction house implemented with Socket.IO.