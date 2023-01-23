function timeToString(time){
  time = new Date(time)
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()

  let timeString = ""
  let hourString = ""
  let minutesString = ""

  // définition de l'heure
  if (minutes <= 30){
    if (hours == 0){
      hourString = "Midnight"
    }
    else if (hours == 12){
      hourString = "Noon"
    }
    else{
      hourString = numberToString(hours % 12)
    }
  }
  else{
    if (hours == 11){
      hourString = "Noon"
    }
    else if(hours == 23){
      hourString = "Midnight"
    }
    else{
      hourString = numberToString((hours + 1) % 12)
    }
  }

  // définition de la minute
  
  if (minutes == 15 || minutes == 45)
  {
    minutesString = "Quarter"
  }
  else if(minutes > 0 && minutes < 30)
  {
    minutesString = numberToString(minutes)
  }
  else if( minutes > 30)
  {
    minutesString = numberToString(60 - minutes)
  }
  
  // définir l'heure complète
  if (minutes == 0){
    timeString = hourString + " o'clock"
  }
  else if(minutes == 30) {
    timeString = "Half past " + hourString;
  }
  else if(minutes < 30){
    timeString = minutesString;
    if(minutes !== 15)
       timeString += ' minute' + (minutes == 1 ? '' : 's')
    
    timeString += ' past ' + hourString

  }
  else{
    timeString = minutesString
    if(minutes !== 45)
      timeString += ' minute' + (60 - minutes == 1 ? '' : 's')
    
    timeString += ' to ' + hourString
  }

  if(hourString !== "Noon" && hourString !== "Midnight"){
    return timeString + (hours >= 12 ? " PM" : " AM");  
  }
  else{
    return timeString
  }
}

function numberToString(number){
  if(number > 60) return null;
  const zeroToThirty = {
    0: "Zero",
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
    20: "Twenty",
    40: "Forty",
    50: "Fifty",
  }

  let string = "";

  if(number < 20){
    string =  zeroToThirty[number]
  }
  else if(number % 10 != 0){
    string = `${zeroToThirty[parseInt(number / 10)*10]}-${zeroToThirty[number%10].toLowerCase()}`;
  }
  else {
    string = `${zeroToThirty[parseInt(number / 10)*10]}`;
  }
  return string;
}

function generate(){
  const time = new Date()
  time.setMinutes(60*Math.random())
  time.setSeconds(60*Math.random())
  time.setHours(24*Math.random())

  return time.toISOString();
}

function getValues(number)
{
  let correctValue = generate();

  // generate number - 1 values
  let otherValues = [];
  for(let i = 0; i < number - 1; i++){
    otherValues.push(generate());
  }

  // put the correct value in between
  let middleIndex = parseInt(otherValues.length * Math.random());
  let firstPart = otherValues.slice(0,middleIndex)
  let lastPart = otherValues.slice(middleIndex)

  return [correctValue, [...firstPart, correctValue, ...lastPart]];
}



class Question{
  constructor(){
    let random = Math.random();
    this.type = (random <= 0.5) ? 'manual' : 'picker';
    this.time = generate();
    if(this.type === 'manual'){
      let t = new Date(this.time)
      t.setSeconds(0);
      this.time = t.toISOString();
    }
    
    let length = random < 0.3 ? 3 : random < 0.7 ? 4 : 5;
    this.noises = [];
    
    
    for(let i = 0; i < length - 1; i++){
      this.noises.push(generate());
    }

    // put the correct value in between
    let middleIndex = parseInt(this.noises.length * Math.random());
    let firstPart = this.noises.slice(0,middleIndex)
    let lastPart = this.noises.slice(middleIndex)

    this.noises = [...firstPart, this.time, ...lastPart];
  }
  
  toString(){
    return timeToString(this.time);
  }

  check(time) {
    let time1 = new Date(time)
    let time2 = new Date(this.time);
    return time1.getHours() == time2.getHours() && time1.getMinutes() == time2.getMinutes();
  }

  checkWithNoise(value) {
    let idx = this.noises.indexOf(value);
    return this.noises[idx] == this.time;
  }
};

export { getValues, timeToString, Question}