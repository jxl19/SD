import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, NativeModules } from 'react-native';
import { Redirect } from 'react-router-native';
export default class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            accessToken: '',
            refreshToken: '',
            loginComplete: false,
            invalidLogin: false
        }
    }
    //we need to create another method for handlelogin to do before the redirects. we need to check if accesstokens exist to decide where to redirect to.
    handlePress = () => {
        console.log(this.state.username);
        console.log(this.state.password);
    }
    handleLogin = () => {
        fetch(`https://safedeliver.herokuapp.com/api/users/login`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(res => {
                if (!res.ok) {
                    this.setState({ invalidLogin: true });
                    return Promise.reject(res.statusText);
                }
                console.log('logged in');
                this.handleRefresh();
            })
            .catch(err => console.log(err))
    }
    //refresh tokens
    handleRefresh = () => {
        fetch(`https://safedeliver.herokuapp.com/alarm/refresh`,
        {
            method: 'GET'
        })
        .then(res => {
            console.log(res);
            this.handleRedirect();
        })
        .catch(err => console.log(err));
    }
    handleRedirect = () => {
        const activityStarter = NativeModules.ActivityStarter;
        fetch(`https://safedeliver.herokuapp.com/api/users/testuser`,
            {
                method: 'GET'
            })
            .then(res => {
                return res.json();
            })
            .then(res => {
                activityStarter.grabInfo(res.id);
                this.setState({ accessToken: res.accessToken, refreshToken: res.refreshToken, loginComplete: true });
            })
            .catch(err => console.log(err))
    }
    render() {
        let Invalid;
        if (!this.state.accessToken && !this.state.refreshToken && this.state.loginComplete) {
            return <Redirect to="/HandleAuth" />
        }
        else if (this.state.accessToken && this.state.refreshToken && this.state.loginComplete) {
            return <Redirect to='/HomePage' />
        }
        else if (this.state.invalidLogin) {
            Invalid = <Text style={styles.loginError}>Invalid username or password</Text>;
        }
        const activityStarter = NativeModules.ActivityStarter;
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="username"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    underlineColorAndroid={'transparent'}
                    returnKeyType="next"
                    onSubmitEditing={() => this.secondTextInput.focus()}
                    blurOnSubmit={false}
                    onChangeText={(text) => this.setState({ username: text })}
                    style={styles.input}>
                </TextInput>
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    secureTextEntry
                    underlineColorAndroid={'transparent'}
                    returnKeyType="go"
                    ref={(input) => this.secondTextInput = input}
                    onChangeText={(text) => this.setState({ password: text })}
                    style={styles.input}>
                </TextInput>
                <TouchableOpacity onPress={this.handleLogin} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleLogin} style={styles.signUpContainer}>
                    <Text onPress={this.props.handleForm} style={styles.signUpText}> Sign Up </Text>
                </TouchableOpacity>
                {Invalid}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#3F51B5',
        paddingVertical: 15,
        marginBottom: 7
    },
    signUpContainer: {
        backgroundColor: '#f1c40f',
        paddingVertical: 15,
        marginBottom: 7
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    signUpText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    loginError: {
        textAlign: 'center',
        color: 'red',
        fontWeight: '600'
    }
})