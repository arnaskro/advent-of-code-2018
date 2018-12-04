var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8').split('\n');
var moment = require('moment');

const regex = {
  date: /\d+-\d+-\d+ \d+:\d+/,
  guard_shift: /Guard #(\d+)/,
  falls_asleep: /falls asleep/,
  wakes_up: /wakes/
}

const types = {
  GUARD_SHIFT: 'guard_shift',
  FALLS_ASLEEP: 'falls_asleep',
  WAKES_UP: 'wakes_up'
}

const parseData = line => {
  let parsedDate = line.match(regex.date)[0];
  let guard_id = line.match(regex.guard_shift) ? parseInt(line.match(regex.guard_shift)[1]) : false;
  let guard_shift = guard_id ? types.GUARD_SHIFT : false;
  let falls_asleep = line.match(regex.falls_asleep) ? types.FALLS_ASLEEP : false;
  let wakes_up = line.match(regex.wakes_up) ? types.WAKES_UP : false;
  
  return {
    date: moment(parsedDate),
    type: guard_shift || falls_asleep || wakes_up,
    id: guard_id
  }
};
const sortByDate = (a, b) => a.date.isBefore(b.date) ? -1 : 1;

const part1 = () => {
  let tempStartedSleeping, tempID, tempDiff, tempMinute;
  let sleepingEvents = {};
  let totalTimeSleeping = {};
  let data = input.map(parseData).sort(sortByDate)
  
  data.map((event, i) => {
    
    switch(event.type) {
      case types.FALLS_ASLEEP: {
        tempID = data[i-1].id || tempID;
        tempStartedSleeping = event.date;
      }; break;
      case types.WAKES_UP: {
        tempDiff = event.date.diff(tempStartedSleeping, 'minutes');
        for(var i = 0; i<tempDiff; i++) {
          tempMinute = parseInt(tempStartedSleeping.get('minutes'));
          
          if (sleepingEvents[tempID][tempMinute]) sleepingEvents[tempID][tempMinute]++;
          else sleepingEvents[tempID][tempMinute] = 1;

          if (totalTimeSleeping[tempID]) totalTimeSleeping[tempID]++;
          else totalTimeSleeping[tempID] = 1;
          
          tempStartedSleeping.add(1, 'minutes');
        }
      }; break;
      case types.GUARD_SHIFT: {
        tempID = event.id;
        if (!sleepingEvents[tempID]) sleepingEvents[tempID] = {};
      } break;
      default: break;
    }
  });
  
  let mostSleepyGuard = Object.keys(totalTimeSleeping).reduce((a, b) => totalTimeSleeping[a] < totalTimeSleeping[b] ? b : a);
  
  let sleepiestMinute = Object.keys(sleepingEvents[mostSleepyGuard]).reduce((a, b) => sleepingEvents[mostSleepyGuard][a] > sleepingEvents[mostSleepyGuard][b] ? a : b)

  console.log("Part1: " + sleepiestMinute * mostSleepyGuard) // 95199
}

part1();