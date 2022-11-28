import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
const windowHeight = Dimensions.get("screen").height;
const windowWidht = Dimensions.get("screen").width;
import * as SecureStore from 'expo-secure-store'
import axios from 'axios';
import { abs } from 'react-native-reanimated';
export default function Home({ navigation }) {

    const [present, setpresent] = useState();
    const [total, settotal] = useState([]);
    const [absent, setabsent] = useState();
    const [loading, setloading] = useState(false);
    const absentDetail = (data) => {
        setabsent(data.filter((i) => i.status == 0));
    }
    const getData = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/get/student/attendace/data",
            {
                headers: {
                    "Authorization": token
                }
            }).then((response) => {
                setloading(false);
                settotal(response?.data?.data);
                absentDetail(response?.data?.data);
            }).catch((err) => {
                setloading(false);
                if (err.message == "Network Error") {
                    ToastAndroid.show("Network Error", ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT);
                }
            });
    }
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    useEffect(() => {
        getData();
    }, []);
    return (
        <View style={{ widht: '100%', height: '100%' }}>
            <StatusBar />


            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            <View style={{ width: windowWidht, height: windowHeight * 0.07, backgroundColor: '#e47d21', justifyContent: 'center', paddingLeft: 20, }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: windowHeight * 0.024 }}>Attendance</Text>
            </View>
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.33 }}>
                        <View style={{ width: windowWidht * 0.2, height: windowWidht * 0.2, backgroundColor: '#e47d21', borderRadius: windowWidht * 0.2, opacity: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: '600', fontSize: windowHeight * 0.02 }}>{total.length}</Text>
                        </View>
                        <Text numberOfLines={1}>Number of Days</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.33 }}>
                        <View style={{ width: windowWidht * 0.2, height: windowWidht * 0.2, backgroundColor: '#e47d21', borderRadius: windowWidht * 0.2, opacity: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: '600', fontSize: windowHeight * 0.02 }}>{total?.length - absent?.length}</Text>
                        </View>
                        <Text>Present</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.33 }}>
                        <View style={{ width: windowWidht * 0.2, height: windowWidht * 0.2, backgroundColor: '#e47d21', borderRadius: windowWidht * 0.2, opacity: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: '600', fontSize: windowHeight * 0.02 }}>{parseFloat((total?.length - absent?.length) / total?.length * 100).toFixed(1)}%</Text>
                        </View>
                        <Text numberOfLines={1}>Attendance %</Text>
                    </View>
                </View>

            </View>
            <View>
                <View style={{ backgroundColor: '#e47d21', marginTop: windowHeight * 0.02, paddingLeft: windowWidht * 0.05, paddingVertical: windowHeight * 0.005 }}>
                    <Text style={{ fontWeight: 'bold' }}>Recent Absence</Text>
                </View>
                <ScrollView>
                    {
                        absent?.map((i, ind) =>
                            <View key={ind} style={{ alignItems: 'center', paddingVertical: '2%', backgroundColor: 'white', marginTop: '2%', marginHorizontal: '2%', borderRadius: 5, elevation: 2 }}>
                                <Text style={{ fontWeight: 'bold' }}>{i.date.split("T")[0].split("-")[2]} {month[i.date.split("T")[0].split("-")[1] - 1]} {i.date.split("T")[0].split("-")[0]}</Text>
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({})