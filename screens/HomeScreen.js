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
            <Image blurRadius={70} source={require('../assets/image/bg.png')} style={{ position: 'absolute', height: '100%', width: '100%' }} />
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
                            borderWidth: 1,
                            borderColor: theme.bgWhite(0.3),
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
                    ) : null
                    }
                </View>
                {/* forecast section */}                
                <View 
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flex: 1,
                        marginBottom: 10,
                    }}>
{/* location */}
                    <Text 
                    style={{
                        fontSize: 24,
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                    }}> London,
                        <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: "#cccc"
                        }}>
                        United Kingdom
                        </Text>
                    </Text>
                {/* weather image */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                        <Image 
                        source={require('../assets/image/partlycloudy.png')}
                        style={{
                            width: 250,
                            height: 250,
                        }}/>
                </View>
                <View style={{ flexDirection: 'column', marginVertical: 2 }}>
                    <Text style={{textAlign: "center", fontWeight: "bold", color: "white", fontSize: 60, marginLeft: 15,}}>
                        23&#176;
                    </Text>
                    <Text style={{textAlign: "center", fontWeight: "bold", color: "#cccccc", fontWeight: "400", fontSize:14, letterSpacing: 2  }}>
                        Partly Cloudy
                    </Text>
                </View>
{/* other stats */}
                    <View style={{flexDirection: "row" ,justifyContent: "space-between", marginHorizontal: 40}}>
                        <View style={{display: "flex", alignItems: "center",  marginHorizontal: 2, flexDirection: "row" }}>
                                <Image source={require('../assets/icons/wind.png')} style={{height:18, width
                                :18}}/>
                                <Text style={{fontWeight: "500", color: "white"}}> 22km</Text>
                        </View>
                        <View style={{display:"flex", justifyContent:"space-between", marginHorizontal: 4, flexDirection: "row", alignItems: "center",  marginHorizontal: 2 }}>
                                <Image source={require('../assets/icons/drop.png')} style={{height:18, width
                                :18}}/>
                                <Text style={{fontWeight: "500", color: "white"}}> 23%</Text>
                        </View>
                            <View style={{display: "flex", alignItems: "center",  marginHorizontal: 2, flexDirection: "row" }}>
                                <Image source={require('../assets/icons/sun.png')} style={{height:18, width
                                :18}}/>
                                <Text style={{fontWeight: "500", color: "white"}}> 6:05 AM</Text>
                        </View>
                    </View>  
                </View>
            </SafeAreaView>
        </View>
    );
}
