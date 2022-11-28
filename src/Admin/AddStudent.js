import { StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity, Dimensions, TextInputComponent } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
const windowHeight = Dimensions.get("screen").height;
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function AddStudent() {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [studentname, setstudentname] = useState();
    const [classid, setclassid] = useState();
    const [classes, setclasses] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
    const [password, setpassword] = useState();
    const [rollno, setrollno] = useState();

    const registerStudent = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("/api/register/student", {
            "name": studentname,
            "class": classid,
            "rollno": rollno,
            "email": email,
            "phone": phone,
            "password": password
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setstudentname("");
            setrollno("");
            setemail("");
            setphone("");
            setclassid(null);
            setpassword("");
            ToastAndroid.show("Added", ToastAndroid.SHORT);
        }).catch((error) => {
            console.log(error.response.data);
            ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
        });
    }
    const getClasses = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/get/classes", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setclasses(response?.data?.data);
        }).catch((err) => {
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
        <View style={{ padding: 10 }}>
            <TextInput style={{
                borderWidth: 1,
                borderColor: 'grey',
                padding: 10,
                borderRadius: 5,
                marginVertical: 5,
                height: windowHeight * 0.07
            }} value={studentname} onChangeText={(t) => {
                setstudentname(t);
            }} placeholder='Student Name' selectionColor='#e47d21' />
            <TextInput value={rollno} onChangeText={(e) => setrollno(e)} style={{
                borderWidth: 1,
                borderColor: 'grey',
                padding: 10,
                borderRadius: 5,
                marginVertical: 5,
                height: windowHeight * 0.07
            }} placeholder='Admission number' selectionColor='#e47d21' />
            <View
                style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    borderRadius: 5,
                    height: windowHeight * 0.07,
                    marginVertical: 5
                }}>
                <Picker
                    selectedValue={classid}
                    onValueChange={(itemValue, itemIndex) =>
                        setclassid(itemValue)

                    }
                >
                    <Picker.Item style={{ color: 'grey' }} label="Class" value={null} />
                    {classes ?
                        classes.map((i, ind) =>
                            < Picker.Item key={ind} label={i.classname} value={i.id} />
                        ) : < Picker.Item label="No data present" />
                    }
                </Picker>
            </View>

            <TextInput value={email} onChangeText={(e) => setemail(e)} style={{
                borderWidth: 1,
                borderColor: 'grey',
                padding: 10,
                borderRadius: 5,
                marginVertical: 5,
                height: windowHeight * 0.07
            }} placeholder='Email' selectionColor='#e47d21' />

            <TextInput
                value={phone} maxLength={10} onChangeText={(e) => setphone(e)}
                style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 5,
                    height: windowHeight * 0.07,
                }} placeholder='Mobile number' keyboardType='numeric' selectionColor='#e47d21' />

            <TextInput value={password} onChangeText={(e) => setpassword(e)}
                style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 5,
                    height: windowHeight * 0.07,
                }} placeholder='Password' selectionColor='#e47d21' />

            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => registerStudent()} style={{ backgroundColor: '#e47d21', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5, elevation: 2, marginTop: 20 }}><Text style={{ color: 'white', fontWeight: '600' }}>+ Add</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})