import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from '../../context/UserContext';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

//screens
import { useContext, createContext, useState } from 'react';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { VehicleTracker } from '../screens/VehicleTracker';
import { StationsNearYou } from '../screens/StationsNearYou';
import { TripCalculator } from '../screens/TripCalculator';

const Tab = createBottomTabNavigator();

export function BottomTab() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            sceneContainerStyle={styles.bottomTab}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: ({ focused }) => <Entypo name='home' size={24} color={focused ? 'black' : 'gray'} /> }} />
            <Tab.Screen
                name='Trip Calculator'
                component={TripCalculator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ flexDirection: 'row' }}>
                            <Entypo name='calculator' size={24} color={focused ? 'black' : 'gray'} />
                            <FontAwesome name='dollar' size={20} color={focused ? 'black' : 'gray'} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='Vehicle Tracker'
                component={VehicleTracker}
                options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name='car-settings' size={24} color={focused ? 'black' : 'gray'} /> }}
            />
            <Tab.Screen
                name='Stations Nearby'
                component={StationsNearYou}
                options={{ tabBarIcon: ({ focused }) => <MaterialIcons name='local-gas-station' size={24} color={focused ? 'black' : 'gray'} /> }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    bottomTab: {
        flex: 1,
        backgroundColor: '#E9E9E9',
        fontSize: 20,
    },
});
