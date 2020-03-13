import React, { Component } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../Fire"
class PostScreen extends Component {
    state = {
        address: "",
        image: null,
        latitude: null,
        longtitude: null,
        description: ""
    }
    render() {
        return (
            <SafeAreaView style = {styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>    
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontWeight:"500"}}>Post</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>What is the address?</Text>
                        <TextInput style={styles.input} autoCapitalize="none" onChangeText={address=>this.setState({address})}></TextInput>
                    </View>

                    <View style={{marginTop:30}}>
                        <Text style={styles.inputTitle}>Description</Text>
                        <TextInput style={styles.input} autoCapitalize="none" secureTextEntry onChangeText={description=>this.setState({description})}></TextInput>
                    </View>  
                </View>
                <TouchableOpacity style={styles.photo}>
                    <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
                </TouchableOpacity>
            </SafeAreaView>
            
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,  
    },
    form:{
        marginBottom: 35,
        marginHorizontal: 20
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB",
        marginBottom:20

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
    photo:{
        alignItems:"flex-end",
        marginHorizontal:32
    }
})
export default PostScreen;