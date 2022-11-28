import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
const Stack = createStackNavigator();
export default function Notice() {
    return (
        <Stack.Navigator initialRouteName='Noticeadmin' style={{ width: '100%', height: '100%' }}>
            <Stack.Screen options={{
                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                headerShown: false
            }} name="Noticeadmin" component={NoticeList} />
            <Stack.Screen options={{
                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                headerShown: false
            }} name="editnotice" component={EditNotice} />
            <Stack.Screen options={{
                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                headerShown: false
            }} name="addnotice" component={AddNotice} />
        </Stack.Navigator>
    )
}

function NoticeList({ navigation }) {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(false);
    const getData = async () => {
        setloading(true);
        const token = await SecureStore.getItemAsync("token");

        axios.get("/api/notice/get", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            setloading(false);
            setdata(response?.data?.data);
        }).catch((err) => {
            setloading(false);
            console.log(err);
            if (err.message == "Network Error") {
                ToastAndroid.show("Network Error", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT);
            }
        })
    }

    useFocusEffect(React.useCallback(() => {
        getData();
    }, []))
    return (
        <View style={{ width: '100%', height: '100%', paddingHorizontal: '2%' }}>
            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />

            <ScrollView>
                {
                    data?.map((i, ind) =>
                        <TouchableOpacity key={ind} onPress={() => navigation.navigate("editnotice", { data: i })} style={{ width: '100%', borderWidth: 1, marginTop: '2%', paddingRight: '3%', paddingVertical: '2%', display: 'flex', flexDirection: 'row' }} >
                            <View style={{ flex: 0.2 }}>
                                <Image style={{ height: 50, width: '100%' }} source={require("../../assets/notice.png")} />
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'justify' }} numberOfLines={2}>{i?.title}</Text>
                                <Text numberOfLines={1} style={{ marginTop: '2%', color: 'grey' }}>
                                    {i?.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate("addnotice")} style={{ backgroundColor: '#e47d21', width: 60, height: 60, borderRadius: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 30, right: 20 }}>
                <Text style={{ color: 'white', fontWeight: '400', fontSize: 25 }}>+</Text>
            </TouchableOpacity>
        </View>
    )
}
function AddNotice({ navigation }) {
    const [title, settitle] = useState("");
    const [desc, setdesc] = useState("");
    const [loading, setloading] = useState(false);
    const onSubmit = async () => {

        if (title === "") {
            ToastAndroid.show("Please enter the title", ToastAndroid.SHORT);
        } else if (desc === "") {
            ToastAndroid.show("Please enter the description", ToastAndroid.SHORT);
        } else {
            setloading(true);
            const token = await SecureStore.getItemAsync("token");
            axios.post("/api/notice/add", {
                title,
                description: desc
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) => {
                setloading(false);
                ToastAndroid.show("Notice added successfully", ToastAndroid.SHORT);
                navigation.pop();
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
    }
    return (
        <View style={{ width: '100%', height: '100%', paddingHorizontal: '2%', paddingVertical: '4%' }}>
            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />

            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }} >TITLE</Text>
                <TextInput value={title} onChangeText={(t) => settitle(t)} style={{ borderWidth: 1, paddingVertical: 2, paddingHorizontal: 10, fontSize: 16 }} multiline={true} selectionColor='orange' placeholder='Title...' />
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: '2%' }}>Description</Text>
                <TextInput value={desc} onChangeText={(t) => setdesc(t)} selectionColor={'orange'} style={{ borderWidth: 1, paddingVertical: 2, paddingHorizontal: 10, fontSize: 16, minHeight: '20%', textAlignVertical: 'top' }} multiline={true} placeholder='Description..' />
                <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <TouchableOpacity onPress={() => onSubmit()} style={{ width: '30%', backgroundColor: 'orange', borderRadius: 5, paddingVertical: '2%', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
function EditNotice(props) {
    const [editmode, seteditmode] = useState(false);
    const [data, setdata] = useState();
    const [title, settitle] = useState("");
    const [desc, setdesc] = useState("");
    const [loading, setloading] = useState(false);
    const updateNotice = async () => {
        if (title === "") {
            ToastAndroid.show("No title", ToastAndroid.SHORT);
            return;
        } else if (desc === "") {
            ToastAndroid.show("No description", ToastAndroid.SHORT);
            return;
        }
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        setloading(true);
        axios.post("/api/notice/update", {
            id: data?.id,
            title: title,
            description: desc
        }, {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            setloading(false);
            ToastAndroid.show("Updated Successfully", ToastAndroid.SHORT);
            setdata({ ...data, title: title, description: desc });
            seteditmode(false);
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

    const deleteNotice = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        setloading(true);
        axios.post("/api/notice/delete", {
            id: data?.id
        }, {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            setloading(false);
            ToastAndroid.show("Deleted Successfully", ToastAndroid.SHORT);
            props.navigation.pop();
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
    useFocusEffect(React.useCallback(() => {
        setdata(props?.route?.params?.data);
        settitle(props?.route?.params?.data?.title);
        setdesc(props?.route?.params?.data?.description);
    }, []));
    return (
        <View style={{ width: '100%', height: '100%', padding: '2%', }}>
            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ width: '100%', height: '100%', display: editmode ? 'none' : 'flex' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }} >TITLE</Text>
                <Text style={{ borderWidth: 1, paddingVertical: 2, paddingHorizontal: 10, fontSize: 16, textAlign: 'justify' }}>{data?.title}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: '2%' }}>Description</Text>
                <Text style={{ borderWidth: 1, paddingVertical: 2, paddingHorizontal: 10, fontSize: 16, minHeight: '20%', textAlignVertical: 'top', textAlign: 'justify' }}>{data?.description} </Text>
            </ScrollView>
            <ScrollView style={{ width: '100%', height: '100%', display: editmode ? 'flex' : 'none' }} contentContainerStyle={{ flexGrow: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }} >TITLE</Text>
                <View style={{ borderWidth: 1, padding: '2%' }}>
                    <TextInput value={title} onChangeText={(t) => {
                        settitle(t)
                    }} style={{ fontSize: 16, textAlignVertical: 'top', textAlign: 'justify' }} multiline={true} selectionColor='orange' placeholder='Title...' />
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: '2%' }}>Description</Text>
                <View style={{ borderWidth: 1, padding: '2%' }}>
                    <TextInput value={desc} onChangeText={(t) => setdesc(t)} selectionColor={'orange'} style={{ fontSize: 16, minHeight: '20%', textAlignVertical: 'top', textAlign: 'justify' }} multiline={true} placeholder='Description..' />
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>

                    <TouchableOpacity onPress={() => updateNotice()} style={{ width: '30%', backgroundColor: 'orange', borderRadius: 5, paddingVertical: '2%', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => seteditmode(false)} style={{ width: '30%', backgroundColor: 'red', borderRadius: 5, paddingVertical: '2%', alignItems: 'center', marginTop: '2%' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 10, display: editmode ? 'none' : 'flex' }}>

                <View style={{ flexDirection: 'row', width: '80%', }}>
                    <TouchableOpacity onPress={() => seteditmode(true)} style={{ backgroundColor: 'green', justifyContent: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, alignItems: 'center', flex: 0.5 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>EDIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteNotice()} style={{ backgroundColor: 'red', paddingVertical: '2%', borderBottomRightRadius: 5, justifyContent: 'center', borderTopRightRadius: 5, alignItems: 'center', flex: 0.5 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>DELETE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})