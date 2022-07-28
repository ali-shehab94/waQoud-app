import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useState, useEffect, useContext } from 'react';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';

export const VehicleTracker = () => {
    const [user, setUser] = useContext(UserContext);
    const [trackers, setTrackers] = useState([]);
    const [vehicleName, setVehicleName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    console.log(user.selectedVehicle);

    useEffect(() => {
        getTrackers();
        getVehicleName();
    }, [user.selectedVehicle]);

    const getTrackers = () => {
        axios
            .post(`http://192.168.43.230:8000/api/get_trackers`, JSON.stringify({ users_id: user.user.id, vehicles_id: user.selectedVehicle }), {
                headers: { 'Content-type': 'application/json' },
            })
            .then((response) => {
                console.log(response.data);
                setTrackers(response.data.tracker);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };
    const getVehicleName = () => {
        axios
            .get(`http://192.168.43.230:8000/api/vehicle_name?vehicle_id=${user.selectedVehicle}`)
            .then((response) => {
                console.log(response.data);
                setVehicleName(response.data.vehicle_name);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const getIcon = (type) => {
        return type === 'engine_oils' ? (
            <FontAwesome5 name='oil-can' size={40} color='black' />
        ) : type === 'brakes' ? (
            <MaterialCommunityIcons name='car-brake-alert' size={40} color='black' />
        ) : (
            <FontAwesome name='dot-circle-o' size={40} color='black' />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>{user.selectedVehicle ? <Text style={styles.vehicleName}>{vehicleName}</Text> : <Text style={styles.vehicleName}>Please select a vehicle</Text>}</View>
            <View>
                {isCreating ? (
                    <Text>Hi</Text>
                ) : trackers.length ? (
                    trackers.map((tracker) => {
                        return (
                            <View key={tracker.type}>
                                <View style={styles.tracker}>
                                    <View style={styles.trackerTitle}>
                                        {getIcon(tracker.type)}
                                        <Text>{tracker.type}</Text>
                                    </View>
                                    <View>
                                        <Text>Type: {tracker.model_name}</Text>
                                        <Text>Last replaced: {tracker.installed_at}</Text>
                                        <Text>Replace at: {tracker.installed_at + tracker.lasts}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                ) : null}

                {!isCreating ? (
                    <View style={{ marginTop: 20, alignItems: 'center', alignSelf: 'center', borderWidth: 2, width: '80%' }}>
                        <Text>New Tracker</Text>
                        <Ionicons name='add-circle-sharp' size={24} color='black' onPress={() => setIsCreating(true)} />
                    </View>
                ) : null}
            </View>
        </View>
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
