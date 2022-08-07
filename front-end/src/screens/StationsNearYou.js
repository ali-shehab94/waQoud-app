import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { MY_GOOGLE_API_KEY } from '../../config/env';
import { MapModal } from '../components/MapModal';
import { useState, useEffect, useContext } from 'react';
import { Entypo } from '@expo/vector-icons';

import axios from 'axios';

export const StationsNearYou = () => {
    const [selectedGasStation, setSelectedGasStation] = useState();
    const [user, setUser] = useContext(UserContext);
    const [userLocation, setUserLocation] = useState({ latitude: user.userLocation.latitude, longitude: user.userLocation.longitude });
    const [gasStations, setGasStations] = useState([]);
    const [distances, setDistances] = useState([]);

    useEffect(() => {
        fetchGasStations();
    }, []);

    useEffect(() => {
        getDistance();
    }, [gasStations]);

    useEffect(() => {}, [selectedGasStation]);

    const clearData = () => {
        setSelectedGasStation();
    };

    //calculate distance of of all gas stations that where retrieved from Google Places API
    const getDistance = async () => {
        let _gasStations = [...gasStations];
        for (const gasStation of _gasStations) {
            await axios
                .get(
                    `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${gasStation.geometry.location.lat},${gasStation.geometry.location.lng}&origins=${user.userLocation.latitude},${user.userLocation.longitude}&key=${MY_GOOGLE_API_KEY}`
                )
                .then((response) => {
                    gasStation['calculated_distance'] = response.data.rows[0].elements[0].distance.value;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setDistances(_gasStations);
    };

    //fetch gas stations that are within 1KM radius of current location
    const fetchGasStations = () => {
        axios
            .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude},${userLocation.longitude}&radius=1000&type=gas_station&key=${MY_GOOGLE_API_KEY}`)
            .then((response) => {
                setGasStations(response.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.vehicleName}>Stations Nearby</Text>
            </View>
            <Text style={styles.stationCount}>
                <Entypo name='location-pin' size={24} color='black' />
                Near you: {distances.length}
            </Text>

            <View style={{ alignItems: 'center', height: '74%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}></Text>
                {selectedGasStation ? (
                    <MapModal style={{ zIndex: 5 }} coords={[selectedGasStation.geometry.location.lat, selectedGasStation.geometry.location.lng]} clearData={clearData} />
                ) : (
                    <FlatList
                        style={styles.gasStations}
                        data={distances}
                        renderItem={({ item }) => (
                            <View style={{ margin: 2, alignItems: 'center', width: '100%' }}>
                                <TouchableOpacity
                                    style={styles.tracker}
                                    onPress={() => {
                                        setSelectedGasStation(item);
                                    }}
                                >
                                    <View style={styles.trackerTitle}>
                                        <Image source={require('../../assets/logos/3.png')} style={styles.stationImage} />
                                    </View>
                                    <View>
                                        <Text style={styles.stationName}>{item.name.split(' ')[0].toUpperCase()}</Text>
                                        <Text style={styles.stationInfo}>{(item.calculated_distance / 1000).toFixed(2)} KM away</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F5F53',
    },
    subContainer: {},
    vehicleName: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Righteous_400Regular',
    },
    header: {
        backgroundColor: '#0F5F53',
        width: '90%',
        height: '7%',
        marginTop: '15%',
        marginBottom: '7%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    tracker: {
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        width: '90%',
        height: 90,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    trackerTitle: {
        paddingHorizontal: 20,
    },

    gasStations: {
        width: '90%',
    },

    stationImage: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 40,
    },
    stationInfo: {
        fontFamily: 'Righteous_400Regular',
        paddingLeft: '2%',
        fontSize: 15,
        width: '100%',
    },
    stationName: {
        fontFamily: 'Righteous_400Regular',
        paddingLeft: '2%',
        fontSize: 20,
        width: '100%',
    },
    stationCount: {
        color: 'black',
        fontFamily: 'Righteous_400Regular',
        paddingHorizontal: '1%',
        paddingVertical: '2%',
        marginHorizontal: '10%',
        borderRadius: 4,
        fontSize: 20,
        backgroundColor: 'orange',
        height: 40,
        width: '80%',
    },
});
