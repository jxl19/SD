import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  NativeModules
} from "react-native";
import { Redirect } from "react-router-native";
import * as Progress from "react-native-progress";
import { BASE_URL } from "../config";

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      pin: "",
      signupFailed: false,
      signupPassError: false,
      signUpComplete: false,
      pressed: false,
      loading: false,
      returnLogin: false,
      pinError: false
    };
  }
  //press listener
  handlePress = () => {
    this.setState({
      signupPassError: false,
      signupFailed: false,
      pressed: true,
      loading: true
    });
    //make sure pin is number
    if (isNaN(this.state.pin)) {
      this.setState({ pinError: true, loading: false });
    } else if (this.state.password === this.state.confirmPassword) {
      const userData = {
        username: this.state.username,
        password: this.state.password,
        pin: this.state.pin
      };
      console.log("password and confirm password matches");
      this.handleSignUp(userData);
    } else {
      this.setState({ signupPassError: true, loading: false });
    }
  };
  //post req to server to signup
  handleSignUp = userData => {
    fetch(`${BASE_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(res => {
        if (!res.ok) {
          this.setState({ signupFailed: true, loading: false });
          return Promise.reject(res.statusText);
        }
        console.log("successfully created account");
        this.handleLogin(userData);
      })
      .catch(err => console.log(err));
  };
  //login after signup
  handleLogin = userData => {
    fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password
      })
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        this.handleRedirect();
      })
      .catch(err => console.log(err));
  };
  //send info to java side
  handleRedirect = () => {
    const activityStarter = NativeModules.ActivityStarter;
    fetch(`${BASE_URL}/api/users/testuser`, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        activityStarter.grabInfo(res.id);
        this.setState({ signUpComplete: true, loading: false });
      })
      .catch(err => console.log(err));
  };
  //go back to login screen instead
  returnLogin = () => {
    this.setState({ returnLogin: true });
  };
  render() {
    let LoadingCircle;
    if (this.state.loading) {
      LoadingCircle = (
        <View style={styles.circles}>
          <Progress.Circle
            indeterminate={true}
            color={"#ecf0f1"}
            size={50}
            borderWidth={2}
          />
        </View>
      );
    }
    if (this.state.pressed && this.state.signUpComplete) {
      return <Redirect to="/HandleAuth" />;
    }
    if (this.state.returnLogin) {
      return <Redirect to="/" />;
    }
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="username"
          placeholderTextColor="rgba(255,255,255,0.8)"
          underlineColorAndroid={"transparent"}
          returnKeyType="next"
          onSubmitEditing={() => this.secondTextInput.focus()}
          blurOnSubmit={false}
          onChangeText={text => this.setState({ username: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="pin"
          placeholderTextColor="rgba(255,255,255,0.8)"
          underlineColorAndroid={"transparent"}
          returnKeyType="next"
          maxLength={4}
          keyboardType="numeric"
          ref={input => (this.secondTextInput = input)}
          onSubmitEditing={() => this.thirdTextInput.focus()}
          blurOnSubmit={false}
          onChangeText={text => this.setState({ pin: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(255,255,255,0.8)"
          secureTextEntry
          underlineColorAndroid={"transparent"}
          returnKeyType="next"
          ref={input => (this.thirdTextInput = input)}
          onSubmitEditing={() => this.fourthTextInput.focus()}
          blurOnSubmit={false}
          onChangeText={text => this.setState({ password: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="confirm password"
          placeholderTextColor="rgba(255,255,255,0.8)"
          secureTextEntry
          underlineColorAndroid={"transparent"}
          returnKeyType="go"
          ref={input => (this.fourthTextInput = input)}
          onChangeText={text => this.setState({ confirmPassword: text })}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.signupContainer}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.returnLogin}
          style={styles.loginContainer}
        >
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
        <Text>
          {(this.state.signupPassError && (
            <Text style={styles.invalid}> passwords do not match </Text>
          )) ||
            (this.state.signupFailed && (
              <Text style={styles.invalid}> unable to create account </Text>
            )) ||
            (this.state.pinError && (
              <Text style={styles.invalid}> Pin can only be numbers </Text>
            ))}
        </Text>
        {LoadingCircle}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    color: "#FFF",
    paddingHorizontal: 10
  },
  signupContainer: {
    backgroundColor: "#27ae60",
    paddingVertical: 15,
    marginBottom: 7
  },
  loginContainer: {
    backgroundColor: "#3F51B5",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700"
  },
  circles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  invalid: {
    textAlign: "center",
    color: "red",
    fontSize: 16
  }
});
