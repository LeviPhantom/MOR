import React, { Component } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../Fire"
import * as ImagePicker from "expo-image-picker"

const firebase = require("firebase");
require("firebase/firestore");

class PostScreen extends Component {
    state = {
        address: "",
        image:"../assets/icon.png",
        description: "",
        latitude:null,
        longtitude:null
    }
    componentDidMount() {
        this.getPhotoPermission();
    }
    getPhotoPermission = async () => {
        if (Constants.platform.ios){
            const [status] = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status != "granted"){
                alert("We need permission to access your camera roll");
            }
        }
    };
    handlePost = () => {
        Fire.shared.addPost({address: this.state.address.trim(), description: this.state.description.trim(), localUri: this.state.image}). then(ref =>{
            this.setState({address:"",image:"../assets/icon.pn", description:""})
            this.props.navigation.goBack()
        })
        .catch(error => {
            console.log(error);
        });
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3]
        })
        
        if (!result.cancelled){
            this.setState({image: result.uri});
        }
    }

    render() {
        return (
            <SafeAreaView style = {styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>    
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
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
                        <TextInput style={styles.input} autoCapitalize="none" onChangeText={description=>this.setState({description})}></TextInput>
                    </View>  
                </View>
                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
                </TouchableOpacity>
                <View style={{marginHorizontal:32, marginTop: 32, height:160}}>
                    <Image source={{uri:this.state.image}} style={{width:"100%", height:"100%"}}></Image>
                </View>
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