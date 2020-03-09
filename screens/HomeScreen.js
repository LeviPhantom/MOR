import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
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