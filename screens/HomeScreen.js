import { View, Text, SafeAreaView, StatusBar, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../theme";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";


export default function HomeScreen() {
    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <StatusBar />
            <Image blurRadius={50} source={require('../assets/image/bg.png')}
                style={{ position: 'absolute', height: '100%', width: '100%' }} />
            <SafeAreaView
            style={{flex: 1}}
            >
                <View
                style={{height: "7%", position: "relative", padding: 12,}}
                >
                    <View
                    style={{ flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderRadius: 999,
                    backgroundColor: theme.bgWhite(0.2)  }}>
                        <TextInput
                            placeholder="Search City"
                            placeholderTextColor={'lightgray'}
                            style={{ flex: 1, fontSize: 16, color: 'white', paddingLeft:16, margin:4, }}
                        />
                        <TouchableOpacity
                        style={{ backgroundColor: theme.bgWhite(0.3), borderRadius: 999, padding: 12, margin: 4 }}>
                        <MagnifyingGlassIcon size="25" color= "white"  />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}
