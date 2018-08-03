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
import HomePage from './HomePage';
import Login from './Login';

export default class App extends React.Component {

  render() {
    return (
      <Login />
    );
  }
}

