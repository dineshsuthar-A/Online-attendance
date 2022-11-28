import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import { createStackNavigator, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
const windowHeight = Dimensions.get("screen").height;
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import TimeTable from './TimeTable';


const Stack = createStackNavigator();
export default function ClassTimeTable() {
    return (
        <Stack.Navigator >
            <Stack.Screen options={{
                headerShown: false,
            }} name="chooseclass" component={ChooseClass} />
            <Stack.Screen options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
            }} name="chooseday" component={ChooseDay} />
            <Stack.Screen options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
            }} name="timetables" component={TimeTable} />
        </Stack.Navigator>
    )
}

function ChooseClass({ navigation }) {

    const [classid, setclassid] = useState();
    const [classes, setclasses] = useState();
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
                ToastAndroid.show(err?.response?.data?.message ? err?.response?.data?.message : "Try again", ToastAndroid.SHORT)
            }
        });
    }

    const next = () => {
        if (classid == null || classid == undefined) {
            ToastAndroid.show("Please choose class", ToastAndroid.SHORT);
        } else {
            navigation.navigate("chooseday", {
                classid
            });
        }
    }
    useFocusEffect(React.useCallback(() => {
        getClasses();
    }, []));
    return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Choose Class</Text>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    borderRadius: 5,
                    height: windowHeight * 0.07,
                    width: '80%',
                    marginVertical: 5,
                    marginBottom: '2%'
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
            <TouchableOpacity onPress={() => next()} style={{ backgroundColor: 'orange', paddingHorizontal: "10%", borderRadius: 5, paddingVertical: windowHeight * 0.015, marginTop: 40 }}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

function ChooseDay(props) {
    const [day, setday] = useState();
    const next = () => {
        if (day == undefined) {
            ToastAndroid.show("Please select a day", ToastAndroid.SHORT);
        } else {
            props?.navigation.navigate("timetables", {
                day,
                classid: props?.route?.params?.classid
            });
        }
    }
    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => setday(0)} style={{ backgroundColor: day == 0 ? 'lightblue' : 'white', borderWidth: 1, paddingVertical: 10, marginHorizontal: '10%', alignItems: 'center', marginTop: '4%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Monday</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setday(1)} style={{ backgroundColor: day == 1 ? 'lightblue' : 'white', borderWidth: 1, paddingVertical: 10, marginHorizontal: '10%', alignItems: 'center', marginTop: '4%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tuesday</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setday(2)} style={{ backgroundColor: day == 2 ? 'lightblue' : 'white', borderWidth: 1, paddingVertical: 10, marginHorizontal: '10%', alignItems: 'center', marginTop: '4%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Wednesday</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setday(3)} style={{ backgroundColor: day == 3 ? 'lightblue' : 'white', borderWidth: 1, paddingVertical: 10, marginHorizontal: '10%', alignItems: 'center', marginTop: '4%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Thursday</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setday(4)} style={{ backgroundColor: day == 4 ? 'lightblue' : 'white', borderWidth: 1, paddingVertical: 10, marginHorizontal: '10%', alignItems: 'center', marginTop: '4%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Friday</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setday(5)} style={{ backgroundColor: day == 5 ? 'lightblue' : 'white', borderWidth: 1, paddingVertical: 10, marginHorizontal: '10%', alignItems: 'center', marginTop: '4%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Saturday</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => next()} style={{ backgroundColor: 'orange', paddingHorizontal: "10%", borderRadius: 5, paddingVertical: windowHeight * 0.015, marginTop: 40, alignItems: 'center', marginHorizontal: '20%' }}>
                <Text style={{ fontWeight: 'bold' }}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}




const styles = StyleSheet.create({
});