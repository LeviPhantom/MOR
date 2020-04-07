import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

class NotificationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
            <Text>Contacts </Text>
            <Text></Text>
            <Text>City Limit Contacts:</Text>
            <Text>Abita Springs 985-892-0711</Text>
            <Text>Covington 985-898-4700</Text>
            <Text>Mandeville 985-624-3169 </Text>
            <Text>Pearl River 985-863-5800</Text>
            <Text> Slidell 985-646-4258  </Text>
            <Text></Text>
            <Text>For all reports outside city limits:</Text>
            <Text>Please contact St. Tammany Parish or State Transportation</Text>
            
            
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
