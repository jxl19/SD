import React from "react";
import { StyleSheet, View, Image, Text, Button } from "react-native";
import { Redirect } from "react-router-native";
import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "loginForm"
    };
  }

  signUpForm = () => {
    this.setState({ display: "SignUpForm" });
  };

  render() {
    if (this.state.display === "SignUpForm") {
      return <Redirect to="/SignUp" />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.textLogo}>
            <Text style={styles.textFirst}>Safe</Text>
            <Text style={styles.textSecond}>Deliver</Text>
          </Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm handleForm={this.signUpForm} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2196F3"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 0.5,
    justifyContent: "center"
  },
  logo: {
    width: 100,
    height: 100
  },
  textLogo: {
    fontSize: 35,
    fontWeight: "bold"
  },
  title: {
    color: "#FFF",
    marginTop: 10,
    width: 100,
    opacity: 0.9,
    textAlign: "center",
    fontSize: 20
  },
  textFirst: {
    color: "#fbc531"
  },
  textSecond: {
    color: "#f5f6fa"
  }
});
