import React from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';
import LoginForm from './LoginForm';
import SignUp from './SignUp';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          display: 'loginForm' 
        }; //this is how  you set up state
      }
      //fix later..
    renderForm = () => {
        // What page should show?
        console.log("current display :" + this.state.display);
        switch(this.state.display){
          case 'signUpForm':
          console.log('hello');
            return <SignUp />;
          break;
          case 'loginForm':
          console.log('hello2');
            return <LoginForm handleForm={this.signUpForm} />; //pass method to child
          break;
          default:
          console.log('hello3');
            return <LoginForm handleForm={this.signUpForm} />;
          break;
        }
      }

      signUpForm = () => {
        this.setState({ display: 'signUpForm' });
      }
    //   forgotPasswordForm = () => {
    //       this.setState({display: 'forgotPasswordForm'})
    //   }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.logoContainer}>
                    <Text style={styles.textLogo}>
                        LOGO
                    </Text>
                    <Text style={styles.title}>
                        Login text
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    {this.renderForm()}
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
    }
});