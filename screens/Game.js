import { Component, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import AnalogClock from "../components/AnalogClock";
import RadioButton from "../components/RadioButton";
import { getValues, timeToString } from "../db";
import { colors } from "../global";
import { Audio } from 'expo-av'
import DigitalClock from "../components/DigitalClock";


const Game = () => {
  const [clockType, setClockType] = useState('both');
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [questions, setQuestions] = useState(getValues(5));
  const [sound, setSound] = useState();
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const [checkButtonVisible, setCheckButtonVisible] = useState(true)

  const playSound = async (name) => {
    console.log('Loading sound');
    let file;
    switch(name){
      case 'success':
        file = require('../assets/success.mp3');
        break;
      case 'error': 
        file = require('../assets/wrong-answer.mp3');
        break;
    }
    const {sound} = await Audio.Sound.createAsync(file);
    setSound(sound);

    console.log('Playing sound');
    await sound.playAsync().catch(e => console.log(e))
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading sound');
        sound.unloadAsync()
      }
      : undefined
  }, [sound])

  useState(() => {
    setQuestions(getValues(5))
  }, []);

  useEffect(() => {console.log(questions)}, [questions])

  const checkAnswer = () => {
    if(selectedAnswer != -1){
      setCheckButtonVisible(false); 
      // la réponse est correct
      if(questions[1][selectedAnswer] === questions[0]){
        playSound('success');
      }
      else{
        playSound('error');
        setWrongAnswer(true);
      }
    }
  }

  return (
    <View
      style={styles.container}
    >
      {/* Options of clock type */}
      <RadioButton 
        options={[
          {key: 'analog', text: "Analog"},
          {key: 'digital', text: "Digial"},
          {key: 'both', text: "Both"},
        ]}
        handleUpdate={setClockType}
        value={clockType}
        style={{marginTop:3}}
      />

      <ScrollView contentContainerStyle={styles.gamebox}>
        <View style={styles.answerStatusZone}>
        </View>
        <View style={styles.questionZone}>
          {
            clockType === 'analog' && (
              <AnalogClock 
                radius={70}
                color={colors.gray}
                time={new Date(questions[0])}
                style={{marginVertical: 10}}
              />
            )
          }
          {
            clockType === 'digital' && (
              <DigitalClock
                time={new Date(questions[0])}
                size={32}
                style={{marginVertical: 20}}
              />
            )
          }
          {
            clockType === 'both' && (
              <>
                <DigitalClock
                  time={new Date(questions[0])}
                  size={28}
                  style={{marginTop: 10, marginBottom: 5}}
                />
                <AnalogClock 
                  radius={70}
                  color={colors.gray}
                  time={new Date(questions[0])}
                  style={{marginTop: 5, marginBottom: 10}}
                />
              </>
            )
          }
        </View>
        <View style={styles.answerPickerZone}>
          {questions && questions[1].map((q, index) => (
            <TouchableHighlight  key={index}
              style={[
                styles.answerItem,
                {
                  backgroundColor: !checkButtonVisible ? (
                    wrongAnswer 
                      ? (index == selectedAnswer 
                          ? colors.danger
                          : (index == questions[1].indexOf(questions[0]) 
                              ? colors.success
                              : colors.gray
                            )
                    ) : (
                      index == selectedAnswer
                        ? colors.success
                        : colors.gray
                    )
                  ): (
                    index == selectedAnswer ? "green" : colors.gray
                  )
                },
              ]}
              onPress={(e) => checkButtonVisible && setSelectedAnswer(index)}
            >
              <Text style={[
                styles.answerItemText,
                {color: index==selectedAnswer ? "#eee" : "black"}
              ]}>{timeToString(q)}</Text>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
      <View style={styles.submit}>
        {checkButtonVisible ? (
          <Button 
            onPress={() => checkAnswer()}
            color={colors.black} title="Check"
          />
          ) : (
          <Button 
            onPress = {() => {
              setQuestions(getValues(5))
              setSelectedAnswer(-1)
              setCheckButtonVisible(true)
              setWrongAnswer(false);
            }}
            title="Continue"
          />
        )}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  gamebox: {
    flex: 1,
    marginTop: 3,
    alignItems: 'center'
  },
  questionZone:{
    alignItems: 'center'
  },
  questionAnswerZone: {},
  answerPickerZone: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  answerItem: {
    width: "40%",
    marginHorizontal: 10,
    marginVertical: 5,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderRadius: 10,
    aspectRatio: 4/3
  },
  answerItemText: {
    textAlignVertical: 'center',
    fontSize: 20,
  },
  submit: {
    padding: 3
  }
})

export default Game;