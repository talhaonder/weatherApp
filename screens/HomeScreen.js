import { View, Text, SafeAreaView, StatusBar, Image } from "react-native";
import React from "react";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <StatusBar />
            <Image source={require('../assets/image/avatar.png')}
                style={{ position: 'absolute', height: '100%', width: '100%' }} />
        </View>
    )
}
