import { View, Text, SafeAreaView, StatusBar, Image } from "react-native";
import React from "react";
import { theme } from "../theme";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <StatusBar />
            <Image blurRadius={70} source={require('../assets/image/avatar.png')}
                style={{ position: 'absolute', height: '100%', width: '100%' }} />
            <SafeAreaView
            style={{flex: 1}}
            >
                <View
                style={{height: "7%", position: "relative"}}
                >
                    <View
                    style={{ flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderRadius: 999,
                    backgroundColor: theme.bgWhite(0.2)  }}>

                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}
