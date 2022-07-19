import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
//screens
import { Login } from './src/screens/Login';
import { Welcome } from './src/screens/Welcome';
import { Register } from './src/screens/Register';
import { Profile } from './src/screens/Profile';
import { Home } from './src/screens/Home';

export default function App() {
    const Stack = createStackNavigator();

    return (
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
                <Stack.Screen name='Home' component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
