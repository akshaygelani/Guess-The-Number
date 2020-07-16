import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import { AppLoading } from 'expo';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import *  as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    'customfont': require('./assets/fonts/customfont.ttf')
  });
}
export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [numOfRounds, setNumOfRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)} />
    );
  }

  const configureNewGameHandler = () => {
    setNumOfRounds(0);
    setUserNumber(null);
  }
  const StartGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setNumOfRounds(0);
  }

  const GameOverHandler = (Rounds) => {
    setNumOfRounds(Rounds);
  }

  let content = <StartGameScreen
    onGameStart={StartGameHandler}

  />
  if (userNumber && numOfRounds <= 0) {
    content = <GameScreen
      userChoice={userNumber}
      onGameOver={GameOverHandler} />
  } else if (numOfRounds > 0) {
    content = <GameOverScreen
      rounds={numOfRounds}
      number={userNumber}
      onRestart={configureNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title={'Guess A Number'} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
