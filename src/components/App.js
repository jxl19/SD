import React from 'react';
import { Platform, StyleSheet, Text, View, Button, NativeModules } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import GetAuth from './GetAuth';
import HandleAuth from './HandleAuth';
import createHistory from 'history/createMemoryHistory';

const history = createHistory();

export default class App extends React.Component {

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/HomePage" component={HomePage} />
          <Route exact path="/GetAuth" component={GetAuth} />
          <Route exact path="/HandleAuth" component={HandleAuth}/>
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