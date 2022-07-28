import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext';

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
            .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude},${userLocation.longitude}&radius=500&type=gas_station&key=${MY_GOOGLE_API_KEY}`)
            .then((response) => {
                setGasStations(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Stations</Text>
                {gasStations
                    ? gasStations.results.map((gasStation, index) => {
                          return (
                              <View key={index}>
                                  <View style={styles.tracker}>
                                      <View style={styles.trackerTitle}>
                                          <Text>{gasStation.name}</Text>
                                      </View>
                                      <View>
                                          <Text>Type: {gasStation.business_status}</Text>
                                      </View>
                                  </View>
                              </View>
                          );
                      })
                    : null}
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9E9',
    },
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
