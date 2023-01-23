import { useEffect, useState } from 'react';
import {View, StyleSheet } from 'react-native';
import Hand from './Hand';

const AnalogClock = ({time, setTime, style, radius, color, update}) => {
  const [intervalId, setIntervalId] = useState(0)
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  
  useEffect(() => {
    if(update){
      setIntervalId(setInterval(() => setTime(new Date()), 1000));
      return () => clearInterval(intervalId);
    }
  }, []);

  const marks = [];
  for (let i = 0; i < 60; i++){

    // these flags indicate whether or not it is a
    // minute mark, a sec mark, an hour mark (1 ... 12)
    // or a quarter mark
    // for convenience, we use these flags to style differently
    // quarters, hours and minutes/seconds
    const flags = {
      minute: true,
      second: true,
      quarter: i % 15 == 0,
      hour: (i % 5 == 0) && (i % 15 != 0),
    }

    // color of the mark
    let markColor = "#bbb";
    if(flags.quarter) markColor = "#fa1111";
    else if(flags.hour) markColor = "#000";

    // scalar by which we multiply the coordinates
    // this help to create a gap between the edges
    // of the rounded clock and the marks indicating
    // hours, minutes and seconds
    let scalar = 1
    if(flags.hour || flags.quarter) scalar = 0.96;
    else scalar = 0.95;

    // this angle indicate the one toward which
    // is directed the mark
    const angle = i * (Math.PI / 30 - Math.PI);

    // we set here the dimensions of the marks
    const markHeight = 5;
    const markWidth = flags.hour || flags.quarter ? 2 : 1;

    // styles of the marks(dots) on the clock i.e. minutes, seconds, hours
    marks.push({
      style: {
        position: "absolute",
        top: scalar * radius * Math.cos(angle), // using the trigo
        left: scalar * radius * Math.sin(angle),// coordinates
        width: markWidth,
        height: markHeight,
        backgroundColor: markColor,
        transform: [
          {translateX: radius - (3*markWidth / 4)},
          {translateY: radius - (3*markHeight / 4)},
          {rotate: `${-angle}rad`}
        ]
      }
    });
  }

  // list of the three hands (hours, minutes, seconds)
  const hands = [
    {
      value : hours + minutes / 60,
      rotationStep : 30,
      height: radius * 0.5,
      width: radius * 0.07,
      color: "#000"
    },
    {
      value : minutes + seconds / 60,
      rotationStep : 6,
      height: radius * 0.7,
      width: radius * 0.06,
      color: "#000"
    },
    {
      value : seconds,
      rotationStep : 6,
      height: radius * 0.8,
      width: radius * 0.04,
      color: "#fa1111"
    },
  ]

  return (
    <View style={[style, {justifyContent: "center", alignItems: "center"}]}>
      <View style={[
        {
          width: radius * 2,
          height: radius * 2,
          borderRadius: '50%',
          borderWidth: 1,
          borderColor: '#fafafa',
          backgroundColor: color
        }
      ]}>
      {
        hands.map((h, index) => (
          <Hand {...h} key={index} />
        ))
      }   
        <View style={{
          width: 20,
          height: 20,
          backgroundColor: "#fa1111",
          position: "relative",
          top: "50%",
          left: '50%',
          zIndex: +100,
          borderRadius: '50%',
          transform:[
            {translateX: -10},
            {translateY: -10}
          ]
        }}></View>
        {marks.map((m,index) => <View style={m.style} key={index}></View>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
})
export default AnalogClock;