import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../constants/Colors';

const MainButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Color.primary,
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 8
    },
    buttonText: {
        fontFamily: 'customfont',
        color: 'white',
        textAlign: "center"
    }
});
export default MainButton;