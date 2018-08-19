import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  WebView,
  Linking,
  TouchableOpacity
} from "react-native";
import { Redirect } from "react-router-native";

export default class GetAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toHome: false
    };
  }
  onNavigationStateChange(webViewState) {
    //redirects to homepage once we hit our own serverurl
    let currentUrl = webViewState.url.split("?")[0];
    if (currentUrl == "https://safedeliver.herokuapp.com/callback") {
      this.setState({ toHome: true });
    }
  }
  render() {
    if (this.state.toHome) {
      return <Redirect to="/HomePage" />;
    }
    return (
      <View style={styles.container}>
        <WebView
          ref={ref => {
            this.webview = ref;
          }}
          source={{ uri: "https://safedeliver.herokuapp.com/redir" }}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2196F3"
  }
});
