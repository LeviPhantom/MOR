import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import * as firebase from "firebase";
const { width, height } = Dimensions.get("screen");

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      markers: [],
      destination: "../assets/icon.png",
    };
    this._isMounted = false;
    this._getLocationAsync();
  }
  componentDidMount() {
    this._isMounted = true;
    this.getMapMarkers();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  getMapMarkers() {
    const firestore = firebase.firestore();
    const array = [];
    firestore
      .collection("post")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          array.push(doc.data());
        });
        this._isMounted && this.setState({ markers: array });
      });
  }
  onMarkerPress = (location) => () => {
    this.setState({
      destination: location.image,
    });
    console.log(this.state.destination);
  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") console.log("Permission denied");

    let location = await Location.getCurrentPositionAsync({
      enabledHighAccuracy: true,
    });
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    };
    this._isMounted && this.setState({ region: region });
  };

  render() {
    const { destination } = this.state;
    if (this.state.markers !== null) {
      return (
        <View style={styles.container}>
          <MapView
            style={{ flex: 1 }}
            region={this.state.region}
            showsUserLocation={true}
            //onMarkerSelect={this.onMarkerPress(marker)}
          >
            {this.state.markers.map((marker, index) => (
              <MapView.Marker
                key={index}
                title={marker.description}
                description={marker.address}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={this.onMarkerPress(marker)}
              ></MapView.Marker>
            ))}
            <Image
              source={{ uri: this.state.destination }}
              style={{
                flex: 1,
                width: width * 0.95,
                alignSelf: "center",
                height: height * 0.15,
                position: "absolute",
                bottom: height * 0.05,
              }}
            />
          </MapView>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
