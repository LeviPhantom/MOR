import React, { Component } from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen'

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
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)