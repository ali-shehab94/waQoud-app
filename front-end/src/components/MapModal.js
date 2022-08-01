import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';

import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export const MapModal = ({ coords, clearData }) => {
    useEffect(() => {
        console.log(coords);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={() => clearData()} style={{ position: 'absolute', left: '92%', alignItems: 'center' }}>
                        <MaterialIcons name='exit-to-app' size={34} color='black' />
                    </TouchableOpacity>
                    <MapView
                        style={styles.map}
                        showsPointsOfInterest
                        zoomControlEnabled
                        initialRegion={{
                            latitude: coords[0],
                            longitude: coords[1],
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                    >
                        <Marker coordinate={{ latitude: coords[0], longitude: coords[1] }} draggable={true}>
                            <Callout>
                                <Text>Gas Station</Text>
                            </Callout>
                        </Marker>
                    </MapView>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        elevation: 10,
        height: 180,
        width: '100%',
        backgroundColor: '#E9E9E9',
        position: 'absolute',
        zIndex: 10,
        borderTopWidth: 0.2,
    },

    info: {
        marginTop: '10%',
        paddingHorizontal: '4%',
        fontSize: 5,
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    map: {
        position: 'absolute',
        top: 44,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 80,
    },
});
