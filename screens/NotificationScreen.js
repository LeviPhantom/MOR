import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import * as firebase from "firebase";

class NotificationScreen extends Component {
  state = {
    posts: null
  };
  // renderPost = post => {
  //     return(
  //         <View>
  //             <Text>I'm a post</Text>
  //         </View>
  //     );
  // }
  componentDidMount() {
    const firestore = firebase.firestore();
    firestore
      .collection("post")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          //console.log(doc.data())
        });
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: 64,
    paddingBottom: 15,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  }
});
export default NotificationScreen;
