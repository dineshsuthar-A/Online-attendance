import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
import Login from './src/Login';
import React, { useEffect, useState } from 'react';
import DrawerNavigation from './src/Admin/DrawerNavigation';
import StudentNavigator from './src/Student/StudentNavigator';
import TeacherNavigator from './src/Teacher/TeacherNavigator';
import axios from 'axios';
const Stack = createStackNavigator();
import * as SecureStore from 'expo-secure-store';
axios.defaults.baseURL = "http://servicelearning.asdevsoft.com/";
export default function App() {
  const [screen, setscreen] = useState();
  const [flag, setFlag] = useState(0);
  const check = async () => {
    var account = await SecureStore.getItemAsync("account");
    console.log(account);
    if (account == null) {
      setscreen("Login");
      setFlag(1);
    } else {
      setscreen(account);
      setFlag(1);
    }
  }
  useEffect(() => {
    check();
  }, [screen]);
  return (
    flag ?
      <NavigationContainer>
        <StatusBar backgroundColor="#e47d21" barStyle="white" />
        <Stack.Navigator initialRouteName={screen} >
          <Stack.Screen options={{
            headerShown: false,
          }} name="Login" component={Login} />
          <Stack.Screen options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} name="Admin" component={DrawerNavigation} />
          <Stack.Screen options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} name="Student" component={StudentNavigator} />
          <Stack.Screen options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} name="Teacher" component={TeacherNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      : null
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
