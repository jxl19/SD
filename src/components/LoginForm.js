import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

export default class LoginForm extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                placeholder="username"
                placeholderTextColor="rgba(255,255,255,0.8)"
                underlineColorAndroid={'transparent'}
                returnKeyType="next"
                onSubmitEditing={()=>this.secondTextInput.focus()}
                blurOnSubmit={false}
                style={styles.input}>
                </TextInput>
                <TextInput 
                placeholder="password"
                placeholderTextColor="rgba(255,255,255,0.8)" 
                secureTextEntry
                underlineColorAndroid={'transparent'}
                returnKeyType="go"
                ref={(input)=>this.secondTextInput = input}
                style={styles.input}>
                </TextInput>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        LOGIN
                        </Text>
                </TouchableOpacity> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding:20
    },
    input: {
        height:40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#3F51B5',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
})