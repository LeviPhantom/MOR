import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state ={
            region: null
        }
        this._getLocationAsync();
    }
    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if(status!=='granted')
            console.log('Permission denied')
        
        let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true})
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
        }
        this.setState({region:region})
        console.log(this.state.region)

    }
    render() {
        return (
            <View style={styles.container}>
                <MapView
              style={{flex:1}}
              region={this.state.region}
              showsUserLocation={true}
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