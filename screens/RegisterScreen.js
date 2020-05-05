import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as firebase from "firebase";

const { width, height } = Dimensions.get("screen");

class RegisterScreen extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
    name: "",
  };
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            paddingVertical: 5,
          }}
        >
          <Image
            source={require("../assets/MORLOGO.png")}
            style={{
              width: width * 0.85,
              height: height * 0.4,
              position: "relative",
            }}
          />
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>
            Maintain Our Road
          </Text>
        </View>
        <Text style={styles.gretting}>Sign up to get started</Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(name) => this.setState({ name })}
            ></TextInput>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
            ></TextInput>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(password) => this.setState({ password })}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "500", color: "#6483a5" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gretting: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  errorMessage: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 36,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 50,
    backgroundColor: "#6483a5",
    borderRadius: 6,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegisterScreen;
