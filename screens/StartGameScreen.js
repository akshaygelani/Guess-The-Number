import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen = (props) => {

    const [enterdValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const inputTextController = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enterdValue);
        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
            Alert.alert('Invalid number',
                'Number has to be a number between 1 to 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            setConfirmed(false);
        } else {
            setConfirmed(true);
            setSelectedNumber(enterdValue);
            Keyboard.dismiss();
        }
        setEnteredValue('');
    }

    var confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text style={styles.title}>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton
                    onPress={() => props.onGameStart(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    } else {
        confirmedOutput = (<View></View>);
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start A New Game !</Text>

                <Card style={styles.textInputContainer}>
                    <Text style={{ fontFamily: 'customfont', fontSize: 18 }}>Select A Number</Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalixe="none"
                        autoCOrrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={inputTextController}
                        value={enterdValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title='Reset'
                                fontFamily=''
                                onPress={resetInputHandler}
                                color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title='Confirm'
                                onPress={confirmInputHandler}
                                color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({

    screen: {
        alignItems: "center",
        padding: 10,
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: 'customfont',
        marginBottom: 15
    },
    textInputContainer: {
        width: '80%',
        alignItems: "center",
    },
    buttonContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        marginVertical: 10
    },
    button: {
        width: '45%'
    },
    input: {
        width: 50,
        textAlign: "center",
        fontFamily: 'customfont'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center"
    }
});

export default StartGameScreen;