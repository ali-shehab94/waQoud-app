import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext';
// import { GasStation } from '../components/GasStation';
import { TripCalculator } from './TripCalculator';
import { MY_GOOGLE_API_KEY } from '../../config/env';
import { MapModal } from '../components/MapModal';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const StationsNearYou = (props) => {
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

    useEffect(() => {
        console.log(distances);
    }, [selectedGasStation]);

    const clearData = () => {
        setSelectedGasStation();
    };

    const getDistance = async () => {
        let _gasStations = [...gasStations];
        for (const gasStation of _gasStations) {
            await axios
                .get(
                    `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${gasStation.geometry.location.lat},${gasStation.geometry.location.lng}&origins=${user.userLocation.latitude},${user.userLocation.longitude}&key=${MY_GOOGLE_API_KEY}`
                )
                .then((response) => {
                    // setDistance(response.data.rows[0].elements[0].distance.value);
                    gasStation['calculated_distance'] = response.data.rows[0].elements[0].distance.value;
                    // setDistance({ ...gasStations, distance: response.data.rows[0].elements[0].distance.value });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setDistances(_gasStations);
    };

    const fetchGasStations = () => {
        axios
            .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude},${userLocation.longitude}&radius=2000&type=gas_station&key=${MY_GOOGLE_API_KEY}`)
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
                <Text>Find gas station near you</Text>
            </View>
            <View style={{ paddingTop: '2%', borderWidth: 1, alignItems: 'center', height: '100%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Stations</Text>
                {selectedGasStation ? (
                    <MapModal style={{ zIndex: 5 }} coords={[selectedGasStation.geometry.location.lat, selectedGasStation.geometry.location.lng]} clearData={clearData} />
                ) : (
                    <FlatList
                        style={styles.gasStations}
                        data={distances}
                        renderItem={({ item }) => (
                            <View style={{ margin: 5, alignItems: 'center', width: '100%' }}>
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
                                        <Text style={styles.stationInfo}>{item.name.split(' ')[0]}</Text>
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
        backgroundColor: '#E9E9E9',
    },
    subContainer: {},
    header: {
        backgroundColor: '#0F5F53',
        width: '90%',
        height: '7%',
        margin: '12%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    tracker: {
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        width: '90%',
        height: 100,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    trackerTitle: {
        paddingHorizontal: 20,
    },
    vehicleName: {
        color: 'white',
        fontSize: 20,
    },
    gasStations: {
        width: '80%',
    },

    stationImage: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 40,
    },
    stationInfo: {
        paddingLeft: '2%',
        fontSize: 20,
        width: '100%',
    },
});
