import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase'

class RegisterScreen extends Component {
    state = {
        email: "",
        password: "",
        errorMessage: null,
        name: ""
    };
    handleSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials =>{
            return userCredentials.user.updateProfile({
                displayName: this.state.name
            });
        })
        .catch(error => this.setState({errorMessage: error.message}))
    }
   
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.gretting}>Welcome to MOR</Text>
                <Text style={styles.gretting}>Sign up to get started</Text>


                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput style={styles.input} autoCapitalize="none" onChangeText={name=>this.setState({name})}></TextInput>
                    </View>

                    <View style={{marginTop:30}}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput style={styles.input} autoCapitalize="none" onChangeText={email=>this.setState({email})}></TextInput>
                    </View>

                    <View style={{marginTop:30}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} autoCapitalize="none" secureTextEntry onChangeText={password=>this.setState({password})}></TextInput>
                    </View>              
                    
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{color: "#FFF", fontWeight:"500"}}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf:"center", marginTop:32}} onPress={()=> this.props.navigation.navigate("Login")}>
                    <Text style={{color:"#414959", fontSize: 13 }}>
                        New to MOR?  <Text style={{fontWeight: "500", color: '#E9446A' }}>Login</Text>
                    </Text>
                </TouchableOpacity>

            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    gretting:{
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign:"center"
    },
    error:{
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign:"center"
    },
    errorMessage:{
        height:72,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:30
    },
    form:{
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle:{
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input:{
        borderBottomColor:"#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:36,
        fontSize: 15,
        color: "#161F3D"
    },
    button:{
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius:6,
        height: 50,
        alignItems:"center",
        justifyContent:"center"
    }
})

export default RegisterScreen;