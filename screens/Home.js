import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import AnalogClock from "../components/AnalogClock";
import DigitalClock from "../components/DigitalClock";
import { colors } from "../global";
import Rating from '../components/Rating';
import { Link } from "@react-navigation/native";

const Home = ({navigation}) => {
  const [time, setTime] = useState(new Date());
  const [rate, setRate] = useState(parseInt(localStorage.getItem('totalsuccess') || 0) / parseInt(localStorage.getItem('totaltries') || 1));

  useEffect(() => {
    setRate(
      parseInt(localStorage.getItem('totalsuccess') || 0) /
      parseInt(localStorage.getItem('totaltries') || 1)
    );
  });

  return (
    <View style={styles.container}>
      <AntDesign style={styles.homeIcon} name="home" size={30}/>
      <Text style={styles.title}>Clockzzle</Text>
      
      <DigitalClock 
        time={time}
        setTime={setTime}
      />
      <AnalogClock
        color={colors.gray}
        radius={70}
        style={styles.clock}
        time={time}
        setTime={setTime}
        update={true}
      />
      <Rating 
        rate={rate}
        color={colors.success}
        style={{marginBottom: 10}}
      />
      <Text style={styles.text}>
        Learn the correct way to tell time throught games
      </Text>
      <View style={styles.button}>
        <Button 
          color="#1A1A1AED" title='Begin'
          onPress={() => navigation.push("Game")}
        />
      </View>
      <View style={styles.copyright}><Text style={{color: colors.black}}><a href="mailto:sumptring@gmail.com" style={{color: colors.black, textDecoration: "none"}}>sumptring@gmail.com</a> &copy; january 22</Text></View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    fontFamily: 'ds-digital'
  },
  clock: {
    marginVertical: 20,
  },
  text: {
    marginBottom: 20,
    color: '#0A0A0A',
  },
  button: {
    width: 100,
    borderRadius: 20,
    // flex: 
    marginBottom: 30
  },
  homeIcon: {
    marginBottom: 20
  },
  copyright: {
    marginTop: 10,
    justifyContent: "flex-end",
  }
});

export default Home;