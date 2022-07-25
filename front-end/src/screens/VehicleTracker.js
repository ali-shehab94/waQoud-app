import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useState, useEffect, useContext } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export const VehcileTracker = () => {
    const [user, setUser] = useContext(UserContext);
    console.log(user.selectedVehicle);

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
