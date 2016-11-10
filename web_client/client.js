'use strict';
var labels = [];
var data = [];
var myChart1;
var ctx1;
var count = 0;

var init = function(){
  console.log('kicked');
  if(!('WebSocket' in window)){
    console.log('not supported');
  } else {
    connect();
    function connect(){
      try{
        var socket = new WebSocket("ws://127.0.0.1:8080/");

        socket.onopen = function(){
          console.log('connected');
        }

        socket.onmessage = function(event){
          if(event){
            var res = JSON.parse(event.data);
            for(var i = 0; i < res.length; i++){
              data[i] = res[i].usage;
              labels[i] = 'core : ' + res[i].core;
            }
            myChart1.update();
            myChart2.update();
          }
        }

        socket.onclose = function(){
          console.log('closed');
          connect();
        }
      } catch(exception) {
        console.log(exception);
      }

    }
  }
}

window.addEventListener("load", init, false);
create1();


function create1(){
  ctx1 = document.getElementById("myChart1");
  myChart1 = new Chart(ctx1, {
    type: 'bar',

    data: {
      labels: labels,
      datasets: [{
        label: 'CPU Load',
        data: data,
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
