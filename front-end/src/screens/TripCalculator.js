import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, TextInput, Text, View, Dimensions } from 'react-native';
import { UserContext } from '../../context/UserContext';
import * as Location from 'expo-location';
import { MY_GOOGLE_API_KEY } from '../../config/env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { useState, useContext, useEffect } from 'react';
export const TripCalculator = () => {
    const [pin, setPin] = useState({ latitude: 33.893743, longitude: 35.486086 });
    const [region, setRegion] = useState({ latitude: 33.893743, longitude: 35.486086 });
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

            console.log('----', response);
        }
    }

    return (
        <View style={{ marginTop: 50, flex: 1 }}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: 'distance',
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
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
                }}
                showsUserLocation={true}
            >
                <Marker
                    coordinate={pin}
                    draggable={true}
                    onDragStart={(e) => {
                        console.log('Drag start', e.nativeEvent.coordinates);
                    }}
                    onDragEnd={(e) => {
                        console.log('Drag end', e.nativeEvent.coordinates);
                    }}
                >
                    <Callout>
                        <Text>I want to go here</Text>
                    </Callout>
                </Marker>
            </MapView>
        </View>
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
