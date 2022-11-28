import { StyleSheet, Text, View, Dimensions, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
const windowHeight = Dimensions.get("screen").height;
const windowWidht = Dimensions.get("screen").width;
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
const Tab = createMaterialTopTabNavigator();


function Mon() {
    const [classdata, setclassdata] = useState();
    const [loading, setloading] = useState(false);
    const getSubjects = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        const classid = await SecureStore.getItemAsync("class");
        axios.get("api/get/timetable", {
            params: {
                classid,
                day: 0
            },
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            var sub = response?.data?.subject;
            var arr = sub.split(",");
            var temp = [];
            for (var i = 0; i < arr.length; i++) {
                temp.push({
                    "subject": arr[i]
                });
            }
            setclassdata(temp);
        }).catch((error) => {
            setloading(false);
            ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
        });
    }
    useEffect(() => {
        getSubjects();
    }, []);
    return (
        <View>

            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            {classdata?.map((i, ind) =>
                <View key={ind} style={{ backgroundColor: 'white', paddingVertical: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: '2%', marginTop: '2%', borderRadius: 5, elevation: 2 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{i.subject}</Text>
                </View>
            )}

        </View>
    )
}
function Tue() {
    const [classdata, setclassdata] = useState();
    const [loading, setloading] = useState(false);
    const getSubjects = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        const classid = await SecureStore.getItemAsync("class");
        axios.get("api/get/timetable", {
            params: {
                classid,
                day: 1
            },
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            var sub = response?.data?.subject;
            var arr = sub.split(",");
            var temp = [];
            for (var i = 0; i < arr.length; i++) {
                temp.push({
                    "subject": arr[i]
                });
            }
            setclassdata(temp);
        }).catch((error) => {
            setloading(false);
            ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
        });
    }
    useEffect(() => {
        getSubjects();
    }, []);
    return (
        <View>

            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            {classdata?.map((i, ind) =>
                <View key={ind} style={{ backgroundColor: 'white', paddingVertical: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: '2%', marginTop: '2%', borderRadius: 5, elevation: 2 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{i.subject}</Text>
                </View>
            )}

        </View>
    )
}
function Wed() {
    const [classdata, setclassdata] = useState();
    const [loading, setloading] = useState(false);
    const getSubjects = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        const classid = await SecureStore.getItemAsync("class");
        axios.get("api/get/timetable", {
            params: {
                classid,
                day: 2
            },
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            var sub = response?.data?.subject;
            var arr = sub.split(",");
            var temp = [];
            for (var i = 0; i < arr.length; i++) {
                temp.push({
                    "subject": arr[i]
                });
            }
            setclassdata(temp);
        }).catch((error) => {
            setloading(false);
            ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
        });
    }
    useEffect(() => {
        getSubjects();
    }, []);
    return (
        <View>

            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            {classdata?.map((i, ind) =>
                <View key={ind} style={{ backgroundColor: 'white', paddingVertical: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: '2%', marginTop: '2%', borderRadius: 5, elevation: 2 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{i.subject}</Text>
                </View>
            )}

        </View>
    )
}
function Thu() {
    const [classdata, setclassdata] = useState();
    const [loading, setloading] = useState(false);
    const getSubjects = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        const classid = await SecureStore.getItemAsync("class");
        axios.get("api/get/timetable", {
            params: {
                classid,
                day: 3
            },
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            var sub = response?.data?.subject;
            var arr = sub.split(",");
            var temp = [];
            for (var i = 0; i < arr.length; i++) {
                temp.push({
                    "subject": arr[i]
                });
            }
            setclassdata(temp);
        }).catch((error) => {
            setloading(false);
            ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
        });
    }
    useEffect(() => {
        getSubjects();
    }, []);
    return (
        <View>

            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            {classdata?.map((i, ind) =>
                <View key={ind} style={{ backgroundColor: 'white', paddingVertical: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: '2%', marginTop: '2%', borderRadius: 5, elevation: 2 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{i.subject}</Text>
                </View>
            )}

        </View>
    )
}
function Fri() {
    const [classdata, setclassdata] = useState();
    const [loading, setloading] = useState(false);
    const getSubjects = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        const classid = await SecureStore.getItemAsync("class");
        axios.get("api/get/timetable", {
            params: {
                classid,
                day: 4
            },
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            var sub = response?.data?.subject;
            var arr = sub.split(",");
            var temp = [];
            for (var i = 0; i < arr.length; i++) {
                temp.push({
                    "subject": arr[i]
                });
            }
            setclassdata(temp);
        }).catch((error) => {
            setloading(false);
            ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
        });
    }
    useEffect(() => {
        getSubjects();
    }, []);
    return (
        <View>

            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            {classdata?.map((i, ind) =>
                <View key={ind} style={{ backgroundColor: 'white', paddingVertical: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: '2%', marginTop: '2%', borderRadius: 5, elevation: 2 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{i.subject}</Text>
                </View>
            )}

        </View>
    )
}
function Sat() {
    const [classdata, setclassdata] = useState();
    const [loading, setloading] = useState(false);
    const getSubjects = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        const classid = await SecureStore.getItemAsync("class");
        axios.get("api/get/timetable", {
            params: {
                classid,
                day: 5
            },
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            var sub = response?.data?.subject;
            var arr = sub.split(",");
            var temp = [];
            for (var i = 0; i < arr.length; i++) {
                temp.push({
                    "subject": arr[i]
                });
            }
            setclassdata(temp);
        }).catch((error) => {
            setloading(false);
            ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
        });
    }
    useEffect(() => {
        getSubjects();
    }, []);
    return (
        <View>

            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            {classdata?.map((i, ind) =>
                <View key={ind} style={{ backgroundColor: 'white', paddingVertical: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: '2%', marginTop: '2%', borderRadius: 5, elevation: 2 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{i.subject}</Text>
                </View>
            )}

        </View>
    )
}
export default function TimeTable() {
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ width: windowWidht, height: windowHeight * 0.07, backgroundColor: '#e47d21', justifyContent: 'center', paddingLeft: 20 }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: windowHeight * 0.024 }}>Timetable</Text>
            </View>
            <Tab.Navigator screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: '#e47d21' },
            }} >
                <Tab.Screen name="Mon" component={Mon} />
                <Tab.Screen name="Tue" component={Tue} />
                <Tab.Screen name="Wed" component={Wed} />
                <Tab.Screen name="Thu" component={Thu} />
                <Tab.Screen name="Fri" component={Fri} />
                <Tab.Screen name="Sat" component={Sat} />
            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({

});
