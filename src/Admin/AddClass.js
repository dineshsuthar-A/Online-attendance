import { StyleSheet, TextInput, View, ScrollView, TouchableOpacity, Text, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

export default function AddClass() {
    const [classname, setclassname] = useState("");
    const [loading, setloading] = useState(false);
    const [section, setsection] = useState("");
    const [classes, setclasses] = useState();
    const getClasses = async () => {
        setloading(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/get/classes", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setloading(false);
            setclasses(response?.data?.data);
        }).catch((err) => {
            if (err.message == "Network Error") {
                ToastAndroid.show("Network Error", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT);
            }
        });
    }
    const deleteClass = async (id) => {
        setloading(true);
        const token = await SecureStore.getItemAsync("token");
        axios.post("api/class/delete", {
            "id": id
        }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            setloading(false);
            getClasses();
        }).catch((err) => {
            setloading(false);
            if (err.message == "Network Error") {
                ToastAndroid.show("Network Error", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Error occured", ToastAndroid.SHORT)
            }
        });

    }
    const onAdd = async () => {
        if (classname.length == 0) {
            ToastAndroid.show("Please enter the class", ToastAndroid.SHORT);
        } else if (section.length == 0) {
            ToastAndroid.show("Please enter the class", ToastAndroid.SHORT);
        } else {
            setloading(true);
            const token = await SecureStore.getItemAsync("token");
            axios.post("api/class/add", {
                "class": classname,
                "section": section
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((response) => {
                setloading(false);
                ToastAndroid.show("Added", ToastAndroid.SHORT);
                setclassname("");
                setsection("");
                getClasses();
            }).catch((err) => {
                setloading(false);
                if (err.message == "Network Error") {
                    ToastAndroid.show("Network Error", ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT)
                }
            });
        }
    }
    useFocusEffect(React.useCallback(() => {
        getClasses();
    }, []))
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            <View>
                <View style={{ paddingHorizontal: 10, paddingTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput value={classname} placeholder='Class' onChangeText={(t) => {
                        setclassname(t);
                    }} style={{ borderWidth: 1, padding: 10, backgroundColor: 'white', borderColor: 'grey', borderRadius: 5, width: '60%' }} />
                    <TextInput value={section} placeholder='Section' onChangeText={(t) => {
                        setsection(t);
                    }} style={{ borderWidth: 1, padding: 10, backgroundColor: 'white', borderColor: 'grey', borderRadius: 5, width: '35%' }} />
                </View>
                <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => onAdd()} style={{ backgroundColor: '#e47d21', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5, elevation: 2, marginTop: 20 }}><Text style={{ color: 'white', fontWeight: '600' }}>+ Add</Text></TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingVertical: '1%', marginTop: '6%', paddingHorizontal: '2%', backgroundColor: "#e47d21" }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Classes</Text>
            </View>
            <ScrollView>
                {
                    classes?.map((i, ind) =>
                        <View key={ind} style={{ backgroundColor: 'white', marginHorizontal: '2%', marginTop: '2%', borderRadius: 5, paddingVertical: '2%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '4%' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i.classname}</Text>
                            <TouchableOpacity onPress={() => deleteClass(i.id)} style={{ backgroundColor: 'red', padding: '2%', borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})