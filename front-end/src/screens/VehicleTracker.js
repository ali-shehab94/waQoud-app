import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useState, useEffect, useContext } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

export const VehicleTracker = () => {
    const [user, setUser] = useContext(UserContext);
    const [trackers, setTrackers] = useState({});

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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>{user.selectedVehicle}</Text>
            </View>
            {trackers
                ? trackers.keys().map((key) => {
                      return (
                          <View>
                              <View style={styles.tracker}>
                                  <View style={styles.trackerTitle}>
                                      <FontAwesome5 name='oil-can' size={40} color='black' />
                                      <Text>{key}</Text>
                                  </View>
                                  <View>
                                      <Text>Type: {trackers[key][0].model_name}</Text>
                                      <Text>Last replaced:</Text>
                                      <Text>Replace at:</Text>
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
