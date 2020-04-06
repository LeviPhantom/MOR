import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

class NotificationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>About Screen</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default NotificationScreen;
