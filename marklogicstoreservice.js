
var ROSLIB = require("roslibjs");
var mljs = require("mljs");

// 1. Set up MLJS connection to server

// One connection per service
// TODO parameters from command line

var db = new mljs();
db.configure({port: 9898, database: "rostestdb"}); // aim at the right rest server port, and thus the right DB. 'database' is ignored (only used by create() and exists())

// 2. Create service in ROS using roslibjs

//console.log("ROSLIB type: " + typeof(ROSLIB));
//console.log("ROSLIB ROS type: " + typeof(ROSLIB.Ros));

//for (var a in ROSLIB) {
//  console.log(a + ": " + ROSLIB[a]);
//}

// NB using Publish/Subscribe instead of a service for two reasons:-
// 1. Can't seem to create a service in roslibjs, only consume one
// 2. The MLJS library is callback based, thus a better match for messaging integration

var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9085'
});

var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/marklogicstore',
  messageType : 'std_msgs/String' // TODO Check if we can just declare this as JSON?
});

listener.subscribe(function(message) {
  console.log('Received message on ' + listener.name + ': ' + message.data);
  //listener.unsubscribe();
  
  // now send this to MarkLogic
  var json = JSON.parse(message.data);
  // assume json = { uri: "/some/doc/uri.xml", type: "xml|json|text|binary", data: xmlOrJsonAsStringOrHexAsBinary, collection: "first,second"]}
  
  var data = null;
  var props = {collection: json.collection};
  if ("json" == json.type) {
    data = JSON.parse(json.data);
  } else if ("xml" == json.type) {
    data = db.textToXml(json.data);
  } else if ("text" == json.type) {
    data = json.data;
  } else {
    // binary
    props.format = "binary";
    data = json.data; // do something to convert the data as necessary (assuming it's hex encoded here)
  }
  db.save(data,json.uri,props,function(result) {
    console.log("Save worked?: " + !result.inError);
  });
});
