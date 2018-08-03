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
  };

  render() {
    const activityStarter = NativeModules.ActivityStarter;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          HOW APP WORKS
  </Text>
        <Text style={styles.instructions}>
          PIN CAN SHOW HERE 
  </Text>
        <ToggleSwitch
          label="Hello"
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
  },
});