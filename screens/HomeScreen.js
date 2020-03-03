import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'

class HomeScreen extends Component {
    state = {
        email: "",
        displayName: ""
    };
    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });
    }
    signOutUser = () => {
        firebase.auth().signOut();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 60 }}>
                    <Text>Hi {this.state.email}!</Text>
                    <TouchableOpacity style={{ marginTop: 10, color: "#E9446A" }} onPress={this.signOutUser}>
                        <Text>Log out</Text>
                    </TouchableOpacity>
                </View>

                    <MapView style={styles.map}
                        initialRegion={{
                        latitude:  30.5044,
                        longitude: -90.4612,
                        latitudeDelta: 0.0,
                        longitudeDelta: 0.0,
                  }}
                       showsUserLocation
               >
                        <MapView.Marker
                            coordinate={{
                            latitude: 30.5044,
                            longitude: -90.4612,
                            }}
                            title={"Road damaged"}
                            description={"description"}
                        />
                    </MapView>
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})

export default HomeScreen;