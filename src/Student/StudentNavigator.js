import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from './Home/Home';
import News from './News';
import TimeTable from './TimeTable';
import Profile from './Profile';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HomeNavigation from './Home/HomeNavigation';
import { AntDesign } from '@expo/vector-icons';
const Tab = createMaterialBottomTabNavigator();
export default function StudentNavigator() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarColor: '#e47d21',
        }}>
            <Tab.Screen name="Notification" options={{
                tabBarLabel: 'Notice',
                tabBarIcon: ({ color }) => (
                    <Entypo name="news" size={24} color={color} />)
            }} component={News} />
            <Tab.Screen name="Home" options={{
                tabBarLabel: 'Attendance',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="barschart" size={24} color={color} />),
            }} component={HomeNavigation} />
            <Tab.Screen name="TimeTable" options={{
                tabBarLabel: 'Time Table',
                tabBarIcon: ({ color }) => (
                    <Entypo name="calendar" size={24} color={color} />)
            }} component={TimeTable} />

            <Tab.Screen name="Profile" options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="person" size={24} color={color} />)
            }} component={Profile} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

})