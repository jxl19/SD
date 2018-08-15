//@flow
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'

export default class HomePage extends React.Component {
  state = {
    isOnLargeToggleSwitch: false,
    pin: '',
  };
  grabData = () => {
    fetch(`https://safedeliver.herokuapp.com/api/users/testuser`,
      {
        method: 'GET'
      })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({pin : res.pin})
      })
      .catch(err => console.log(err))
  }
  componentWillMount() {
    this.grabData();
  }

  render() {
    const activityStarter = NativeModules.ActivityStarter;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Toggle on to create a floating button. The button will hover on the top right side of your phone. Hold the button when you are feeling unsafe and let go when you feel safe.
          </Text>
        <Text style={styles.welcome}>
          Once you let go, the app will prompt you for the 4 digit pin you created to let the app know that you are safe. If pin is not put in or incorrectly put in within a 15 second time frame, you will recieve a text/call to see if you are safe. If there is no response for that call/text, the proper authorities will then be called.

  </Text>
        <Text style={styles.instructions}>
          Your Pin: {this.state.pin}
  </Text>
        <ToggleSwitch
          label="Toggle Button"
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 30,
    fontSize: 15
  },
});