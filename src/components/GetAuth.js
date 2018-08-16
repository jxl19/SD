import React from 'react';
import { View, Text, Button, StyleSheet, WebView, Linking, TouchableOpacity } from 'react-native';
import { Redirect } from 'react-router-native';


export default class GetAuth extends React.Component {
    constructor(props){
        super(props)
    
        this.state = {
          closePage: false,
        }
      }
    onNavigationStateChange(webViewState) {
        console.log("current url outside: " + webViewState.url);
        currentUrl = webViewState.url.split('?')[0];
        console.log("url outside split: " + currentUrl);
        if (currentUrl == 'https://safedeliver.herokuapp.com/callback') {
            //find way to close out of webview from here
        }
    }
    handleClose = () => { 
        this.setState({closePage:true});
    }
    render() {
        if(this.state.closePage) {
            return <Redirect to='/HomePage' />
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.handleClose} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        Close Page
                    </Text>
                </TouchableOpacity>
                <WebView
                    ref={(ref) => { this.webview = ref; }}
                    source={{ uri: 'https://safedeliver.herokuapp.com/redir' }}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196F3'
    },
    buttonContainer: {
        backgroundColor: '#3F51B5',
        paddingVertical: 15
    },
});