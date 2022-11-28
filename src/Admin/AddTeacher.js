import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'

import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function AddTeacher() {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
    const [password, setpassword] = useState();
    const registerTeacher = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("/api/register/teacher", {
            "name": name,
            "email": email,
            "phone": phone,
            "password": password
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            console.log(response);
            setemail("");
            setphone("");
            setpassword("");
            setname("");
            ToastAndroid.show("Added", ToastAndroid.SHORT);
        }).catch((error) => {
            console.log(error?.response)
            ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
        });
    }
    return (
        <View style={{ padding: 10 }}>
            <TextInput value={name} onChangeText={(e) => setname(e)} style={{
                borderWidth: 1,
                borderColor: 'grey',
                padding: 10,
                borderRadius: 5,
                marginVertical: 5
            }} placeholder='Teacher Name' selectionColor='#e47d21' />
            <TextInput value={email} onChangeText={(e) => setemail(e)} style={{
                borderWidth: 1,
                borderColor: 'grey',
                padding: 10,
                borderRadius: 5,
                marginVertical: 5
            }} placeholder='Email' selectionColor='#e47d21' />
            <TextInput maxLength={10} value={phone} onChangeText={(e) => {setphone(e)}} style={{
                borderWidth: 1,
                borderColor: 'grey',
                padding: 10,
                borderRadius: 5,
                marginVertical: 5
            }} placeholder='Mobile number' keyboardType='numeric' selectionColor='#e47d21' />
            <TextInput value={password} onChangeText={(e) => setpassword(e)} style={{
                borderWidth: 1,
                borderColor: 'grey',
                padding: 10,
                borderRadius: 5,
                marginVertical: 5
            }} placeholder='Password' selectionColor='#e47d21' />
            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => registerTeacher()} style={{ backgroundColor: '#e47d21', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5, elevation: 2, marginTop: 20 }}><Text style={{ color: 'white', fontWeight: '600' }}>+ Add</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})