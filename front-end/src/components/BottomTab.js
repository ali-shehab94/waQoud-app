import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from '../../context/UserContext';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//screens
import { useContext, createContext, useState } from 'react';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { VehcileTracker } from '../screens/VehicleTracker';
import { TripCalculator } from '../screens/TripCalculator';

const Tab = createBottomTabNavigator();

export function BottomTab() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: ({ focused }) => <Entypo name='home' size={24} color={focused ? 'black' : 'gray'} /> }} />
            <Tab.Screen
                name='TripCalculator'
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
                name='VehicleTracker'
                component={VehcileTracker}
                options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name='car-settings' size={24} color={focused ? 'black' : 'gray'} /> }}
            />

            <Tab.Screen name='Profile' component={Profile} options={{ tabBarIcon: ({ focused }) => <Entypo name='user' size={24} color={focused ? 'black' : 'gray'} /> }} />
        </Tab.Navigator>
    );
}
