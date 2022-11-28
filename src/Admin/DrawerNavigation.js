import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Dashboard from './Dashboard';
import AddStudent from './AddStudent';
import AddTeacher from './AddTeacher';
import AddClass from './AddClass';
import StudentList from './StudentList';
import TeacherList from './TeacherList';
import ClassTimeTable from './TimeTable/ClassTimeTable';
import * as SecureStore from 'expo-secure-store';
import Notice from './Notice';
const Drawer = createDrawerNavigator();
export default function DrawerNavigation() {
    const DrawerContent = (props) => (
        <View>
            <View
                style={{
                    backgroundColor: '#f50057',
                    height: 140,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ color: 'white', fontSize: 30 }}>
                    Header
                </Text>
            </View>
            <DrawerItems {...props} />
        </View>
    )

    return (
        <Drawer.Navigator screenOptions={{
            drawerActiveBackgroundColor: "#e47d21", drawerActiveTintColor: "white", headerStyle: {
                backgroundColor: '#e47d21',
            }, headerTitleStyle: {
                color: 'white'
            }

        }} drawerContent={props => {
            return (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem label="Logout" onPress={async () => {
                        await SecureStore.deleteItemAsync("token");
                        await SecureStore.deleteItemAsync("account");
                        props.navigation.replace("Login");
                    }} />
                </DrawerContentScrollView>
            )
        }} >
            <Drawer.Screen name="Home" options={{ headerTitle: "Dashboard", }} component={Dashboard} />
            <Drawer.Screen name="notice" options={{ title: "Notice", }} component={Notice} />
            <Drawer.Screen name="addstudent" options={{ title: "Add Student", }} component={AddStudent} />
            <Drawer.Screen name="addteacher" options={{ title: "Add Teacher", }} component={AddTeacher} />
            <Drawer.Screen name="addclass" options={{ title: "Add Class", }} component={AddClass} />
            <Drawer.Screen name="studentlist" options={{ title: "Student List", }} component={StudentList} />
            <Drawer.Screen name="teacherlist" options={{ title: "Teacher List", }} component={TeacherList} />
            <Drawer.Screen name="timetable" options={{ title: "Class TimeTables", }} component={ClassTimeTable} />

        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})