import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
const windowHeight = Dimensions.get("screen").height;
const windowWidht = Dimensions.get("screen").width;

export default function Absence_Detail() {
    return (
        <View>
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Opps! no data present</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})