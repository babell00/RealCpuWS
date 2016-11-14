'use strict';

var WebSocketServer = require('ws');

var wss = null;
var clients = [];

function WSS(port){
  wss = new WebSocketServer.Server({ port: port });
};

//initialize WebSocker Server
WSS.prototype.initWS = () => {
  wss.on('connection', (ws) => {
    console.log('New client connected : ' + ws.upgradeReq.connection.remoteAddress);

    //add new client to clients array
    clients.push(ws);

    addOnCloseListener(ws);
  });

  wss.on('error', (error) => {
    console.log(error);
  });
};

//function send message(cpu data) to client
function send(client, message) {
  try {
    client.send(message);
  } catch(error) {
    removeFromArray(clients, client);
    console.log(error);
  }
};

//function sends message(cpu data) to all connected clients(from clients array)
WSS.prototype.broadcast = (message) => {
  clients.forEach((client) => {
    send(client, message);
  });
};

//function adds onClose Listener, and remove client from clients array
function addOnCloseListener(ws) {
  ws.on('close', () => {
    console.log('Client ' + ws.upgradeReq.connection.remoteAddress + ' closed connection.');
    var index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });
}

//helper function to remove elemte from array
function removeFromArray(array, element){
  var index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
};

module.exports = WSS;
