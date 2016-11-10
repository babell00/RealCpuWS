'use strict';

var os = require('os');

var WSS = require('./libs/WebSocketServer');
var CpuUtils = require('./libs/CpuUtils');

//How often message will be send to clinets in ms. e.g. 150ms
var updateInterval = 150;

//Listening port for WebSocket
var port = 8080;

//Create WebSocket Server
var wss = new WSS(port);

//Create CpuUtils instance
var cpuUtils = new CpuUtils();


wss.onConnection();

setInterval(() => {
  var cores = cpuUtils.getCoresUsage();
  wss.broadcast(JSON.stringify(cores));
}, updateInterval);
