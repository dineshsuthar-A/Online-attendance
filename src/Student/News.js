import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
const windowHeight = Dimensions.get("screen").height;
const windowWidht = Dimensions.get("screen").width;
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { createStackNavigator, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function News() {
    return (

        <Stack.Navigator style={{ width: '100%', height: '100%' }}>
            <Stack.Screen options={{
                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                headerStyle: {
                    backgroundColor: '#e47d21',
                },

                headerTintColor: 'white',
                title: 'Notice'
            }} name="Notice" component={NoticePage} />
            <Stack.Screen options={{
                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                headerStyle: {
                    backgroundColor: '#e47d21',
                },

                headerTintColor: 'white',
                title: 'Notice'
            }} name="Noticedetail" component={NoticeDetail} />
        </Stack.Navigator>

    )
}

function NoticePage({ navigation }) {

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

    useEffect(() => {
        getData();
    }, []);
    return (
        <ScrollView style={{ width: '100%', paddingHorizontal: '1%' }}>
            <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />
            {data?.map((i, ind) =>
                < TouchableOpacity key={ind} onPress={() => navigation.navigate("Noticedetail", { data: i })} style={{ width: '100%', borderWidth: 1, marginTop: '2%', paddingRight: '3%', paddingVertical: '2%', display: 'flex', flexDirection: 'row' }} >
                    <View style={{ flex: 0.2 }}>
                        <Image style={{ height: 50, width: '100%' }} source={require("../../assets/notice.png")} />
                    </View>
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'justify' }} numberOfLines={2}>{i.title}</Text>
                        <Text numberOfLines={1} style={{ marginTop: '2%', color: 'grey' }}>{i.description}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
            }
        </ScrollView >
    )
}
function NoticeDetail(props) {
    return (
        <ScrollView style={{ padding: '2%' }}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 17, textAlign: 'justify' }}>{props?.route?.params?.data?.title}</Text>
            </View>
            <View style={{ borderTopWidth: 1, marginTop: '2%', paddingTop: '2%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, textDecorationLine: 'underline', color: 'grey', marginBottom: '2%' }}>Description</Text>
                <View>
                    <Text style={{ color: 'grey', textAlign: 'justify' }}>
                        {props?.route?.params?.data?.description}
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({})