import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default ({history}) => ( 
    <View style={styles.container}> 
        <Text>Hello there</Text>
        <Button title="change page" onPress={() => history.push('/signup')}/> 
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196F3'
    }
});