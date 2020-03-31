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

var firebaseConfig = {
  apiKey: "AIzaSyAvHslFrqopTvuW_jScOQXBmfG65Hjf7N8",
  authDomain: "mor411.firebaseapp.com",
  databaseURL: "https://mor411.firebaseio.com",
  projectId: "mor411",
  storageBucket: "mor411.appspot.com",
  messagingSenderId: "1020872581336",
  appId: "1:1020872581336:web:da336330b6a21bbe1f77ad"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const AppTabNavigator = createBottomTabNavigator(
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
    },
  }
)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
},
  {
    headerMode:'none',
    header: null
  })

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading",
      
    }
  )
)