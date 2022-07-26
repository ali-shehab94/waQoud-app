import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, TextInput, Text, View, Dimensions, SafeAreaView } from 'react-native';
import { UserContext } from '../../context/UserContext';
import * as Location from 'expo-location';
import { MY_GOOGLE_API_KEY } from '../../config/env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
export const TripCalculator = () => {
    const [user, setUser] = useContext(UserContext);
    const [pin, setPin] = useState({ latitude: 33.893743, longitude: 35.486086 });
    const [region, setRegion] = useState({ latitude: 33.893743, longitude: 35.486086 });
    const [distance, setDistance] = useState({});
    const [userLocation, setUserLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        GetCurrentLocation();
    }, []);
    async function GetCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission not granted', 'Allow the app to use location service.', [{ text: 'OK' }], { cancelable: false });
        }

        let { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
            response = coords;
            setUserLocation(response);
            console.log('----', response);
            console.log(userLocation);
        }
    }

    const calculateDistance = () => {
        axios
            .get(
                `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${pin.latitude},${pin.longitude}&origins=${userLocation.latitude},${userLocation.longitude}&key=${MY_GOOGLE_API_KEY}`
            )
            .then((response) => {
                console.log(pin.latitude);
                console.log(pin.longitude);
                console.log(userLocation.latitude);
                console.log(userLocation.longitude);
                setDistance(response.data.rows[0].elements[0].distance.value);
                console.log('distance --> ', distance);
                calculateTripCost();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const calculateTripCost = () => {
        axios
            .post(`http://10.0.2.2:8000/api/trip_cost`, JSON.stringify({ distance, vehicles_id: user.selectedVehicle }), {
                headers: { 'Content-type': 'application/json' },
            })
            .then((response) => {
                console.log(response.data);
                setIsCreating = false;
            })
            .catch((err) => {
                console.log('error at add vehicle', err.response.data);
            });
    };
    return (
        <SafeAreaView>
            <View style={{ marginTop: 50, flex: 1 }}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    GooglePlacesSearchQuery={{
                        rankby: 'distance',
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details.geometry.location);
                    }}
                    query={{
                        key: MY_GOOGLE_API_KEY,
                        language: 'en',
                        components: 'country:lb',
                        types: 'establishment',
                        radius: 30000,
                        location: `${region.latitude}, ${region.longitude}`,
                    }}
                    styles={{
                        container: { flex: 0, position: 'absolute', width: '100%', zIndex: 1 },
                        listView: { backgroundColor: 'white' },
                    }}
                />
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 33.893743,
                        longitude: 35.486086,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onPress={(event) => {
                        setPin(event.nativeEvent.coordinate);
                        console.log(pin);
                        calculateDistance();
                    }}
                    showsUserLocation={true}
                >
                    <Marker coordinate={pin} draggable={true}>
                        <Callout>
                            <Text>I want to go here</Text>
                        </Callout>
                    </Marker>
                </MapView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
