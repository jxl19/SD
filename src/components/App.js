//@flow
import React from 'react';
import { Platform, StyleSheet, Text, View, Button, NativeModules } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';

export default class App extends React.Component {

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})