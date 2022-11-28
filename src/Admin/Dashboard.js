import { StyleSheet, Text, View, ScrollView, ToastAndroid, Dimensions, StatusBar, BackHandler, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
const windowHeight = Dimensions.get("window").height;
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
export default function Dashboard() {
  const [totalstudent, settotalstudent] = useState(0);
  const [totalteacher, settotalteacher] = useState(0);
  const [present, setpresent] = useState(0);
  const [loading, setloading] = useState(false);
  const [absent, setabsent] = useState(0);
  const getData = async () => {
    setloading(true);
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    axios.get("api/get/stats", {
      headers: {
        "Authorization": token
      }
    }).then((response) => {
      setloading(false);
      settotalstudent(response?.data.data[0].number);
      settotalteacher(response?.data.data[1].number);
      setpresent(response?.data.data[2].number);
      setabsent(response?.data.data[3].number);
      console.log(response?.data?.data)
    }).catch((error) => {
      setloading(false);
      console.log(error);
      ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
    });

  }
  useFocusEffect(React.useCallback(() => {
    getData();
  }, []))
  return (
    <ScrollView style={{ paddingTop: 10 }}>
      <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />

      <StatusBar backgroundColor="#e47d21" barStyle="white" />
      <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightblue', marginHorizontal: windowHeight * 0.02, height: windowHeight * 0.15, paddingHorizontal: windowHeight * 0.02, borderRadius: windowHeight * 0.005, elevation: 2, justifyContent: 'space-between', alignItems: 'center', }}>
        <View style={{ flex: 0.5, justifyContent: 'space-between', }}>
          <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '600', marginBottom: windowHeight * 0.015 }}>Total Students</Text>
          <Text style={{ fontSize: windowHeight * 0.025, fontWeight: '600' }}>{totalstudent}</Text>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center' }}>
          <FontAwesome name="user" size={windowHeight * 0.1} color="skyblue" />
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightgreen', marginHorizontal: windowHeight * 0.02, height: windowHeight * 0.15, paddingHorizontal: windowHeight * 0.02, borderRadius: windowHeight * 0.005, elevation: 2, justifyContent: 'space-between', alignItems: 'center', marginTop: windowHeight * 0.01 }}>
        <View style={{ flex: 0.5, justifyContent: 'space-between', }}>
          <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '600', marginBottom: windowHeight * 0.015 }}>Present Today</Text>
          <Text style={{ fontSize: windowHeight * 0.025, fontWeight: '600' }}>{present}</Text>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center' }}>
          <FontAwesome5 name="hands-helping" size={windowHeight * 0.1} color="green" />
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightyellow', marginHorizontal: windowHeight * 0.02, height: windowHeight * 0.15, paddingHorizontal: windowHeight * 0.02, borderRadius: windowHeight * 0.005, elevation: 2, justifyContent: 'space-between', alignItems: 'center', marginTop: windowHeight * 0.01 }}>
        <View style={{ flex: 0.5, justifyContent: 'space-between', }}>
          <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '600', marginBottom: windowHeight * 0.015 }}>Absent Today</Text>
          <Text style={{ fontSize: windowHeight * 0.025, fontWeight: '600' }}>{absent}</Text>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Ionicons name="md-checkmark-done-circle-sharp" size={windowHeight * 0.1} color="brown" style={{ opacity: 0.2 }} />
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightblue', marginHorizontal: windowHeight * 0.02, height: windowHeight * 0.15, paddingHorizontal: windowHeight * 0.02, borderRadius: windowHeight * 0.005, elevation: 2, justifyContent: 'space-between', alignItems: 'center', marginTop: windowHeight * 0.01 }}>
        <View style={{ flex: 0.5, justifyContent: 'space-between', }}>
          <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '600', marginBottom: windowHeight * 0.015, }}>Number of Teachers</Text>
          <Text style={{ fontSize: windowHeight * 0.025, fontWeight: '600' }}>{totalteacher}</Text>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center' }}>
          <FontAwesome name="user" size={windowHeight * 0.1} color="skyblue" />
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightyellow', marginHorizontal: windowHeight * 0.02, height: windowHeight * 0.15, paddingHorizontal: windowHeight * 0.02, borderRadius: windowHeight * 0.005, elevation: 2, justifyContent: 'space-between', alignItems: 'center', marginTop: windowHeight * 0.01 }}>
        <View style={{ flex: 0.5, justifyContent: 'space-between', }}>
          <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '600', marginBottom: windowHeight * 0.015 }}>Present Percentage</Text>
          <Text style={{ fontSize: windowHeight * 0.025, fontWeight: '600' }}>{present ? (parseFloat((present / (present + absent)) * 100)) : 0}%</Text>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Ionicons name="md-checkmark-done-circle-sharp" size={windowHeight * 0.1} color="brown" style={{ opacity: 0.2 }} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})