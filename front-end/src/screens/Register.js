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
                <TextInput placeholder='Password' secureTextEntry={true} style={styles.textInput} onChangeText={(userPassword) => setPassword(userPassword)} />
            </View>
            <RoundedButton text='Go' onPress={handleRegister} />
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
        fontFamily: 'Righteous_400Regular',
    },
    inputContainer: {
        width: '80%',
        height: '50%',
        marginTop: '10%',
        marginBottom: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 20,
        backgroundColor: '#1fc5ac',
        elevation: 20,
    },
    textInput: {
        margin: '4%',
        width: 220,
        height: 54,
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 2,
        borderColor: '#0F5F53',
        elevation: 8,
        paddingHorizontal: 7,
    },
});
