#RealCpuWS
RealCpuWS is a simple Node.js app, which demonstrate how to tie together WebSocket Server and JavaScript Web Client.

Application reads cpu usage and send it over WebSocket connection to all connected clients.

![alt tag](https://github.com/babell00/RealCpuWS/blob/master/screen1.png)

###Downloading App
```
git clone https://github.com/babell00/RealCpuWS.git
```

###Installing
```
cd RealCpuWS
npm install
```

###Starting WebSocket Server
```
node app.js
```

###Running client with gulp
```
gulp
```
Gulp will start server. Server can be accessed at http://localhost:3000

###Running client normally :P
double click on index.html in web_client folder.
