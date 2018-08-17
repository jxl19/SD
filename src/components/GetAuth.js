import React from 'react';
import { View, Text, Button, StyleSheet, WebView, Linking, TouchableOpacity } from 'react-native';
import { Redirect } from 'react-router-native';


export default class GetAuth extends React.Component {
    constructor(props){
        super(props)
    
        this.state = {
          closePage: false,
          accessToken: '',
          refreshToken: ''
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
        fetch(`https://safedeliver.herokuapp.com/api/users/testuser`,
        {
          method: 'GET'
        })
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log(res);
          this.setState({ accessToken: res.accessToken, refreshToken : res.refreshToken, closePage: true });
        })
        .catch(err => console.log(err))
    
        
    }
    render() {
        if(this.state.closePage && this.state.accessToken && this.state.refreshToken) {
            return <Redirect to='/HomePage' />
        } 
        else if(this.state.closePage && !this.state.accessToken && !this.state.refreshToken) {
            console.log('am i here');
            return <Redirect to='/HandleAuth' />
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