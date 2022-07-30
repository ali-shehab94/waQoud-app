import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { CARS_API_KEY } from '../../config/env';
import { UserContext } from '../../context/UserContext';
import { RoundedButton } from '../components/RoundedButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { GasChart } from '../components/GasChart';
import { Ionicons } from '@expo/vector-icons';

export const Home = () => {
    const [open, setOpen] = useState(false);
    const [vehicleValue, setVehicleValue] = useState(null);
    const [vehicle, setVehicle] = useState([]);
    const [tripCost, setTripCost] = useState();
    const [gasTypesValue, setGasTypesValue] = useState(null);

    let newVehicle;

    const gasTypes = [
        { label: 'UNL_95', value: '1' },
        { label: 'UNL_98', value: '2' },
        { label: 'Diesel', value: '3' },
    ];

    const [isCreating, setIsCreating] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [step, setStep] = useState(0);
    const [make, setMake] = useState();
    const [model, setModel] = useState();
    const [year, setYear] = useState();
    const [cylinders, setCylinders] = useState();
    const [mpg, setMpg] = useState();

    useEffect(() => {
        if (mpg) {
            console.log(mpg);
            addNewVehicle();
        }
    }, [mpg]);

    const handleGasTypeValue = (val) => {
        setGasTypesValue(val());
    };

    const handleSelectVehicle = (val) => {
        setVehicleValue(val());
        setUser({ ...user, selectedVehicle: val() });
    };
    const handleFetchVehicle = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            console.log(make);
            console.log(year);
            console.log(model);
            console.log(cylinders);
            axios
                .get(`https://api.api-ninjas.com/v1/cars?make=${make}&year=${year}&model=${model}&cylinders=${cylinders}`, {
                    headers: { 'Content-type': 'application/json', 'X-Api-Key': CARS_API_KEY },
                })
                .then((response) => {
                    newVehicle = response.data[0];
                    console.log(newVehicle);
                    setMpg(newVehicle['combination_mpg']);
                    // console.log(JSON.stringify(response.data));
                })
                .catch((err) => {
                    console.log('error at handle fetch', err.response.data);
                });
        }
    };

    const addNewVehicle = () => {
        console.log('im heres');
        axios
            .post(`http://10.0.2.2:8000/api/add_vehicle`, JSON.stringify({ fuel_type: gasTypesValue, make, model, year, cylinders, users_id: user.user.id, mpg }), {
                headers: { 'Content-type': 'application/json' },
            })
            .then((response) => {
                //clearing all fields
                console.log(response.data);
                setIsCreating(false);
                setGasTypesValue(null);
                setStep(0);
                setCylinders();
                setMake();
                setModel();
                setMpg();
                setTripCost();
            })
            .catch((err) => {
                console.log('error at add vehicle', err.response.data);
            });
    };

    useEffect(() => {
        user &&
            axios
                .get(`http://10.0.2.2:8000/api/user_vehicles/${user.user.id}`, {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true,
                })
                .then((response) => {
                    setVehicle(
                        response.data.user_vehicles.map((car) => {
                            return { label: `${car[0].make.charAt(0).toUpperCase() + car[0].make.substring(1)} ${car[0].model.toUpperCase()} ${car[0].year}`, value: car[0].id };
                        })
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
    }, []);

    return (
        <View style={styles.container}>
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
                        <View style={styles.inputField}>
                            <Text style={styles.smallText}>Make</Text>
                            <TextInput placeholder='Example Toyota' style={styles.addVehiclesInput} onChangeText={(value) => setMake(value)} />
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
                    ) : step == 4 ? (
                        <View style={[styles.inputField, { marginTop: 50 }]}>
                            <Text style={styles.smallText}>Gas type</Text>
                            <DropDownPicker
                                placeholder='Select preferred gas type'
                                style={styles.addGasTypeInput}
                                textStyle={styles.dropDownText}
                                open={open}
                                items={gasTypes}
                                value={gasTypesValue}
                                setValue={handleGasTypeValue}
                                setItems={setGasTypesValue}
                                setOpen={setOpen}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text>{make}</Text>
                            <Text>{model}</Text>
                            <Text>{year}</Text>
                            <Text>{cylinders}</Text>
                            <Text>{gasTypesValue}</Text>
                        </View>
                    )}

                    <View style={{ alignItems: 'center' }}>
                        <RoundedButton text='Next' onPress={handleFetchVehicle} />
                    </View>
                </View>
            ) : (
                <>
                    <GasChart />
                    <View style={styles.vehicleSelector}>
                        <DropDownPicker
                            placeholder='My Vehicles'
                            textStyle={styles.dropDownText}
                            style={[styles.gasDropdown]}
                            open={open}
                            value={vehicleValue}
                            items={vehicle}
                            setOpen={setOpen}
                            setValue={handleSelectVehicle}
                            setItems={setVehicle}
                        />
                        <View style={{ alignItems: 'center', alignSelf: 'center', borderWidth: 2, borderRadius: 10, backgroundColor: '#', width: '100%' }}>
                            <Text style={{ fontFamily: 'Righteous_400Regular' }}>Add a vehicle</Text>
                            <TouchableOpacity onPress={() => setIsCreating(true)}>
                                <Ionicons name='add-circle-sharp' size={24} color='black' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9E9',
    },
    addGasTypeInput: {
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    header: {
        backgroundColor: '#0F5F53',
        height: '17%',
    },
    headerText: {
        color: 'white',
        paddingLeft: 10,
    },
    headerContent: {
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    smallText: {
        fontSize: 20,
    },
    logoImg: {
        width: 180,
        height: 60,
    },
    gasChart: {
        padding: 30,
    },
    selectedPrice: {
        fontSize: 20,
        fontFamily: 'Righteous_400Regular',
    },
    chartTop: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    addVehiclesPage: {
        padding: 20,
        marginTop: 24,
    },
    price: {
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 10,
    },
    vehicleSelector: {
        alignSelf: 'center',
        zIndex: 100,
        position: 'absolute',
        top: '55%',
        left: '23%',
        justifyContent: 'center',
    },
    selectGas: {
        width: '18%',
        borderRightWidth: 1,
    },
    gasDropdown: {
        elevation: 8,
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFAC33',
        shadowOpacity: 20,
        shadowColor: 'black',
    },
    addVehicle: {
        width: '70%',
        color: 'black',
    },
    addVehiclesTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    addVehiclesInput: {
        marginTop: 20,
        backgroundColor: '#D9D9D9',
        width: '80%',
        height: '30%',
        borderRadius: 10,
        paddingHorizontal: 7,
    },
    inputField: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    info: {
        height: 30,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    difference: {
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 22,
        fontFamily: 'Righteous_400Regular',
        color: '#0F5F53',
        justifyContent: 'center',
    },
    dropDownText: {
        fontSize: 15,
        color: '#0F5F53',
        justifyContent: 'center',
        fontFamily: 'Righteous_400Regular',
    },
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
