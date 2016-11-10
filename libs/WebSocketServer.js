'use strict';

var WebSocketServer = require('ws');

var wss = null;
var clients = [];
var $this = null;

function WSS(port){
  $this = this;
  wss = new WebSocketServer.Server({ port: port });
};

WSS.prototype.onConnection = (callback) => {
  wss.on('connection', (ws) => {
    console.log('New client connected : ' + ws.upgradeReq.connection.remoteAddress);

    clients.push(ws);

    ws.on('close', () => {
      console.log('Client ' + ws.upgradeReq.connection.remoteAddress + ' closed connection.');
      var index = clients.indexOf(ws);
      if (index > -1) {
        clients.splice(index, 1);
      }
    });
    
    if(typeof callback === "function")
      callback(ws);
  });

  wss.on('error', (error) => {
    console.log(error);
  });
};


WSS.prototype.onMessage = (callback) => {
  wss.on('message', callback);
};

WSS.prototype.getClients = () => {
  return clients;
};

WSS.prototype.send = (client, message) => {
  try {
    client.send(message);
  } catch(error) {
    removeFromArray(clients, client);
    console.log(error);
  }
};

WSS.prototype.broadcast = (message) => {
  clients.forEach((client) => {
    $this.send(client, message);
  });
};

function removeFromArray(array, element){
  var index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
};

module.exports = WSS;
