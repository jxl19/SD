import React from "react";
import { Redirect } from "react-router-native";
import {
  BackHandler,
  DeviceEventEmitter,
  Text,
  View,
  StyleSheet,
  NativeModules
} from "react-native";
import { BASE_URL } from '../config';
import * as Progress from "react-native-progress";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export default class LocationSettings extends React.Component {
  state = {
    initialPosition: "Confirming location settings...",
    redirect: false,
    loading: false,
    accessToken: "",
    refreshToken: "",
    refresh:false
  };
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
        this.setState({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          redirect: true,
          loading: false,
          status: true
        });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: false, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
      preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
      providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    })
      .then(
        function(success) {
          // success => this.setState({alreadyEnabled: true, enabled: true, status: "enabled"});
          this.handleRedirect();
          navigator.geolocation.getCurrentPosition(
            position => {
              let initialPosition = JSON.stringify(position);
              this.setState({initialPosition : "Location services are enabled"})
              this.handleRedirect();
            },
            error => console.log(error),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
          );
        }
          .bind(this)
      )
      .catch(error => {
        if(!this.state.status) {
          this.setState({refresh:true});
        }
        console.log(error.message);
      });
    // BackHandler.addEventListener("hardwareBackPress", () => {
    //   //(optional) you can use it if you need it
    //   LocationServicesDialogBox.forceCloseDialog();
    // });
    DeviceEventEmitter.addListener("locationProviderStatusChange", function(
      status
    ) {
      // only trigger when "providerListener" is enabled
      console.log(status);
    });
  }

  componentWillUnmount() {
    // used only when "providerListener" is enabled
    console.log("unmounting");
    LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener.
  }

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
    if(this.state.refresh) {
      this.componentDidMount();
    }
    if (this.state.redirect && this.state.accessToken && this.state.refreshToken) {
      return <Redirect to="/HomePage" />;
    }
    else if (this.state.redirect && !this.state.accessToken && !this.state.refreshToken){
        return <Redirect to="/HandleAuth" />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.initialPosition}</Text>
        {LoadingCircle}
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
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#f5f6fa"
  },
  circles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
