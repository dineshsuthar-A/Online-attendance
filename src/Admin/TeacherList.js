import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


const Stack = createStackNavigator();
import { createStackNavigator, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';

function Teachers({ navigation }) {
  const [data, setdata] = useState();
  const [tempdata, settempdata] = useState();
  const [searchText, setSearchText] = useState();
  const [loading, setloading] = useState(false);
  const getTeachersData = async () => {
    setloading(true);
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    axios.get("api/teacher/getdata", {
      headers: {
        "Authorization": token
      }
    }).then((response) => {
      setloading(false);
      setdata(response?.data?.data);
      settempdata(response?.data?.data);
    }).catch((error) => {
      setloading(false);
      console.log(error?.response);
      ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
    });
  }
  const onsearch = (txt) => {
    const d = tempdata.filter((i) => {
      return i.name.toUpperCase().indexOf(txt.toString().toUpperCase()) > -1;;
    });
    setdata(d);
  }
  useFocusEffect(React.useCallback(() => {
    getTeachersData();
  }, []));
  return (
    <View>
      <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />

      <View style={{ backgroundColor: "#e47d21", paddingHorizontal: '2%', paddingVertical: '3%' }}>
        <TextInput value={searchText} onChangeText={(t) => onsearch(t)} placeholder='Search...' style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }} selectionColor="#e47d21" />
      </View>
      <View style={{ backgroundColor: "#e47d21", paddingHorizontal: '2%', paddingVertical: '3%', flexDirection: 'row' }}>
        <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>ID</Text>
        </View>
        <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Teacher Name</Text>
        </View>
      </View>
      <ScrollView style={{ width: '100%', height: '82%' }} >
        {
          data?.map((i, ind) =>
            <TouchableOpacity onPress={() => navigation.navigate("editTeachers", {
              data: i
            })} key={ind} style={{ paddingHorizontal: '2%', paddingVertical: '3%', flexDirection: 'row', borderBottomWidth: 1 }}>
              <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }} >{i?.id}</Text>
              </View>
              <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }} >{i?.name}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      </ScrollView>
    </View>
  )
}


function EditTeacher(props) {
  const [data, setdata] = useState();
  const [edit, setedit] = useState(1);
  const [loading, setloading] = useState(false);
  const Delete = async (i) => {
    setloading(true);
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    axios.post("api/delete/teacherdetail", {
      id: i.id
    }, {
      headers: {
        "Authorization": token
      }
    }).then((response) => {
      setloading(false);
      ToastAndroid.show("Deleted", ToastAndroid.SHORT);
      setedit(1);
      props.navigation.pop();
    }).catch((error) => {
      setloading(false);
      console.log(error?.response);
      ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
    });
  }
  const Submit = async () => {
    setloading(true);
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    axios.post("api/update/teacherdetail", {
      data
    }, {
      headers: {
        "Authorization": token
      }
    }).then((response) => {
      setloading(false);
      ToastAndroid.show("Updated", ToastAndroid.SHORT);
      setedit(1);
      props.navigation.pop();
    }).catch((error) => {
      setloading(false);
      console.log(error?.response);
      ToastAndroid.show(error?.response?.data?.error, ToastAndroid.SHORT);
    });

  }
  useFocusEffect(React.useCallback(() => {
    setdata(props?.route?.params?.data);
  }, []))
  return (
    edit ?
      <View style={{ padding: '3%' }}>
        <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />

        <View style={{ marginTop: '2%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Name</Text>
          <Text style={{ borderWidth: 1, paddingHorizontal: '4%', paddingVertical: '3%', borderRadius: 5 }}>{data?.name}</Text>
        </View>
        <View style={{ marginTop: '2%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Phone</Text>
          <Text style={{ borderWidth: 1, paddingHorizontal: '4%', paddingVertical: '3%', borderRadius: 5 }}>{data?.phone}</Text>
        </View>
        <View style={{ marginTop: '2%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Email</Text>
          <Text style={{ borderWidth: 1, paddingHorizontal: '4%', paddingVertical: '3%', borderRadius: 5 }}>{data?.email}</Text>
        </View>
        <View style={{ marginTop: '2%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Password</Text>
          <Text style={{ borderWidth: 1, paddingHorizontal: '4%', paddingVertical: '3%', borderRadius: 5 }}>{data?.password}</Text>
        </View>
        <TouchableOpacity onPress={() => setedit(0)} style={{ width: '90%', marginHorizontal: '5%', alignItems: 'center', backgroundColor: 'green', paddingVertical: '2%', borderRadius: 5, marginTop: '6%' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Delete(data)} style={{ width: '90%', marginHorizontal: '5%', alignItems: 'center', backgroundColor: 'red', paddingVertical: '2%', borderRadius: 5, marginTop: '6%' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
        </TouchableOpacity>
      </View>
      :
      <View style={{ padding: '3%' }}>
        <ActivityIndicator size="large" style={{ position: "absolute", top: '45%', left: '45%', zIndex: 2 }} color="#e47d21" animating={loading} />

        <View style={{ marginTop: '2%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Name</Text>
          <TextInput value={data?.name} onChangeText={(t) => {
            setdata({
              ...data,
              "name": t
            })
          }} style={{ borderWidth: 1, paddingHorizontal: '4%', paddingVertical: '2%', borderRadius: 5 }} selectionColor="orange" />
        </View>

        <View style={{ marginTop: '2%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Phone</Text>
          <TextInput onChangeText={(e) => setdata({ ...data, "phone": e })} maxLength={10} keyboardType="number-pad" value={data?.phone} style={{ borderWidth: 1, paddingHorizontal: '4%', paddingVertical: '2%', borderRadius: 5 }} selectionColor="orange" />
        </View>

        <View style={{ marginTop: '2%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Email</Text>
          <TextInput value={data?.email} onChangeText={(e) => setdata({ ...data, "email": e })} style={{ borderWidth: 1, paddingHorizontal: '4%', paddingVertical: '2%', borderRadius: 5 }} selectionColor="orange" />
        </View>
        <View style={{ marginTop: '2%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Password</Text>
          <TextInput value={data?.password} onChangeText={(e) => setdata({ ...data, "password": e })} style={{ borderWidth: 1, paddingHorizontal: '4%', paddingVertical: '2%', borderRadius: 5 }} selectionColor="orange" />
        </View>
        <TouchableOpacity onPress={() => Submit()} style={{ width: '90%', marginHorizontal: '5%', alignItems: 'center', backgroundColor: 'orange', paddingVertical: '2%', borderRadius: 5, marginTop: '6%' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setedit(1);
          props.navigation.pop();
        }} style={{ width: '90%', marginHorizontal: '5%', alignItems: 'center', backgroundColor: 'red', paddingVertical: '2%', borderRadius: 5, marginTop: '6%' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
        </TouchableOpacity>
      </View>
  )
}
export default function TeacherList() {

  return (
    <Stack.Navigator >
      <Stack.Screen options={{
        headerShown: false,
      }} name="teachersList" component={Teachers} />
      <Stack.Screen options={{
        headerShown: false,
      }} name="editTeachers" component={EditTeacher} />
    </Stack.Navigator>
  )

}

const styles = StyleSheet.create({})