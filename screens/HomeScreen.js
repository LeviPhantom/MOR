import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import * as firebase from "firebase";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      markers: []
    };
    this._getLocationAsync();
  }
  componentDidMount() {
    this.getMapMarkers();
  }
  getMapMarkers() {
    const firestore = firebase.firestore();
    firestore
      .collection("post")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.setState({ markers: [doc.data()] });
          console.log(this.state.markers);
        });
      });
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") console.log("Permission denied");

    let location = await Location.getCurrentPositionAsync({
      enabledHighAccuracy: true
    });
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045
    };
    this.setState({ region: region });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          showsUserLocation={true}
        >
          {this.state.markers &&
            this.state.markers.map((marker, index) => (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: Number(marker.lattitude),
                  longitude: Number(marker.longitude)
                }}
              />
            ))}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HomeScreen;
