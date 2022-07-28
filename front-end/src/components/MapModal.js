import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';

import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export const MapModal = ({ coords, clearData }) => {
    const [pin, setPin] = useState({ latitude: coords.latitude, longitude: coords.longitude });
    return (
        <>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.textContainer}>
                        <TouchableOpacity onPress={() => clearData()} style={{ position: 'absolute', left: '92%', alignItems: 'center' }}>
                            <MaterialIcons name='exit-to-app' size={30} color='white' />
                        </TouchableOpacity>
                        <MapView
                            style={styles.map}
                            showsPointsOfInterest
                            zoomControlEnabled
                            initialRegion={{
                                latitude: pin.latitude,
                                longitude: pin.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onPress={(event) => {
                                setPin(event.nativeEvent.coordinate);
                            }}
                            showsUserLocation={true}
                        >
                            {pin && (
                                <Marker coordinate={pin} draggable={true}>
                                    <Callout>
                                        <Text>I want to go here</Text>
                                    </Callout>
                                </Marker>
                            )}
                        </MapView>
                    </View>
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        elevation: 10,
        height: 180,
        width: '100%',
        backgroundColor: '#E9E9E9',
        position: 'absolute',
        top: '1200%',
        zIndex: 10,
        borderTopWidth: 0.2,
    },
    modal: {
        height: '100%',
        backgroundColor: '#FFAC33',
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
});
