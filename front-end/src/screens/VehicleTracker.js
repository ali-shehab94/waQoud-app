import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useState, useEffect, useContext } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

export const VehicleTracker = () => {
    const [user, setUser] = useContext(UserContext);
    console.log(user.selectedVehicle);

    const getTrackers = () => {
        axios
            .post(`http://10.0.2.2:8000/api/get_trackers`, JSON.stringify({ users_id: user., vehicles_id }), {
                headers: { 'Content-type': 'application/json' },
            })
            .then((response) => {
                console.log(response.data);
        
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>{user.selectedVehicle}</Text>
            </View>
            <View>
                <View style={styles.tracker}>
                    <View style={styles.trackerTitle}>
                        <FontAwesome5 name='oil-can' size={40} color='black' />
                        <Text>Engine Oil</Text>
                    </View>
                    <View>
                        <Text>Type:</Text>
                        <Text>Last replaced:</Text>
                        <Text>Replace at:</Text>
                    </View>
                </View>
                <FlatList>
                    <Text>Hi</Text>
                </FlatList>
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
        height: '35%',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    trackerTitle: {
        paddingHorizontal: 20,
    },
});
