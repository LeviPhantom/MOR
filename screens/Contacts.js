import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase'

class Contacts extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {this.props.navigation.navigate(user ? "App": "Auth")
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Contact State Maintainence @ 123-456-7890   statefix@state.org</Text>
                <ActivityIndicator size = "large">

                </ActivityIndicator>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Contacts;