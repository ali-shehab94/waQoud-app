import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { CARS_API_KEY } from '../../config/env';
import { UserContext } from '../../context/UserContext';
import { RoundedButton } from '../components/RoundedButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';

export const Home = () => {
    const [open, setOpen] = useState(false);
    const [vehicleValue, setVehicleValue] = useState(null);
    const [items, setItems] = useState([]);
    const [gasTypesValue, setGasTypesValue] = useState(null);
    const [gasTypes, setGasTypes] = useState([
        { label: 'UNL_95', value: 'UNL_95' },
        { label: 'UNL_98', value: 'UNL_98' },
        { label: 'Diesel', value: 'Diesel' },
    ]);
    const [prices, setPrices] = useState();
    const [gasType, setGasType] = useState('UNL_95');
    const [isCreating, setIsCreating] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [step, setStep] = useState(0);
    const [vehicle, setVehicle] = useState({});
    const [make, setMake] = useState();
    const [model, setModel] = useState();
    const [year, setYear] = useState();
    const [cylinders, setCylinders] = useState();

    const handleGasTypeValue = (val) => {
        setGasTypesValue(val());
    };

    const handleSelectVehicle = (val) => {
        setVehicleValue(val());
        setUser({ ...user, selectedVehicle: val() });
    };
    const handleAddVehicle = () => {
        setStep(step + 1);
    };

    const getSelectedGasTypePrices = () => {
        let _prices = [];
        switch (gasType) {
            case 'UNL_95':
                _prices = prices.prices['UNL_95'];
                break;
            case 'UNL_98':
                _prices = prices.prices['UNL_98'];
                break;
            case 'Diesel':
                _prices = prices.prices['Diesel'];
                break;
        }

        return _prices;
    };

    const priceRows = () => {
        const _prices = getSelectedGasTypePrices();

        return _prices.map((price, index) => {
            const difference = prices && _prices[index].difference;
            // const difference = prices && _prices[index].price - (_prices[index + 1]?.price ?? 0);

            return (
                <View key={price.id} style={styles.info}>
                    <View>
                        <Text>{price.created_at.split('T')[0] + ' ' + price.created_at.split('T')[1].slice(0, 8)}</Text>
                    </View>
                    <View style={styles.difference}>
                        <View>
                            <Text>{difference}</Text>
                        </View>
                        <View>
                            <Text>{difference > 0 ? <AntDesign name='arrowup' size={24} color='red' /> : <AntDesign name='arrowdown' size={24} color='green' />}</Text>
                        </View>
                    </View>
                </View>
            );
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
                    setItems(
                        response.data.user_vehicles.map((car) => {
                            return { label: `${car[0].make} ${car[0].model} ${car[0].year}`, value: car[0].id };
                        })
                    );
                })
                .catch((err) => {
                    console.log(err);
                });

        axios
            .get(`http://10.0.2.2:8000/api/scrape_fuel_prices`, {
                headers: { 'Content-type': 'application/json' },
                withCredentials: true,
            })
            .then((response) => {
                setPrices(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        return setIsCreating(false);
    }, []);

    return (
        <View style={styles.container}>
            {isCreating ? (
                <View style={styles.addVehiclesPage}>
                    <View>
                        <Ionicons
                            name='arrow-back-circle'
                            size={24}
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
                        <Text style={{ fontSize: 40 }}>Add a vehicle</Text>
                    </View>

                    {step == 0 ? (
                        <View style={styles.inputField}>
                            <Text>Make</Text>
                            <TextInput placeholder='Example Toyota' style={styles.addVehiclesInput} onChangeText={(value) => setMake(value)} />
                        </View>
                    ) : step == 1 ? (
                        <View style={styles.inputField}>
                            <Text>Model</Text>
                            <TextInput placeholder='Example Corolla' style={styles.addVehiclesInput} onChangeText={(value) => setModel(value)} />
                        </View>
                    ) : step == 2 ? (
                        <View style={styles.inputField}>
                            <Text>Year</Text>
                            <TextInput placeholder='Example 1998' style={styles.addVehiclesInput} onChangeText={(value) => setYear(value)} />
                        </View>
                    ) : step == 3 ? (
                        <View style={styles.inputField}>
                            <Text>Cylinders</Text>
                            <TextInput placeholder='Example 4' style={styles.addVehiclesInput} onChangeText={(value) => setCylinders(value)} />
                        </View>
                    ) : step == 4 ? (
                        <View style={styles.inputField}>
                            <Text>Gas type</Text>
                            <DropDownPicker
                                style={styles.addGasTypeInput}
                                placeholder='Select preferred gas type'
                                textStyle={styles.dropDownText}
                                open={open}
                                items={gasTypes}
                                value={gasTypesValue}
                                setValue={handleGasTypeValue}
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
                        <RoundedButton text='Next' onPress={handleAddVehicle} />
                    </View>
                </View>
            ) : (
                <>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <View>
                                <Image source={require('../../assets/logos/3.png')} style={styles.profileImg} />
                                <Text
                                    style={styles.headerText}
                                    onPress={() => {
                                        props.navigation.navigate('Profile');
                                    }}
                                >
                                    {user.user.first_name}
                                </Text>
                            </View>
                            <Image source={require('../../assets/logos/2.png')} style={styles.logoImg} />
                        </View>
                    </View>
                    <View style={styles.gasChart}>
                        <View style={styles.chartTop}>
                            <TouchableOpacity style={styles.selectGas}>
                                <Text>{CARS_API_KEY}</Text>
                                <MaterialIcons
                                    name='keyboard-arrow-down'
                                    size={24}
                                    color='black'
                                    onPress={() => {
                                        alert('pressed');
                                    }}
                                />
                            </TouchableOpacity>
                            <View style={styles.price}>
                                <Text style={styles.selectedPrice}>{prices && getSelectedGasTypePrices()[0].price} / 20L</Text>
                            </View>
                        </View>
                        {prices && priceRows()}
                    </View>
                    <View style={styles.roundedButton}>
                        <DropDownPicker
                            placeholder='Select a vehicle'
                            textStyle={styles.dropDownText}
                            style={[styles.gasDropdown]}
                            open={open}
                            value={vehicleValue}
                            items={items}
                            setOpen={setOpen}
                            setValue={handleSelectVehicle}
                            setItems={setItems}
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='add-circle-sharp' size={24} color='black' onPress={() => setIsCreating(true)} />
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
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
    logoImg: {
        width: 180,
        height: 60,
    },
    gasChart: {
        padding: 30,
    },
    selectedPrice: {
        fontSize: 20,
    },
    chartTop: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    addVehiclesPage: {
        padding: 20,
        marginTop: 20,
    },
    price: {
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 10,
    },
    roundedButton: {
        zIndex: 100,
        position: 'absolute',
        top: '55%',
        left: '35%',
        justifyContent: 'center',
    },
    selectGas: {
        width: '18%',
        borderRightWidth: 1,
    },
    gasDropdown: {
        width: 116,
        height: 116,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
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
        color: '#0F5F53',
        justifyContent: 'center',
    },
    dropDownText: {
        fontSize: 10,
        color: '#0F5F53',
        justifyContent: 'center',
    },
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
