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

export default class HandleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonPressed: false
    };
  }
  handlePress = () => {
    console.log("handle auth pressed.. redirecting to get auth");
    this.setState({ buttonPressed: true });
  };

  render() {
    if (this.state.buttonPressed) {
      return <Redirect to="/GetAuth" />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.instruction}>
          Press button to connect with Noonlight to use their alarm service.
        </Text>
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
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
  instruction: {
    textAlign: "center",
    color: "#f5f6fa",
    marginBottom: 30,
    fontSize: 15
  },
  buttonContainer: {
    backgroundColor: "#3F51B5",
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700"
  }
});
