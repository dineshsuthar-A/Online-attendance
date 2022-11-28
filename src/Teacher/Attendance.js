import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { add } from 'react-native-reanimated';

const windowHeight = Dimensions.get("screen").height;
const windowWidht = Dimensions.get("screen").width;
const Attendance = (props) => {
    const [studentdata, setstudentdata] = useState();
    const [loading, setloading] = useState(false);


    const getStudentData = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("api/data/student", {
            params: {
                class: props?.route?.params?.id
            },
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            var arr = []
            for (var i = 0; i < response?.data?.data.length; i++) {
                arr.push({
                    "student": response?.data?.data[i],
                    "status": 1
                });
            }
            setstudentdata(arr);
        }).catch((err) => {
            setloading(false);
            console.log(err);
            if (err.message == "Network Error") {
                ToastAndroid.show("Network Error", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT);
            }
        });
    }
    const tap = (id, status) => {

        setstudentdata(studentdata.map((i, ind) => {
            if (i.student.id == id) {
                return { ...i, "status": status }
            }
            return i;
        }
        ));
    }

    const Submit = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("api/attendance/submit",
            {
                data: studentdata
            }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            props.navigation.pop();
            ToastAndroid.show("Submitted", ToastAndroid.SHORT);
        }).catch((err) => {
            setloading(false);
            if (err.message == "Network Error") {
                ToastAndroid.show("Network Error", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT);
            }
        });
    }

    useEffect(() => {
        getStudentData();
    }, []);
    return (
        <View>
            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            <Text style={{ color: 'red', fontWeight: 'bold', marginHorizontal: 10, marginVertical: 10 }}>Note: Only mark those student who are absent.</Text>
            <View style={{ borderBottomWidth: 2 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 10 }}>Student List</Text>
            </View>
            <View style={{ paddingTop: 10, width: '100%', paddingHorizontal: '4%' }}>
                <ScrollView >
                    {
                        studentdata?.map((i, ind) =>
                            <TouchableOpacity key={ind} onPress={() => {
                                tap(i.student.id, !i.status);
                            }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: '3%', zIndex: 10 }}>
                                <View style={{ width: windowHeight * 0.017, borderWidth: 1, height: windowHeight * 0.017, borderRadius: windowHeight * 0.03, overflow: 'hidden', padding: 1, marginRight: 5, zIndex: 4 }}>
                                    {
                                        !i.status ?
                                            <View style={{ backgroundColor: '#e47d21', width: '100%', height: '100%', borderRadius: windowHeight * 0.02 }}>

                                            </View> : null
                                    }
                                </View>
                                <Text style={{ fontSize: 15, marginLeft: 10 }}>{i.student.name}</Text>
                            </TouchableOpacity>
                        )
                    }

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => {
                            Submit()
                        }} style={{ backgroundColor: 'orange', paddingHorizontal: '15%', paddingVertical: '2%', borderRadius: 40, marginTop: '5%' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Attendance

const styles = StyleSheet.create({})