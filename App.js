import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Game from './screens/Game';
import Home from './screens/Home';
import { useFonts } from 'expo-font'
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './global';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded] = useFonts({
    "ds-digital": require('./assets/ds-digital.ttf')
  });

  if(!fontLoaded){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome on Clockzzle</Text>
        <Text style={styles.text}>We help you learn telling time</Text>
        <Text style={styles.text}>Enjoy the app</Text>
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{}}
      >
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Game" component={Game} options={{title: "Clockzzle"}}/>
      </Stack.Navigator>
      <StatusBar style="auto"/>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.main,
    flex: 1,
  }, 
  text: {
    fontSize: 24,
    fontWeight: '400',
    color: '#284d70',
    fontStyle: 'italic'
  }
})