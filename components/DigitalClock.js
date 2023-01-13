import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native";
const DigitalClock = ({style, color, size, time, setTime, update}) => {
  const [intervalId, setIntervalId] = useState(0);
  
  const minutes = `${ time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`
  const seconds = `${ time.getSeconds() < 10 ? '0' : ''}${time.getSeconds()}`
  const hours = `${ time.getHours() < 10 ? '0' : ''}${time.getHours()}`
  

  useEffect(() => {
    if(update){
      setInterval(setTime(new Date()), 1000)
      return () => clearInterval(intervalId)
    }
  }, []);
  return (
    <View style={style}>
      <Text style={[styles.text, {fontSize: size || 24, color: color}]}>
        <Text>{hours}:</Text>
        <Text>{minutes}:</Text>
        <Text>{seconds}</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'ds-digital',
    fontWeight:'bold',
  }
})

export default DigitalClock;