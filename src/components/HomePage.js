//@flow
import React from 'react';
import {Platform,StyleSheet,Text,View,Button,NativeModules} from 'react-native';
import { Redirect } from 'react-router-native';
import ToggleSwitch from 'toggle-switch-react-native';

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
          console.log(res);
          this.setState({pin : res.pin});
      })
      .catch(err => console.log(err))
  }
  
  componentDidMount() {
    this.grabData();
  }

  render() {
    // console.log(this.state.accessToken.length);
    // console.log(this.state.refreshToken);
    //   if(!this.state.accessToken && !this.state.refreshToken) {
    //     console.log('redirect to handle auth..');
    //     return <Redirect to='/HandleAuth'/>
    //   }
    const activityStarter = NativeModules.ActivityStarter;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Toggle on to create a floating button. The button will hover on the top right side of your phone. Hold the button when you are feeling unsafe and let go when you feel safe. Once you let go, you will be prompted for the 4 digit pin you created.
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