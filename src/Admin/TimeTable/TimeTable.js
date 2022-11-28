import { StyleSheet, Text, TouchableOpacity, View, BackHandler, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function TimeTable(props) {
    const [hide, sethide] = useState(false);
    const [classdata, setclassdata] = useState([]);
    const [Subject, setsubject] = useState();
    const [loading, setloading] = useState();

    BackHandler.addEventListener('hardwareBackPress', function () {
        if (hide) {
            sethide(false);
        } else {
            props.navigation.goBack();
        }
        return true;
    });
    const add = () => {
        if (Subject == undefined || Subject == null) {
            ToastAndroid.show("Please type something", ToastAndroid.SHORT);

        } else {

            setclassdata([...classdata, { "subject": Subject.trim() }]);
            sethide(false);
            setsubject();
        }
    }

    const onSubmit = async () => {
        setloading(true);
        var st = "";
        for (var i = 0; i < classdata.length; i++) {
            if (st == "") {
                st = classdata[i].subject;
            } else {
                st += "," + classdata[i].subject;
            }
        }
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("api/add/timetable", {
            classid: props?.route?.params?.classid,
            day: props?.route?.params?.day,
            subject: st
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            ToastAndroid.show("Updated successfully", ToastAndroid.SHORT);
            props.navigation.pop();
        }).catch((error) => {
            setloading(false);
            console.log(error.response.data);
            ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
        });

        console.log(st);
    }
    const remove = (ind) => {
        classdata.splice(ind, 1);
        setclassdata([...classdata]);
    }
    const getSubjects = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("api/get/timetable", {
            params: {
                classid: props?.route?.params?.classid,
                day: props?.route?.params?.day
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
    useFocusEffect(React.useCallback(() => {
        getSubjects();
    }, []));
    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            {
                classdata?.map((i, ind) =>
                    <View key={ind} style={{ backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', width: '90%', borderRadius: 5, marginTop: '2%' }}>
                        <Text style={{ fontWeight: 'bold', paddingVertical: 10, fontSize: 16 }}>{i.subject}</Text>
                        <TouchableOpacity onPress={() => remove(ind)} style={{ padding: 10 }} ><Text style={{ color: 'red', fontSize: 16 }}>X</Text></TouchableOpacity>
                    </View>
                )
            }
            <TouchableOpacity onPress={() => sethide(!hide)} style={{ borderWidth: 2, borderRadius: 5, paddingHorizontal: '5%', borderColor: 'orange', paddingVertical: '2%', marginTop: '5%' }}>
                <Text style={{ color: 'orange', fontWeight: 'bold' }}>+ Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSubmit()} style={{ borderWidth: 2, borderRadius: 5, paddingHorizontal: '5%', borderColor: 'orange', backgroundColor: 'orange', paddingVertical: '2%', marginTop: '5%' }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
            </TouchableOpacity>

            <View style={{ display: hide ? 'flex' : 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 10, width: '80%', height: '40%', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                    <TextInput value={Subject} onChangeText={(t) => setsubject(t)} placeholder='Enter Subject Name' style={{ paddingHorizontal: 10, borderWidth: 1, paddingVertical: 5, width: '80%', padding: 10 }} selectionColor="orange" />
                    <TouchableOpacity onPress={() => add()} style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'orange', alignItems: 'center', marginHorizontal: 10, borderRadius: 5, marginTop: 10 }}><Text style={{ fontWeight: 'bold', marginHorizontal: 10, marginVertical: 5 }}>Add</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

});