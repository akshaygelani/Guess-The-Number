import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
    return (

        <View style={styles.screen}>
            <Text style={{ fontFamily: 'customfont', fontSize: 20 }}>Game Over !!</Text>
            <View style={styles.imagecontainer}>
                <Image
                    style={styles.image}
                    resizeMode='cover'
                    source={require('../assets/success.jpg')}
                //source={{ uri: 'https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf-650-80.jpg' }}
                />
            </View>
            <Text style={styles.resultText}>Your phone needed <Text style={styles.result}>{props.rounds}</Text> rounds to guess the number <Text style={styles.result}>
                {props.number}</Text>
            </Text>
            <MainButton
                onPress={props.onRestart} >
                NEW GAME</MainButton>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: '100%',
        width: '100%'
    },
    imagecontainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        overflow: "hidden",
        borderWidth: 2,
        marginVertical: 30,
        borderColor: Colors.primary
    },
    resultText: {
        fontFamily: 'customfont',
        paddingHorizontal: 30,
        textAlign: "center",
        fontSize: 20,
        marginBottom: 20
    },
    result: {
        color: Colors.primary
    }
});
export default GameOverScreen;