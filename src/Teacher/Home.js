import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const windowHeight = Dimensions.get("screen").height;
const windowWidht = Dimensions.get("screen").width;

const Home = ({ navigation }) => {
    const [selected, setselected] = useState(1);
    const [classs, setclassdata] = useState();
    const [loading, setloading] = useState(false);
    const Logout = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("account");
        navigation.replace("Login");
    }
    const getClasses = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/get/attendace/classes", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            setclassdata(response?.data?.data);
        }).catch((err) => {
            setloading(false);
            if (err.message == "Network Error") {
                ToastAndroid.show("Network Error", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT);
            }
        });
    }
    useFocusEffect(React.useCallback(() => {
        getClasses();
    }, []));

    return (
        <View>

            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            <View style={{ width: windowWidht, height: windowHeight, position: 'absolute', left: 0, top: 0, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', width: windowWidht * 0.8, height: windowHeight * 0.7, borderRadius: 8, elevation: 2, padding: 10, zIndex: 5 }}>
                    <View style={{ paddingVertical: '3%' }}>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Select Class</Text>
                    </View>
                    <View style={{ width: '100%', height: '80%', paddingHorizontal: 10, paddingVertical: '3%', borderTopWidth: 1, borderBottomWidth: 1 }}>
                        <ScrollView style={{ width: '100%', height: 60, }} >
                            {
                                classs?.map((i, ind) =>
                                    <TouchableOpacity key={ind} onPress={() => {
                                        setselected(i.id);
                                    }} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '3%', zIndex: 10 }}>
                                        <View style={{ width: windowHeight * 0.017, borderWidth: 1, height: windowHeight * 0.017, borderRadius: windowHeight * 0.03, overflow: 'hidden', padding: 1, marginRight: 5, zIndex: 4 }}>
                                            {selected == i.id ? <View style={{ backgroundColor: '#e47d21', width: '100%', height: '100%', borderRadius: windowHeight * 0.02 }}></View> : null}
                                        </View>
                                        <Text style={{ fontSize: 15, marginLeft: 10 }}>{i.classname}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Attendance', {
                            id: selected
                        })} style={{ backgroundColor: 'orange', paddingHorizontal: '4%', paddingVertical: '3%', borderRadius: 40, marginTop: '5%' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Take Attendance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Logout()} style={{ backgroundColor: 'orange', paddingHorizontal: '4%', paddingVertical: '3%', borderRadius: 40, marginTop: '5%', marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View>
                <View style={{ width: '100%', backgroundColor: '#e47d21', paddingVertical: '6%', paddingHorizontal: '2%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Attendance</Text>
                </View>
                <View style={{ backgroundColor: 'grey', width: '100%', height: '100%', opacity: 0.2 }}></View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({

});