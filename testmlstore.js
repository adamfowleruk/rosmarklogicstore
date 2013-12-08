
var ROSLIB = require("roslibjs");

var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9090'
});

var publisher = new ROSLIB.Topic({
  ros : ros,
  name : '/marklogicstore',
  messageType : 'std_msgs/String' // TODO Check if we can just declare this as JSON?
});

// publish a couple of messages for documents

var msg1 = {message: "Random message 1"};
var msg2 = {message: "Random message 2"};

var m1 = {uri: "/message/1.json", collection: "rosdocs", type: "json", data: JSON.stringify(msg1)};
var m2 = {uri: "/message/2.json", collection: "rosdocs", type: "json", data: JSON.stringify(msg2)};

var rm1 = ROSLIB.Message(JSON.stringify(m1));
var rm2 = ROSLIB.Message(JSON.stringify(m2));

publisher.publish(rm1);
publisher.publish(rm2);
