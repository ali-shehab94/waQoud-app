import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { RoundedButton } from '../components/RoundedButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useContext } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

export const Home = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [prices, setPrices] = useState();
    const [gasType, setGasType] = useState('UNL_95');

    const [isCreating, setIsCreating] = useState(false);

    const [user, setUser] = useContext(UserContext);

    const handleFuelTypeDropdown = (val) => {
        // console.log(val());
        setValue(val());
        setUser({ ...user, selectedVehicle: val() });
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
            const difference = prices && _prices[index].price - (_prices[index + 1]?.price ?? 0);

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
                            <Text>{difference > 0 ? '^' : 'v'}</Text>
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
                <View>
                    <Text> CREATE NEW CAR PAGE</Text>
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
                                    Name
                                </Text>
                            </View>
                            <Image source={require('../../assets/logos/2.png')} style={styles.logoImg} />
                        </View>
                    </View>
                    <View style={styles.gasChart}>
                        <View style={styles.chartTop}>
                            <TouchableOpacity style={styles.selectGas}>
                                <Text>UNL95</Text>
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
                                <Text>Price {prices && getSelectedGasTypePrices()[0].price}</Text>
                            </View>
                        </View>
                        {prices && priceRows()}
                    </View>
                    <View style={styles.roundedButton}>
                        {/* <RoundedButton text='Select a vehicle ' /> */}
                        <DropDownPicker
                            textStyle={styles.buttonText}
                            style={[styles.gasDropdown, styles.shadowProp]}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={handleFuelTypeDropdown}
                            setItems={setItems}
                        />
                    </View>
                    <RoundedButton text='Add new vehicle' onPress={() => setIsCreating(true)} />
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
    header: {
        backgroundColor: '#0F5F53',
        height: '17%',
    },
    headerText: {
        color: 'white',
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
    chartTop: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    price: {
        alignItems: 'center',
        marginLeft: 70,
        paddingTop: 20,
    },
    roundedButton: {
        zIndex: 100,
        position: 'absolute',
        top: '55%',
        left: '30%',
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
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
