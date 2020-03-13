import React, { Component } from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons} from "@expo/vector-icons";

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import SettingScreen from "./screens/SettingScreen";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/NotificationScreen";

import * as firebase from 'firebase';
import firebaseKeys from './config';

var firebaseConfig = firebaseKeys

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home:{
          screen: HomeScreen,
          navigationOptions:{
            tabBarIcon:({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}/>
          }
        },
        Post:{
          screen: PostScreen,
          navigationOptions:{
            tabBarIcon:({tintColor}) => <Ionicons name="ios-add-circle" size={24} color={tintColor}/>
          }
        },
        Notification:{
          screen: NotificationScreen,
          navigationOptions:{
            tabBarIcon:({tintColor}) => <Ionicons name="ios-notifications" size={24} color={tintColor}/>
          }
        },
        Setting:{
          screen: SettingScreen,
          navigationOptions:{
            tabBarIcon:({tintColor}) => <Ionicons name="ios-settings" size={24} color={tintColor}/>
          }
        }
      },
      {
        defaultNavigationOptions:{
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if (navigation.state.key === "Post"){
              navigation.navigate("postModal")
            } else {
              defaultHandler()
            }
          }
      },
        tabBarOptions:{
          activeTintColor: "#161F3D",
          inactiveTintColor: "#B8BBC4",
          showLabel: false
        }
      }
    ),
      postModal: {
        screen: PostScreen
      }
  },
  {
      mode: "modal",
      headerMode:"none",
      //initialRouteName: "postModal"

  }
)


const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
},
  {
    headerMode:'none',
    header: null,
  })

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading",
      
    }
  )
)