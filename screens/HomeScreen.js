import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'

class HomeScreen extends Component {
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
                <View style={{height: 60}}>
                <Text>Hi {this.state.email}!</Text>
                <TouchableOpacity style={{marginTop:10, color:"#E9446A"}} onPress={this.signOutUser}>
                    <Text>Log out</Text>
                </TouchableOpacity>
                </View>
                <MapView
              provider={PROVIDER_GOOGLE}
              style={{flex:1}}
              region={{
                  latitude: 42.88204,
                  longitude: 74.582748,
                  latitudeDelta:0.0922,
                  longitudeDelta:0.0421
              }}
              showsUserLocation
          />
            </View>
       
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        //justifyContent: "center",
        //alignItems: "center"
    }
})

export default HomeScreen;