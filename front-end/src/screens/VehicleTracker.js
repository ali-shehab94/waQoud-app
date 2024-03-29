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
    const [addedTracker, setAddedTracker] = useState(null);
    let path;
    const [trackers, setTrackers] = useState([]);
    const [vehicleName, setVehicleName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [trackerValue, setTrackerValue] = useState(null);
    const [modelName, setModelName] = useState(null);
    const [lasts, setLasts] = useState(null);
    const [installedAt, setInstalledAt] = useState(null);

    const tracker = [
        { label: 'Engine Oil', value: 1 },
        { label: 'Brakes', value: 2 },
        { label: 'Wheels', value: 3 },
    ];

    useEffect(() => {
        getTrackers();
        getVehicleName();
    }, [addedTracker]);

    const handleTrackerValue = (val) => {
        setTrackerValue(val());
    };

    //get all trackers (engine oil, wheels, or brakes) of a vehicle
    const getTrackers = () => {
        axios
            .post(`/get_trackers`, JSON.stringify({ users_id: user.user.id, vehicles_id: user.selectedVehicle }), {
                headers: { 'Content-type': 'application/json' },
            })
            .then((response) => {
                setTrackers(response.data.tracker);
            })
            .catch((err) => {
                console.log('from vehicle trackers', err.response.data);
            });
    };

    //step to switch from page to page in add vehicle
    const handleStep = () => {
        //if step is not the last step which is 3, go to next
        if (step < 3) {
            setStep(step + 1);
        } else {
            //check what is the tracker for according to user input
            if (trackerValue === 1) {
                path = 'add_engine_oil_tracker';
            } else if (trackerValue === 2) {
                path = 'add_brake_tracker';
            } else {
                path = 'add_wheel_tracker';
            }
            //API call to add a tracker
            axios
                .post(`/${path}`, JSON.stringify({ model_name: modelName, lasts, installed_at: installedAt, users_id: user.user.id, vehicles_id: user.selectedVehicle }), {
                    headers: { 'Content-type': 'application/json' },
                })
                .then((response) => {
                    setAdd(response.data);
                    //clear data from state variables
                    setStep(0);
                    setModelName();
                    setLasts();
                    setInstalledAt();
                    setIsCreating(false);
                })
                .catch((err) => {
                    console.log('error at handle fetch', err.response.data);
                });
        }
    };

    //to display vehicle name in title
    const getVehicleName = () => {
        axios
            .get(`/vehicle_name?vehicle_id=${user.selectedVehicle}`)
            .then((response) => {
                setVehicleName(response.data.vehicle_name);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    //to decide which icon shall be displayed according to the tracker (engine oil, brakes, or wheels)
    const getIcon = (type) => {
        return type === 'engine_oils' ? (
            <FontAwesome5 name='oil-can' size={40} color='black' />
        ) : type === 'brakes' ? (
            <MaterialCommunityIcons name='car-brake-alert' size={40} color='black' />
        ) : (
            <FontAwesome name='dot-circle-o' size={40} color='black' />
        );
    };

    //get a displayable name for tracker
    const getTrackerName = (type) => {
        if (type === 'engine_oils') {
            return 'Engine Oil';
        } else if (type === 'brakes') {
            return 'Brakes';
        } else {
            return 'Wheels';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* title */}
                {user.selectedVehicle ? (
                    <Text style={styles.vehicleName}>{vehicleName.charAt(0).toUpperCase() + vehicleName.substring(1)}</Text>
                ) : (
                    <Text style={styles.vehicleName}>Please select a vehicle</Text>
                )}
            </View>
            <View>
                {/* if the button add tracker is clicked, is creating becomes true and add tracker component is displayed */}
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
                            <Text style={{ fontSize: 40, fontFamily: 'Righteous_400Regular' }}>Add a tracker</Text>
                        </View>
                        {step == 0 ? (
                            <View style={[styles.inputField, { marginTop: 50 }]}>
                                <Text style={{ marginBottom: 20, fontFamily: 'Righteous_400Regular' }}>Tracker Type</Text>
                                <DropDownPicker
                                    placeholder='Select tracker you would like to add'
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
                                <TextInput placeholder='Model name of item' style={styles.addVehiclesInput} onChangeText={(value) => setModelName(value)} />
                            </View>
                        ) : step == 2 ? (
                            <View style={styles.inputField}>
                                <Text style={styles.smallText}>Lasts</Text>
                                <TextInput placeholder='How long does the item lasts in KM' style={styles.addVehiclesInput} onChangeText={(value) => setLasts(value)} />
                            </View>
                        ) : step == 3 ? (
                            <View style={styles.inputField}>
                                <Text style={styles.smallText}>Installed at</Text>
                                <TextInput placeholder='' style={styles.addVehiclesInput} onChangeText={(value) => setInstalledAt(value)} />
                            </View>
                        ) : null}
                        <View style={{ alignItems: 'center' }}>
                            <RoundedButton text='Next' onPress={handleStep} />
                        </View>
                    </View>
                ) : trackers.length ? (
                    // mapping through trackers
                    trackers.map((tracker, index) => {
                        return (
                            <View key={index} style={{ marginBottom: '5%' }}>
                                <View style={styles.tracker}>
                                    <View style={styles.trackerTitle}>
                                        {getIcon(tracker.type)}
                                        <Text style={styles.smallText}>{getTrackerName(tracker.type)}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.smallText}>Type: {tracker.model_name}</Text>
                                        <Text style={styles.smallText}>Last replaced: {tracker.installed_at && numberWithCommas(tracker.installed_at)} KM</Text>
                                        <Text style={styles.smallText}>Replace at: {tracker.installed_at && numberWithCommas(tracker.installed_at + tracker.lasts)} KM</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                ) : null}

                {/* add tracker button */}
                {!isCreating ? (
                    <TouchableOpacity style={styles.addTracker} onPress={() => setIsCreating(true)}>
                        <Text style={styles.smallText}>New Tracker</Text>
                        <Ionicons name='add-circle-sharp' size={30} color='black' />
                    </TouchableOpacity>
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
        marginTop: '12%',
        marginBottom: '10%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    tracker: {
        elevation: 5,
        borderWidth: 1,
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
        marginHorizontal: 20,
    },
    vehicleName: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Righteous_400Regular',
    },
    addVehiclesPage: {
        padding: 20,
    },
    addVehiclesTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
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
    dropDownText: {
        fontFamily: 'Righteous_400Regular',
    },
    smallText: {
        fontFamily: 'Righteous_400Regular',
    },
    addTracker: {
        elevation: 4,
        borderRadius: 5,
        backgroundColor: 'orange',
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        width: '90%',
    },
});
