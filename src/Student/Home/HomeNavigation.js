import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from './Home';
import Attendance_Detail from './Attendance_Detail';
import Absence_Detail from './Absence_Detail';

const Stack = createStackNavigator();

const HomeNavigation = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen options={{
                headerShown: false,
            }} name="Main" component={Home} />
            <Stack.Screen options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyle: {
                    backgroundColor: '#e47d21'
                },
                headerTintColor: 'white'
            }} name="Attendance" component={Attendance_Detail} />
            <Stack.Screen options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyle: {
                    backgroundColor: '#e47d21',
                },

                headerTintColor: 'white'
            }} name="Absence" component={Absence_Detail} />
        </Stack.Navigator>
    )
}

export default HomeNavigation

const styles = StyleSheet.create({})