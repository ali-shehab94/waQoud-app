import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useState, useEffect, useContext } from 'react';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { RoundedButton } from '../components/RoundedButton';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';

export const VehicleTracker = () => {
    const [user, setUser] = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [trackers, setTrackers] = useState([]);
    const [vehicleName, setVehicleName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [trackerValue, setTrackerValue] = useState(null);

    const tracker = [
        { label: 'Engine Oil', value: '1' },
        { label: 'Brakes', value: '2' },
        { label: 'Wheels', value: '3' },
    ];

    useEffect(() => {
        getTrackers();
        getVehicleName();
    }, [user.selectedVehicle]);

    const handleTrackerValue = (val) => {
        setTrackerValue(val());
        console.log(trackers);
    };

    const getTrackers = () => {
        axios
            .post(`http://10.0.2.2:8000/api/get_trackers`, JSON.stringify({ users_id: user.user.id, vehicles_id: user.selectedVehicle }), {
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
            .get(`http://10.0.2.2:8000/api/vehicle_name?vehicle_id=${user.selectedVehicle}`)
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
            <View style={styles.header}>
                {user.selectedVehicle ? (
                    <Text style={styles.vehicleName}>{vehicleName.charAt(0).toUpperCase() + vehicleName.substring(1)}</Text>
                ) : (
                    <Text style={styles.vehicleName}>Please select a vehicle</Text>
                )}
            </View>
            <View>
                {isCreating ? (
                    <View style={styles.addVehiclesPage}>
                        <View>
                            <Ionicons
                                name='arrow-back-circle'
                                size={30}
                                color='black'
                                onPress={() => {
                                    if (step > 0) {
                                        setStep(step - 1);
                                    } else {
                                        setIsCreating(false);
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.addVehiclesTitle}>
                            <Text style={{ fontSize: 40, fontFamily: 'Righteous_400Regular' }}>Add a vehicle</Text>
                        </View>
                        {step == 0 ? (
                            <View style={[styles.inputField, { marginTop: 50 }]}>
                                <Text style={styles.smallText}>Gas type</Text>
                                <DropDownPicker
                                    placeholder='Select preferred gas type'
                                    style={styles.addGasTypeInput}
                                    textStyle={styles.dropDownText}
                                    open={open}
                                    items={tracker}
                                    value={trackerValue}
                                    setValue={handleTrackerValue}
                                    setItems={setTrackerValue}
                                    setOpen={setOpen}
                                />
                            </View>
                        ) : step == 1 ? (
                            <View style={styles.inputField}>
                                <Text style={styles.smallText}>Model</Text>
                                <TextInput placeholder='Example Corolla' style={styles.addVehiclesInput} onChangeText={(value) => setModel(value)} />
                            </View>
                        ) : step == 2 ? (
                            <View style={styles.inputField}>
                                <Text style={styles.smallText}>Year</Text>
                                <TextInput placeholder='Example 1998' style={styles.addVehiclesInput} onChangeText={(value) => setYear(value)} />
                            </View>
                        ) : step == 3 ? (
                            <View style={styles.inputField}>
                                <Text style={styles.smallText}>Cylinders</Text>
                                <TextInput placeholder='Example 4' style={styles.addVehiclesInput} onChangeText={(value) => setCylinders(value)} />
                            </View>
                        ) : null}
                        <View style={{ alignItems: 'center' }}>
                            <RoundedButton text='Next' />
                        </View>
                    </View>
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
    addVehiclesPage: {
        padding: 20,
        marginTop: 24,
    },
    addVehiclesTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    inputField: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    addVehiclesInput: {
        marginTop: 20,
        backgroundColor: '#D9D9D9',
        width: '80%',
        height: '30%',
        borderRadius: 10,
        paddingHorizontal: 7,
    },
});
