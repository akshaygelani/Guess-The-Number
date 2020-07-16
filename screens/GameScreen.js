import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons'


const generateRandomBetween = (min, max, exclude) => {

    min = Math.ceil(min);
    max = Math.floor(max);
    const ranNum = Math.floor(Math.random() * (max - min)) + min;
    if (ranNum == exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return ranNum;
    }
};

const renderList = (guess, round) => {
    return (

        <View key={guess} style={styles.listItem}>
            <Text>#{round}</Text>
            <Text>{guess}</Text>
        </View>

    );
}
const GameScreen = (props) => {

    const initialGuess = generateRandomBetween(0, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuess, setPastGuess] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {

        if (currentGuess === parseInt(props.userChoice)) {
            props.onGameOver(pastGuess.length);
        }

    }, [currentGuess]);

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {

            Alert.alert('Don\'t lie!', 'You know that this is wrong ...',
                [{ text: 'Sorry!', style: 'cancel' }]);

            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuess(curPastGuess => [nextNumber, ...curPastGuess]);
    }
    return (

        <View style={styles.screen}>
            <Text style={styles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}>
                    <MainButton
                        onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color='white' />
                    </MainButton>
                </View>
                <View style={styles.button}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color='white' />
                    </MainButton>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuess.map((guess, index) => renderList(guess, pastGuess.length - index))}
                </ScrollView>
            </View>

        </View>

    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    title: {
        marginVertical: 3,
        fontSize: 18,
        fontFamily: 'customfont'
    },
    buttonContainer: {
        flexDirection: "row",
        width: '80%',
        marginTop: 10,
        justifyContent: "space-between",
        padding: 15
    },
    button: {
        width: '35%'
    },
    listContainer: {
        marginTop: 10,
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        justifyContent: "flex-end",

    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        marginBottom: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'white'

    }

});

export default GameScreen;