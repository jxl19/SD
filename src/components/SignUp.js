import React from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';
import SignUpForm from './SignUpForm';

export default class SignUp extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.logoContainer}>
                    <Text style={styles.textLogo}>
                        LOGO
                    </Text>
                    <Text style={styles.title}>
                        Signup text
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <SignUpForm />
                </View>
            </View>
        )
    }
}

// current toggleswitch turns on the floating button

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196F3'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 0.5,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    textLogo: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 100,
        opacity: 0.9,
        textAlign: 'center',
        fontSize: 20
    },
    formContainer: {
        
    }
});