import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Header = (props) => {
    return (
        <View style={styles.headerStyle}>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({

    headerStyle: {
        width: '100%',
        height: 80,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'customfont'
    }
});

export default Header;