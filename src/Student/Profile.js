import { StyleSheet, Text, View, Dimensions, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
const windowHeight = Dimensions.get("screen").height;
const windowWidht = Dimensions.get("screen").width;
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

const Profile = ({ navigation }) => {
    const [name, setname] = useState();
    const [phone, setphone] = useState();
    const [rollno, setrollno] = useState();
    const data = async () => {
        const namev = await SecureStore.getItemAsync("name");

        const phonev = await SecureStore.getItemAsync("phone");
        const rolln = await SecureStore.getItemAsync("rollno");
        setname(namev);
        setphone(phonev);
        setrollno(rolln);

    }
    const Logout = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("account");
        navigation.replace("Login");
    }

    useFocusEffect(React.useCallback(() => {
        data();
    }, []))
    return (
        <View style={{ width: '100%', }}>
            <View style={{ width: '100%', height: windowHeight * 0.07, backgroundColor: '#e47d21', justifyContent: 'center', paddingLeft: 20 }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: windowHeight * 0.024 }}>Profile</Text>
            </View>
            <View>
                {/* <View style={{ paddingVertical: '5%', width: windowWidht, alignItems: 'center', marginVertical: windowHeight * 0.02 }}>
                    <Image source={require("../../assets/blank-profile-picture-973460_640.webp")} style={{ width: windowHeight * 0.15, height: windowHeight * 0.15, borderRadius: windowHeight * 0.15, borderWidth: 1.5, borderColor: 'black' }} />
                </View> */}
                <View style={{ width: '100%', height: '100%', marginTop: '5%', paddingHorizontal: 10 }}>
                    <View style={{ paddingLeft: windowWidht * 0.05, backgroundColor: 'white', paddingVertical: windowHeight * 0.01, borderRadius: 4, elevation: 1 }}>
                        <Text style={{ fontWeight: 'bold', color: 'grey' }}>Name</Text>
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'orange', marginTop: 2 }}>{name}</Text>
                    </View>
                    <View style={{ paddingLeft: windowWidht * 0.05, backgroundColor: 'white', paddingVertical: windowHeight * 0.01, borderRadius: 4, elevation: 1, marginTop: windowHeight * 0.01 }}>
                        <Text style={{ fontWeight: 'bold', color: 'grey' }}>Admission number</Text>
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'orange', marginTop: 2 }}>{rollno}</Text>
                    </View>
                    <View style={{ paddingLeft: windowWidht * 0.05, backgroundColor: 'white', paddingVertical: windowHeight * 0.01, borderRadius: 4, elevation: 1, marginTop: windowHeight * 0.01 }}>
                        <Text style={{ fontWeight: 'bold', color: 'grey' }}>Phone number</Text>
                        <Text style={{ fontSize: 17, marginTop: 2, fontWeight: '500', color: 'orange' }}>{phone}</Text>
                    </View>
                    <TouchableOpacity onPress={() => Logout()} style={{ paddingHorizontal: windowWidht * 0.05, backgroundColor: 'white', paddingVertical: windowHeight * 0.02, borderRadius: 4, elevation: 1, marginTop: windowHeight * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'orange' }}>Logout</Text>
                        <MaterialIcons name="logout" size={22} color="orange" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})