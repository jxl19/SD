import React from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';
import LoginForm from './LoginForm';
import { NativeModules } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
export default class Login extends React.Component {
    state = {
        isOnLargeToggleSwitch: false,
      };
    render() {
        const activityStarter = NativeModules.ActivityStarter;
        // const mod = NativeModules.Device.getDeviceName((err ,name) => {
        //     console.log(err, name);
        //  });
        return (
            <View style={styles.container}>

                <View style={styles.logoContainer}>
                    <Text style={styles.textLogo}>
                        LOGO
                    </Text>
                    <Text style={styles.title}>
                        Login text
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm />
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
            </View>
        )
    }
}

// current toggleswitch turns on the floating button

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196F3'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    textLogo: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 100,
        opacity: 0.9,
        textAlign: 'center',
        fontSize: 20
    }
});