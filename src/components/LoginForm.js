import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Redirect } from 'react-router-native';
export default class LoginForm extends React.Component {

    constructor(props){
        super(props)
    
        this.state = {
          username: '',
          password: '',
          accessToken: '',
          refreshToken: '',
          loginComplete: false
        }
      }
      //we need to create another method for handlelogin to do before the redirects. we need to check if accesstokens exist to decide where to redirect to.
    handlePress = () => {
        console.log(this.state.username);
        console.log(this.state.password);
    }
    handleRedirect = () => {
            fetch(`https://safedeliver.herokuapp.com/api/users/testuser`,
              {
                method: 'GET'
              })
              .then(res => {
                return res.json();
              })
              .then(res => {
                  console.log(res);
                  this.setState({accessToken : res.accessToken, refreshToken : res.refreshToken, loginComplete: true});
              })
              .catch(err => console.log(err))
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
                return Promise.reject(res.statusText);
            }
            // login here
            console.log('logged in');
            // this.setState({loginComplete: true});
            this.handleRedirect();
        })
        .catch(err => console.log(err))
    }
    render() {
        if(!this.state.accessToken && !this.state.refreshToken && this.state.loginComplete) {
            console.log("redir to handle auth");
            return <Redirect to="/HandleAuth" />
        }
        else if(this.state.accessToken &&  this.state.refreshToken && this.state.loginComplete) {
            console.log("redir to homepage");
            return <Redirect to='/HomePage'/>
        }
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="username"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    underlineColorAndroid={'transparent'}
                    returnKeyType="next"
                    onSubmitEditing={() => this.secondTextInput.focus()}
                    blurOnSubmit={false}
                    onChangeText={(text) => this.setState({username:text})}
                    style={styles.input}>
                </TextInput>
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    secureTextEntry
                    underlineColorAndroid={'transparent'}
                    returnKeyType="go"
                    ref={(input) => this.secondTextInput = input}
                    onChangeText={(text) => this.setState({password:text})}
                    style={styles.input}>
                </TextInput>
                <TouchableOpacity onPress={this.handleLogin}style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        LOGIN
                    </Text>
                </TouchableOpacity>
                <Text onPress={this.props.handleForm}style={styles.signUp}> Sign Up </Text>
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
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    signUp: {
        color: '#000'
    }
})