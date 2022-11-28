import { StyleSheet, ToastAndroid, ScrollView, Dimensions, Text, View, TextInput, StatusBar, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import axios from 'axios';
const windowHeight = Dimensions.get("window").height;
import * as SecureStore from 'expo-secure-store';

export default function Login({ navigation }) {
    const [loading, setloading] = useState(false);
    const [phone, setphone] = useState("");
    const [pass, setPass] = useState("");
    const [active, setActive] = useState();
    const [selected, setselected] = useState(0);
    const pa = useRef();
    const phonenumber = (inputtxt) => {
        var phoneno = /^\d{10}$/;
        if (((inputtxt).match(phoneno))) {
            return true;
        }
        else {
            return false;
        }
    }

    const onLogin = () => {
        if (!phone || phone?.length < 1) {
            ToastAndroid.show("Please fill all the columns", ToastAndroid.SHORT);
        }
        else if (!pass || pass?.length < 1) {
            ToastAndroid.show("Please enter the password", ToastAndroid.SHORT);
            pa.current.focus();
        } else {
            setloading(true);
            if (selected == 0) {
                axios.post("api/login", {
                    email: phone.trim(),
                    password: pass,
                    type: 0
                }).then(async (response) => {
                    setloading(false);
                    console.log(response?.data);
                    await SecureStore.setItemAsync("account", "Student");
                    await SecureStore.setItemAsync("token", response.data.token);
                    await SecureStore.setItemAsync("name", response?.data?.user?.name);
                    await SecureStore.setItemAsync("class", response?.data?.user?.class.toString());
                    await SecureStore.setItemAsync("email", response?.data?.user?.email);
                    await SecureStore.setItemAsync("phone", response?.data?.user?.phone);
                    await SecureStore.setItemAsync("rollno", response?.data?.user?.rollno.toString());
                    ToastAndroid.show("Logged In", ToastAndroid.SHORT);
                    navigation.replace("Student");
                }).catch((err) => {
                    if (err.message == "Network Error") {
                        ToastAndroid.show("Network Error", ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT)
                    }
                    setloading(false);
                });
            } else if (selected == 1) {

                axios.post("api/login", {
                    email: phone.trim(),
                    password: pass,
                    type: 1
                }).then(async (response) => {
                    console.log(response);
                    setloading(false);
                    await SecureStore.setItemAsync("account", "Teacher");
                    await SecureStore.setItemAsync("token", response.data.token);

                    navigation.replace("Teacher");
                }).catch((err) => {
                    setloading(false);
                    if (err.message == "Network Error") {
                        ToastAndroid.show("Network Error", ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT)
                    }
                });
            } else {
                axios.post("api/login", {
                    user: phone.trim(),
                    password: pass,
                    type: 2
                }).then(async (response) => {
                    setloading(false);
                    await SecureStore.setItemAsync("account", "Admin");
                    await SecureStore.setItemAsync("token", response.data.token);
                    navigation.replace("Admin");
                }).catch((err) => {
                    setloading(false);
                    if (err.message == "Network Error") {
                        ToastAndroid.show("Network Error", ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT);
                    }
                });
            }
        }
    }


    return (
        <ScrollView style={styles.fullView} keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />

            <View style={styles.container}>
                <StatusBar backgroundColor="#e47d21" barStyle="white" />
                <View style={styles.header}>
                    <Text style={styles.headerLoginText}>User Login</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps="handled" style={{ position: 'absolute', backgroundColor: 'white', width: "90%", top: windowHeight * 0.15, marginLeft: "5%", marginRight: "5%", borderTopRightRadius: windowHeight * 0.02, borderTopLeftRadius: windowHeight * 0.02, elevation: 2, height: '100%', paddingHorizontal: '5%', bottom: 0 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.mainsection}>
                        <Image source={require('../assets/icon.png')} style={styles.logo} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => {
                                setselected(0);
                                setPass("");
                            }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: windowHeight * 0.015, borderWidth: 1, height: windowHeight * 0.015, borderRadius: windowHeight * 0.015, overflow: 'hidden', padding: 1, marginRight: 5 }}>
                                    {selected == 0 ? <View style={{ backgroundColor: '#e47d21', width: '100%', height: '100%', borderRadius: windowHeight * 0.02 }}></View> : null}
                                </View>
                                <Text>Student</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setselected(1);
                                setPass("");

                            }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: windowHeight * 0.015, borderWidth: 1, height: windowHeight * 0.015, borderRadius: windowHeight * 0.015, overflow: 'hidden', padding: 1, marginRight: 5 }}>
                                    {selected == 1 ? <View style={{ backgroundColor: '#e47d21', width: '100%', height: '100%', borderRadius: windowHeight * 0.02 }}></View> : null}
                                </View>
                                <Text>Teacher</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setselected(2);
                                setPass("");

                            }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: windowHeight * 0.015, borderWidth: 1, height: windowHeight * 0.015, borderRadius: windowHeight * 0.015, overflow: 'hidden', padding: 1, marginRight: 5 }}>
                                    {selected == 2 ? <View style={{ backgroundColor: '#e47d21', width: '100%', height: '100%', borderRadius: windowHeight * 0.02 }}></View>
                                        : null}
                                </View>
                                <Text>Admin</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput autoCapitalize='none' autoFocus={true} onFocus={() => setActive(0)} placeholder={(selected == 1) ? "Mobile Number" : (selected == 2) ? "Username" : 'Admission number'} keyboardType={selected == 1 ? "number-pad" : "ascii-capable"} onChangeText={(t) => setphone(t)} style={(active == 0) ? styles.textboxactive : styles.textbox} onSubmitEditing={() => pa.current.focus()} selectionColor="#e47d21" />
                        <TextInput value={pass} autoCapitalize='none' ref={pa} onFocus={() => setActive(1)} placeholder={'Password'} style={(active == 1) ? styles.textboxactive : styles.textbox} onChangeText={(t) => setPass(t)} onSubmitEditing={() => onLogin()} secureTextEntry={true} selectionColor="#e47d21" />
                        <TouchableOpacity style={styles.LoginButton} onPress={() => onLogin()}><Text style={styles.loginButtonText}>Login</Text></TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: 'white', width: '100%', height: '100%' },
    header: { display: 'flex', alignItems: 'center', backgroundColor: '#e47d21', height: windowHeight * 0.3, borderBottomLeftRadius: windowHeight * 0.02, borderBottomRightRadius: windowHeight * 0.02 },
    headerLoginText: { color: 'white', fontSize: windowHeight * 0.035, marginTop: "8%", fontWeight: '700', fontFamily: 'Roboto' },
    mainsection: { display: 'flex', justifyContent: 'center' },
    logo: { width: windowHeight * 0.2, height: windowHeight * 0.2, borderRadius: windowHeight * 0.2 / 2, alignSelf: 'center', marginTop: windowHeight * 0.03 },
    textbox: { width: '100%', borderWidth: 1, height: windowHeight * 0.07, borderColor: 'lightgrey', fontSize: windowHeight * 0.02, marginTop: windowHeight * 0.02, borderRadius: 40, paddingHorizontal: 20 },
    textboxactive: { width: '100%', borderWidth: 2, height: windowHeight * 0.07, borderColor: '#e47d21', fontSize: windowHeight * 0.02, marginTop: windowHeight * 0.02, borderRadius: 40, paddingHorizontal: 20, elevation: 2, backgroundColor: 'white' },
    LoginButton: {
        marginTop: windowHeight * 0.04, width: '100%', borderRadius: 30,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 4, // Android
        justifyContent: 'center', alignItems: 'center', height: windowHeight * 0.07,
        marginBottom: 10
    },
    loginButtonText: { fontSize: windowHeight * 0.02, color: '#e47d21', fontWeight: 'bold' },
    footersection: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: windowHeight * 0.16 },
    fullView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    }

})