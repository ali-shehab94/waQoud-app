import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useState, useEffect, useContext } from 'react';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

export const VehicleTracker = () => {
    const [user, setUser] = useContext(UserContext);
    const [trackers, setTrackers] = useState([]);

    console.log(user.selectedVehicle);

    useEffect(() => {
        getTrackers();
    }, []);

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

    const getIcon = (type) => {
        const size = 40;
        const color = 'black';

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
                <Text>{user.selectedVehicle}</Text>
            </View>
            {trackers.length
                ? trackers.map((tracker) => {
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
                : null}
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
});
