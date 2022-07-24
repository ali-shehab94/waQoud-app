import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from './context/UserContext';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
//screens
import { useContext, createContext, useState } from 'react';
import { Login } from './src/screens/Login';
import { Welcome } from './src/screens/Welcome';
import { Register } from './src/screens/Register';
import { Profile } from './src/screens/Profile';
import { BottomTab } from './src/components/BottomTab';

export default function App() {
    const [user, setUser] = useState();
    const Stack = createStackNavigator();

    return (
        <UserContext.Provider value={[user, setUser]}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Main'
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name='Welcome' component={Welcome} />
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Register' component={Register} />
                    <Stack.Screen name='BottomTab' component={BottomTab} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
}
