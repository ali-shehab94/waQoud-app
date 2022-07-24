import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const GasChart = () => {
    const [open, setOpen] = useState(false);
    const [prices, setPrices] = useState();
    const [gasType, setGasType] = useState('UNL_95');
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
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
    }, []);

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
    return (
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
                        <Text
                            onPress={() => {
                                console.log('Current user:', user);
                            }}
                        >
                            {gasType}
                        </Text>
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
        </>
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