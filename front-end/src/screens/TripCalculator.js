import * as React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, TextInput, Text, View, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState } from 'react';

export const TripCalculator = () => {
    const [pin, setPin] = useState({ latitude: 33.893743, longitude: 35.486086 });
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: 'YOUR API KEY',
                    language: 'en',
                }}
            />
            <MapView
                loadingEnabled={true}
                style={styles.map}
                initialRegion={{
                    latitude: 33.893743,
                    longitude: 35.486086,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.05,
                }}
                onPress={(event) => {
                    setPin(event.nativeEvent.coordinate);
                    console.log(pin);
                }}
            >
                <Marker
                    coordinate={pin}
                    pinColor='red'
                    draggable={true}
                    onDragStart={(e) => {
                        console.log('Drag start', e.nativeEvent.coordinates);
                    }}
                    onDragEnd={(e) => {
                        console.log('Drag end', e.nativeEvent.coordinates);
                    }}
                >
                    <Callout>
                        <Text>Hi</Text>
                    </Callout>
                </Marker>
            </MapView>
            {/* <View style={{ position: 'absolute', top: 10, width: '100%' }}>
                <TextInput
                    style={{
                        borderRadius: 10,
                        margin: 10,
                        color: '#000',
                        borderColor: '#666',
                        backgroundColor: '#FFF',
                        borderWidth: 1,
                        height: 45,
                        paddingHorizontal: 10,
                        fontSize: 18,
                    }}
                    placeholder={'Search'}
                    placeholderTextColor={'#666'}
                />
            </View> */}
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
