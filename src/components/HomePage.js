import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules
} from "react-native";
import { Redirect } from "react-router-native";
import ToggleSwitch from "toggle-switch-react-native";
import { BASE_URL } from "../config";

export default class HomePage extends React.Component {
  state = {
    isOnLargeToggleSwitch: false,
    pin: ""
  };
  grabPin = () => {
    fetch(`${BASE_URL}/api/users/testuser`, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        this.setState({ pin: res.pin });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.grabPin();
  }

  render() {
    //accessing native module method
    const activityStarter = NativeModules.ActivityStarter;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Toggle on to create a floating button. The button will hover on the
          top right side of your phone. 
          {"\n"}
          {"\n"}
          Hold the button when you are feeling unsafe and let go when you feel safe. You will then be prompted for your pin.
        </Text>
        <Text style={styles.instructions}>Your Pin: {this.state.pin}</Text>
        <ToggleSwitch
          size="large"
          isOn={this.state.isOnLargeToggleSwitch}
          onToggle={isOnLargeToggleSwitch => {
            this.setState({ isOnLargeToggleSwitch });
            activityStarter.toggleButton();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#f5f6fa"
  },
  instructions: {
    textAlign: "center",
    color: "#f5f6fa",
    marginBottom: 30,
    fontSize: 20
  }
});
