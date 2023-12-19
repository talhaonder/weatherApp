import React, { useCallback, useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { theme } from "../theme";
import { CalendarDaysIcon, MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/outline";
import {debounce} from 'lodash';
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { weatherImages } from "../constants";

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({})
    const handleLocation = (loc) => {
        console.log('location: ', loc);
        setLocations([]);
        toggleSearch(false);
        fetchWeatherForecast({
            cityName: loc.name,
            days: '7'
        }).then(data=>{
            setWeather(data);
        })
    }

    const handleSearch = value=>{
        //fetch locations
        if(value.length>2){
            fetchLocations({cityName: value}).then(data=>{
                setLocations(data);
            })
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch,1200), [])

    const {current, location} = weather

    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <Image blurRadius={70} source={require('../assets/image/bg.png')} style={{ position: 'absolute', height: '100%', width: '100%' }} />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ height: 70, padding: 12 , zIndex: 50}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderRadius: 999,
                        backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent'
                    }}>
                        {showSearch ? (
                            <TextInput
                            onChangeText={handleTextDebounce}
                                placeholder="Search City"
                                placeholderTextColor={'lightgray'}
                                style={{ flex: 1, fontSize: 16, color: 'white', paddingLeft: 16, margin: 4, }}
                                
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
                                    <Text style={{ color: 'black', fontSize: 16, marginLeft: 2 }}>{loc?.name}, {loc?.country}</Text>
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
                    }}> {location?.name},
                        <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: "#cccc"
                        }}>
                         {" "+location?.country}
                        </Text>
                    </Text>
                {/* weather image */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                        <Image
                        source={weatherImages[current?.condition.text]}
                        //source={{uri: 'https:'+current?.condition?.icon}} 
                        //source={require('../assets/image/partlycloudy.png')}
                        style={{
                            width: 250,
                            height: 250,
                        }}/>
                </View>
                <View style={{ flexDirection: 'column', marginVertical: 2 }}>
                    <Text style={{textAlign: "center", fontWeight: "bold", color: "white", fontSize: 60, marginLeft: 15,}}>
                        {current?.temp_c}&#176;
                    </Text>
                    <Text style={{textAlign: "center", fontWeight: "bold", color: "#cccccc", fontWeight: "400", fontSize:14, letterSpacing: 2  }}>
                        {current?.condition?.text}
                    </Text>
                </View>
{/* other stats */}
                    <View style={{flexDirection: "row" ,justifyContent: "space-between", marginHorizontal: 40}}>
                        <View style={{display: "flex", alignItems: "center",  marginHorizontal: 2, flexDirection: "row" }}>
                                <Image source={require('../assets/icons/wind.png')} style={{height:18, width
                                :18}}/>
                                <Text style={{fontWeight: "500", color: "white"}}>{current?.wind_kph}</Text>
                        </View>
                        <View style={{display:"flex", justifyContent:"space-between", marginHorizontal: 4, flexDirection: "row", alignItems: "center",  marginHorizontal: 2 }}>
                                <Image source={require('../assets/icons/drop.png')} style={{height:18, width
                                :18}}/>
                                <Text style={{fontWeight: "500", color: "white"}}> {current?.humidity}</Text>
                        </View>
                            <View style={{display: "flex", alignItems: "center",  marginHorizontal: 2, flexDirection: "row" }}>
                                <Image source={require('../assets/image/sun.png')} style={{height:18, width
                                :18}}/>
                                <Text style={{fontWeight: "500", color: "white"}}> 6:05 AM</Text>
                        </View>
                    </View>  
                </View>
{/* forecast for next day's */}
                <View style={{marginBottom: 20, marginVertical: 20,}}>
                    <View style={{flexDirection: "row", alignItems: "center", marginHorizontal: 5,}}>
                        <CalendarDaysIcon size={22} color= "white" />
                        <Text style={{ fontSize: 16, color: "white", marginLeft: 8  }}>
                            Daily Forecast
                        </Text>
                    </View>
                    <ScrollView
                    horizontal
                    contentContainerStyle={{paddingHorizontal: 15}}
                    showsHorizontalScrollIndicator={false}
                    >
                        {
                            weather?.forecast?.forecastday?.map((item, index)=>{
                                let date = new Date(item.date);
                                let options = {weekday: 'long'};
                                let dayName = date.toLocaleDateString('en-US', options);
                                dayName = dayName.split(',')[0]
                                return (
                                    <View
                                     key={index}
                                     style={{
                                        flex: 1,
                                        margin: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 100,
                                        marginTop: 15,
                                        height: "auto",
                                        borderRadius: 25, // Equivalent to rounded-3xl
                                        paddingVertical: 3, // Equivalent to py-3
                                        backgroundColor: 'yourBackgroundColor', // Replace with the desired background color
                                        marginBottom: 1, 
                                        backgroundColor: theme.bgWhite(0.15)// Equivalent to space-y-1
                                    }}>                            
                                            <Image source={weatherImages[item?.day?.condition?.text]} style={{height:44, width:44,}}/>
                                            <Text style={{color: "white", fontSize: 12, fontWeight: '300' }}>{dayName}</Text>
                                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{item?.day?.avgtemp_c}&#176;</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>                    
            </SafeAreaView>
        </View>
    );
}
