import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useContext, useState } from 'react';
import { userContext } from '../../context/UserContext';
import { RoundedButton } from '../components/RoundedButton';

import { MaterialIcons } from '@expo/vector-icons';

export const Home = () => {
    return (
        <View style={styles.container}>
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
                        <Text>Price</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <View>
                        <Text>HHH</Text>
                    </View>
                    <View style={styles.difference}>
                        <View>
                            <Text>HHH</Text>
                        </View>
                        <View>
                            <Text>HHH</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.info}>
                    <View>
                        <Text>HHH</Text>
                    </View>
                    <View>
                        <Text>HHH</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <View>
                        <Text>HHH</Text>
                    </View>
                    <View>
                        <Text>HHH</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <View>
                        <Text>HHH</Text>
                    </View>
                    <View>
                        <Text>HHH</Text>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center', margin: 40 }}>
                <RoundedButton text='Select a vehicle ' />
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
    selectGas: {
        width: '18%',
        borderRightWidth: 1,
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
});
