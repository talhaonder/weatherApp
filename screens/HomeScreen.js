import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Image, TextInput, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/outline";

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([1, 2, 3]);

    const handleLocation = (loc) => {
        console.log('location: ', loc);
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <Image blurRadius={50} source={require('../assets/image/bg.png')} style={{ position: 'absolute', height: '100%', width: '100%' }} />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ height: 70, padding: 12 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderRadius: 999,
                        backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent'
                    }}>
                        {showSearch ? (
                            <TextInput
                                placeholder="Search City"
                                placeholderTextColor={'lightgray'}
                                style={{ flex: 1, fontSize: 16, color: 'white', paddingLeft: 16, margin: 4 }}
                            />
                        ) : null}

                        <TouchableOpacity
                            onPress={() => toggleSearch(!showSearch)}
                            style={{ backgroundColor: theme.bgWhite(0.3), borderRadius: 999, padding: 12, margin: 4 }}>
                            <MagnifyingGlassIcon size={25} color="white" />
                        </TouchableOpacity>
                    </View>

                    {locations.length > 0 && showSearch ? (
                        <View style={{
                            position: 'absolute',
                            width: '100%',
                            backgroundColor: '#ccc',
                            top: 70,
                            borderRadius: 20,
                            marginTop: 9,
                            marginLeft: 9
                        }}>
                            {locations.map((loc, index) => (
                                <TouchableOpacity
                                onPress={() => handleLocation(loc)}
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderBottomWidth: index + 1 !== locations.length ? 2 : 0,
                                    borderBottomColor: "gray",
                                    padding: 20,
                                }}>
                                <MapPinIcon size={20} color="gray" />
                                <Text style={{ color: 'black', fontSize: 16, marginLeft: 2 }}>London, United Kingdom</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    ) : null}
                </View>
            </SafeAreaView>
        </View>
    );
}
