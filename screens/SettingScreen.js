import React, { Component } from 'react';
import * as firebase from 'firebase'

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

class SettingScreen extends Component {
    state={
        email:"",
        displayName:""
    };
    componentDidMount(){
        const {email, displayName} = firebase.auth().currentUser;
        this.setState({email, displayName});
    }
    signOutUser = () =>{
        firebase.auth().signOut();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Hi {this.state.email}!</Text>
                <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
                    <Text style={{color: "#FFF", fontWeight:"500"}}>Log out</Text>
                </TouchableOpacity>            
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    button:{
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius:6,
        height: 50,
        width:100,
        alignItems:"center",
        justifyContent:"center"
    }
})
export default SettingScreen;