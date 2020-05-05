import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: false,
    };
  }
  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.email}</Text>
              <Text style={styles.name}>{post.address}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
            <Ionicons name="ios-more" size={24} color="#73788B" />
          </View>
          <Text style={styles.posts}>{post.description}</Text>
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMethod="auto"
          />
        </View>
      </View>
    );
  };
  getPosts() {
    this.setState({ isLoading: true });
    const firestore = firebase.firestore();
    const x = [];
    firestore
      .collection("post")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          x.push(doc.data());
          //console.log(doc.data());
        });

        this.setState({ posts: x });
      });
    this.setState({ isLoading: false });
    console.log(this.state.posts);
  }
  componentDidMount() {
    this.getPosts();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.image}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    color: "#D8D9DD",
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
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
export default NotificationScreen;
