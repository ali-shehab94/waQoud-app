import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { userContext } from './UserContext';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
//screens
import { useContext, createContext, useState } from 'react';
import { Login } from './src/screens/Login';
import { Welcome } from './src/screens/Welcome';
import { Register } from './src/screens/Register';
import { Profile } from './src/screens/Profile';
import { Home } from './src/screens/Home';

const vehicle = createContext();
export default function App() {
    const [user, setUser] = useState();
    const guestStack = createStackNavigator();
    const authStack = createStackNavigator();

    return (
        <userContext.Provider value={[user, setUser]}>
            <NavigationContainer>
                {!user ? (
                    <guestStack.Navigator
                        initialRouteName='Main'
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <guestStack.Screen name='Welcome' component={Welcome} />
                        <guestStack.Screen name='Login' component={Login} />
                        <guestStack.Screen name='Register' component={Register} />
                        <guestStack.Screen name='Home' component={Home} />
                    </guestStack.Navigator>
                ) : (
                    <Home />
                )}
            </NavigationContainer>
        </userContext.Provider>
    );
}
