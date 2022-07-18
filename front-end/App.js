import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
//screens
import { Login } from './src/screens/Login';
import { Welcome } from './src/screens/Welcome';
import { Register } from './src/screens/Register';
import { Profile } from './src/screens/Profile';
import { Home } from './src/screens/Home';

export default function App() {
    return <Home />;
}
