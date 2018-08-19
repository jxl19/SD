import React from 'react';
import { 
    StyleSheet, 
    View, 
    TextInput, 
    Text, 
    TouchableOpacity, 
    NativeModules 
} from 'react-native';
import { Redirect } from 'react-router-native';
import * as Progress from 'react-native-progress';
import { BASE_URL } from '../config';
export default class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            accessToken: '',
            refreshToken: '',
            loginComplete: false,
            invalidLogin: false,
            loading: false,
        }
    }
    
    handleLogin = () => {
        this.setState({loading:true});
        if(!this.state.username || !this.state.password) {
            this.setState({loading:false});
            this.setState({invalidLogin:true});
        }
        else fetch(`${BASE_URL}/api/users/login`,
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
                    'hello';
                    this.setState({ invalidLogin: true, loading: false });
                    return Promise.reject(res.statusText);
                }
                console.log('logged in');
                this.handleRefresh();
            })
            .catch(err => console.log(err))
    }
    //refresh tokens
    handleRefresh = () => {
        fetch(`${BASE_URL}/alarm/refresh`,
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
        fetch(`${BASE_URL}/api/users/testuser`,
            {
                method: 'GET'
            })
            .then(res => {
                return res.json();
            })
            .then(res => {
                activityStarter.grabInfo(res.id);
                this.setState({ accessToken: res.accessToken, refreshToken: res.refreshToken, loginComplete: true, loading: false });
            })
            .catch(err => console.log(err))
    }
    render() {
        let Invalid, LoadingCircle;
        if(this.state.loading) {
            LoadingCircle = <View style={styles.circles}>
            <Progress.Circle
              indeterminate={true}
              color={"#ecf0f1"}
              size={50}
              borderWidth={2}
            /></View>;
        }
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
                <TouchableOpacity onPress={this.props.handleForm} style={styles.signUpContainer}>
                    <Text onPress={this.props.handleForm} style={styles.signUpText}> Sign Up </Text>
                </TouchableOpacity>
                {Invalid}
                {LoadingCircle}
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
        backgroundColor: '#fbc531',
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
        fontSize: 16
    },
    circles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})