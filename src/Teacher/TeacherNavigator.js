import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createStackNavigator, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from './Home';
import Attendance from './Attendance';

const Stack = createStackNavigator();
export default function TeacherNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{
        headerShown: false,
      }} name="Menu" component={Home} />
      <Stack.Screen options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          backgroundColor: '#e47d21'
        },
        headerTintColor: 'white'
      }} name="Attendance" component={Attendance} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})