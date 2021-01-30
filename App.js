import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

export default class App extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = { text: '' };
//  }

 alertMyText(input =[]) {
   Alert.alert(input.text); 
 }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
          <Stack.Screen name='Start' component={Start} />
          <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
      // <NavigationContainer>
      //   <Tab.Navigator initialRouteName='Start'>
      //     <Tab.Screen name='Start' component={Start} />
      //     <Tab.Screen name='Chat' component={Chat} />
      //   </Tab.Navigator>
      // </NavigationContainer>

    );
  }
}
