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
        console.log(userLocation);
    }, []);

    axios
        .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude},${userLocation.longitude}&radius=2000&type=gas_station&key=${MY_GOOGLE_API_KEY}`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Stations</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9E9',
    },
});
