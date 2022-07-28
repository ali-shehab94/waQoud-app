import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { GasStation } from '../components/GasStation';
import { MY_GOOGLE_API_KEY } from '../../config/env';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const StationsNearYou = () => {
    const [user, setUser] = useContext(UserContext);
    const [userLocation, setUserLocation] = useState({ latitude: user.userLocation.latitude, longitude: user.userLocation.longitude });
    const [gasStations, setGasStations] = useState();

    useEffect(() => {
        fetchGasStations();
    }, []);

    useEffect(() => {
        console.log(gasStations?.results);
    }, [gasStations]);
    const fetchGasStations = () => {
        axios
            .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude},${userLocation.longitude}&radius=5000&type=gas_station&key=${MY_GOOGLE_API_KEY}`)
            .then((response) => {
                setGasStations(response.data);
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

                <FlatList
                    style={styles.gasStations}
                    data={gasStations?.results}
                    renderItem={({ item }) => <GasStation name={item.name.split(' ')[0]} location={[item.geometry.location.lat, item.geometry.location.lng]} />}
                />

                {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: '5%', borderWidth: 1, width: '80%', justifyContent: 'space-between' }}>
                    {gasStations
                        ? gasStations.results.map((gasStation, index) => {
                              return (
                                  <View key={index}>
                                      <GasStation name={gasStation.name.split(' ')[0]} location='1.1 KM' />
                                  </View>
                              );
                          })
                        : null}
                </View> */}
            </View>
        </SafeAreaView>
        //     <View style={styles.tracker}>
        //     <View style={styles.trackerTitle}>
        //         <Text>{gasStation.name}</Text>
        //     </View>
        //     <View>
        //         <Text>Type: {gasStation.business_status}</Text>
        //     </View>
        // </View>
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
});
