'use strict';

var os = require('os');

var $this = null
var lastTimes = [];

function CpuUtils(){
  $this = this;
}

CpuUtils.prototype.getCoresUsage = () => {
  var cpus = os.cpus();
  var cores = [];
  if(lastTimes.length < cpus.length){
    cpus.forEach((c) => {
      var currentTimes = calculateCurrentTimes(c.times);
      lastTimes.push(currentTimes);
    });
  }
  return getCoresData(cpus);
}

//Helper functions
function getCoresData(cpus){
  var _cores = []
  for(var i = 0; i < cpus.length; i++) {
    var idle = calculateIdlePercentageForCore(cpus[i].times, i);
    var core = {
      core: i,
      idle: idle,
      usage: 100 - idle
    };
    _cores.push(core);
  }
  return _cores;
}

function calculateIdlePercentageForCore(currentTimes, i){
  var newTimes = calculateCurrentTimes(currentTimes);
  var dTotalTime = newTimes.total - lastTimes[i].total;
  var dIdleTime = newTimes.idle - lastTimes[i].idle;

  lastTimes[i] = newTimes;
  return (dIdleTime * 100) / dTotalTime;
}

function calculateCurrentTimes(times){
  var newTotalTime = 0;

  for(var type in times) {
    newTotalTime += times[type];
  }
  return  {total: newTotalTime, idle: times['idle']};
}


module.exports = CpuUtils;
