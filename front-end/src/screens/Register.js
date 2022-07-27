import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { RoundedButton } from '../components/RoundedButton';

export const Register = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:8000/api/register', JSON.stringify({ first_name: firstName, last_name: lastName, email, password }), {
                headers: { 'Content-type': 'application/json' },
                withCredentials: true,
            });
            console.log(JSON.stringify(response.data));
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder='First name' style={styles.textInput} onChangeText={(userFName) => setFirstName(userFName)} />
                <TextInput placeholder='Last name' style={styles.textInput} onChangeText={(userLName) => setLastName(userLName)} />
                <TextInput placeholder='Email' style={styles.textInput} onChangeText={(userEmail) => setEmail(userEmail)} />
                <TextInput placeholder='Password' style={styles.textInput} onChangeText={(userPassword) => setPassword(userPassword)} />
            </View>
            <RoundedButton text='Register' onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9E9',
        alignItems: 'center',
        paddingTop: 30,
    },
    title: {
        marginTop: '20%',
        color: '#0F5F53',
        fontSize: 40,
    },
    inputContainer: {
        marginTop: 18,
        marginBottom: 10,
        alignItems: 'center',
    },
    textInput: {
        margin: '4%',
        width: 250,
        height: 54,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1.5,
        paddingHorizontal: 7,
    },
});
