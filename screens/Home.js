import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AnalogClock from "../components/AnalogClock";
import DigitalClock from "../components/DigitalClock";
import { colors } from "../global";

const Home = ({navigation}) => {
  const [time, setTime] = useState(new Date());
  return (
    <View style={styles.container}>
      <AntDesign style={styles.homeIcon} name="home" size={30}/>
      <Text style={styles.title}>Clockzzle</Text>
      <DigitalClock 
        time={time}
        setTime={setTime}
        update={true}
      />
      <AnalogClock
        color={colors.gray}
        radius={70}
        style={styles.clock}
        time={time}
        setTime={setTime}
        update={true}
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
      <View style={styles.copyright}><Text>&copy; <a href="mailto:sumptring@gmail.com" style={{color: colors.black, textDecoration: "none"}}>sumptring@gmail.com</a></Text></View>
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
    marginBottom: 50
  },
  homeIcon: {
    marginBottom: 20
  },
  copyright: {
    justifyContent: "flex-end",
  }
});

export default Home;