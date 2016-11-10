'use strict';

var dataset = {labels: [], usage: []};

var cpuBarChart;
var ctx;

//url pointing to WebSocket Server
var wsUrl = 'ws://127.0.0.1:8080/'

//init websocket connetion
var init = function(){
  if(!('WebSocket' in window)){
    console.log('WebSocket not supported');
  } else {
    connect();
  }
}

//attached socket to load event
window.addEventListener("load", init, false)

//function responsible for connectiong to WS
function connect(){
  try{
    var socket = new WebSocket(wsUrl);

    //when connection is established this event will be kicked
    socket.onopen = function(){
      console.log('Connected to ' + wsUrl);
    }

    //this function is executed when server send message
    socket.onmessage = function(event){
      if(event){
        var res = JSON.parse(event.data);

        for(var i = 0; i < res.length; i++){
          dataset.usage[i] = (res[i].usage);
          dataset.labels[i] = ('core : ' + res[i].core);
        }

        //update bar chart when new data/message is recived
        cpuBarChart.update();
      }
    }

    //kicked when connection is closed
    socket.onclose = function(){
      console.log('Connection closed');

      //If connection is closed function below will try to reconnect.
      connect();
    }
  } catch(exception) {
    console.log(exception);
  }
}

//Create Bar Chart
createBarChart();


function createBarChart(){
  console.log(dataset);
  ctx = document.getElementById("cpuBarChart");
  cpuBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataset.labels,
      datasets: [{
        label: 'CPU Load',
        data: dataset.usage,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 59, 164, 0.2)',
          'rgba(54, 162, 25, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 59, 164, 1)',
          'rgba(54, 162, 25, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: 100,
            beginAtZero:true
          }
        }]
      }
    }
  });
}
