import { Component, useEffect, useState } from "react";
import { Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import AnalogClock from "../components/AnalogClock";
import RadioButton from "../components/RadioButton";
import { Question, timeToString } from "../db";
import { colors } from "../global";
import { Audio } from 'expo-av'
import DigitalClock from "../components/DigitalClock";
import { AntDesign } from "@expo/vector-icons";
import ManualClock from '../components/ManualClock';


const Game = ({navigation}) => {
  const [clockType, setClockType] = useState(localStorage.getItem('clocktype') || 'analog');
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [sound, setSound] = useState();
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const [checkButtonVisible, setCheckButtonVisible] = useState(true)
  const [question, setQuestion] = useState(new Question());
  const [totalTries, setTotalTries] = useState(parseInt(localStorage.getItem('totaltries') || 0));
  const [totalSuccess, setTotalSuccess] = useState(parseInt(localStorage.getItem('totalsuccess') || 0));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highscore') || 0));

  useEffect(() => {
    if(score > highScore){
      setHighScore(score);
    }
  }, [score]);
  
  useEffect(() => {
    localStorage.setItem('highscore', highScore);
  }, [highScore]);

  useEffect(() => {
    localStorage.setItem('totalsuccess', totalSuccess);
  }, [totalSuccess]);
  
  useEffect(() => {
    localStorage.setItem('totaltries', totalTries);
  }, [totalTries]);

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

  // saving the user's choise
  useEffect(() => {
    if(localStorage.getItem('clocktype') !== clockType){
      localStorage.setItem('clocktype', clockType);
    }
  }, [clockType])

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading sound');
        sound.unloadAsync()
      }
      : undefined
  }, [sound]);

  const checkAnswer = () => {
    if(selectedAnswer != ""){
      setTotalTries(totalTries + 1);
      setCheckButtonVisible(false);
      let success = question.type === "manual"
        ? question.check(selectedAnswer)
        : question.checkWithNoise(selectedAnswer);
      
      // la réponse est correct
      if(success){
        playSound('success');
        setTotalSuccess(totalSuccess + 1);
        let tmpScore = question.type === 'manual'
          ? Math.ceil(Math.random() * 10)
          : Math.ceil(Math.random() * 5);
        
        setScore(score + tmpScore);
      }
      else{
        playSound('error');
        setWrongAnswer(true);
        let tmpScore = Math.ceil(Math.random() * 5);
        
        setScore(score - tmpScore < 0 ? 0 : score - tmpScore);
      }
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <AntDesign style={styles.homeIcon} name="home" size={30}/>
      </TouchableOpacity>
      <View style={styles.score}>
        <Text style={styles.scoreText}>High score : {highScore}</Text>
        <Text style={styles.scoreText}>Your score : {score}</Text>
      </View>
      {
        question.type === 'picker' ? (
          <RadioButton 
            options={[
              {key: 'analog', text: "Analog"},
              {key: 'digital', text: "Digital"},
              {key: 'both', text: "Both"},
            ]}
            handleUpdate={setClockType}
            value={clockType}
            style={{marginTop:3, paddingVertical: 3}}
          />
        ) : (
          <Text style={{marginVertical: 5, textAlign: "center", color: "#111",  fontSize: 16, fontWeight: ''}}>What time corresponds to ...</Text>
        )
      }
      
      <ScrollView contentContainerStyle={styles.gamebox}>
        <View style={styles.answerStatusZone}>
        </View>
        {
          question.type === "picker" && (
            <>
              <View style={styles.questionZone}>
                {
                  clockType === 'analog' ? (
                    <AnalogClock 
                      radius={70}
                      color={colors.gray}
                      time={new Date(question.time)}
                      style={{marginVertical: 10}}
                    />
                  ) :
                  clockType === 'digital' ? (
                    <DigitalClock
                      time={new Date(question.time)}
                      size={32}
                      style={{marginVertical: 20}}
                    />
                  ) :
                  clockType === 'both' && (
                    <>
                      <DigitalClock
                        time={new Date(question.time)}
                        size={28}
                        style={{marginTop: 10, marginBottom: 5}}
                      />
                      <AnalogClock 
                        radius={70}
                        color={colors.gray}
                        time={new Date(question.time)}
                        style={{marginTop: 5, marginBottom: 10}}
                      />
                    </>
                  )
                }
              </View>
              <View style={styles.answerPickerZone}>
                {
                  question.noises.map((item, index) => (
                    <TouchableHighlight  key={index}
                      style={[
                        styles.answerItem,
                        {
                          backgroundColor: !checkButtonVisible ? (
                            wrongAnswer 
                              ? (item == selectedAnswer 
                                  ? colors.danger
                                  : (question.time == item
                                      ? colors.success
                                      : colors.gray
                                    )
                            ) : (
                              item == selectedAnswer
                                ? colors.success
                                : colors.gray
                            )
                          ): (
                            item == selectedAnswer ? "green" : colors.gray
                            )
                          },
                        ]}
                      onPress={(e) => checkButtonVisible && setSelectedAnswer(item)}
                    >
                      <Text style={[
                        styles.answerItemText,
                        {color: (wrongAnswer && item == selectedAnswer || item == selectedAnswer) ? "#eee" : "black"}
                      ]}>{timeToString(item)}</Text>
                    </TouchableHighlight>
                  ))
                }
              </View>
            </>
          )
        }
        {
          question.type === "manual" && (
            <View style={{marginVertical: 20,justifyContent: 'center'}}>
              <Text style={{marginVertical: 10, textAlign: "center", color: "#010101",  fontSize: 22, fontWeight: 'bold'}}>{question.toString()}</Text>
              <ManualClock 
                time={selectedAnswer}
                setTime={setSelectedAnswer}
                submitted={!checkButtonVisible}
                style={{marginTop: 10}}
              />
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <AnalogClock 
                  radius={70}
                  color={colors.gray}
                  time={new Date(selectedAnswer || null)}
                  setTime={setSelectedAnswer}
                />
                
                {wrongAnswer && 
                  <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <AnalogClock 
                      radius={70}
                      color={colors.gray}
                      time={new Date(question.time)}
                    />
                    <DigitalClock 
                      time={new Date(question.time)}
                      size={20}
                      style={{marginTop: 3}}
                    />
                  </View>
                }
              </View>
            </View>
          )
        }
        <View style={styles.submit}>
          {checkButtonVisible ? (
            <Button 
              onPress={() => checkAnswer()}
              color={colors.black} title="Check"
            />
            ) : (
            <Button 
              onPress = {() => {
                setQuestion(new Question())
                setSelectedAnswer("")
                setCheckButtonVisible(true)
                setWrongAnswer(false);
              }}
              style={{}}
              title="Continue"
            />
          )}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeIcon: {
    marginBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: colors.main,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  gamebox: {
    alignItems: 'center',
    marginHorizontal: 5
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
    padding: 3,
    width: 200, 
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 10
  }, 
  score: {
    position: 'absolute',
    top: 10,
    right: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontFamily: 'ds-digital',
    fontSize: "14",
  }
})
export default Game;