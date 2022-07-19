import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { userContext } from '../../UserContext';
import { useState, useEffect, useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { RoundedButton } from '../components/RoundedButton';

export const Login = () => {
    const [user, setUser] = useContext(userContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        return () => {
            setEmail(''), setPassword('');
        };
    }, []);

    const handleLogin = async () => {
        axios({
            method: 'post',
            url: 'http://10.0.2.2:8000/api/login',
            data: {
                email: email,
                password: password,
            },
        })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sing in</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder='Email' style={styles.textInput} onChangeText={(userEmail) => setEmail(userEmail)} />
                <TextInput placeholder='Password' style={styles.textInput} onChangeText={(userPass) => setPassword(userPass)} />
                <TouchableHighlight
                    style={styles.googleButton}
                    onPress={() => {
                        alert(password);
                    }}
                >
                    <Text>
                        <AntDesign name='google' size={24} color='black' />
                        Continue with google
                    </Text>
                </TouchableHighlight>
            </View>
            <RoundedButton text='Go' onPress={handleLogin} />
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
        marginTop: 25,
        color: '#0F5F53',
        fontSize: 40,
    },
    inputContainer: {
        marginTop: 33,
        marginBottom: 65,
        alignItems: 'center',
    },
    textInput: {
        margin: 10,
        width: 250,
        height: 54,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1.5,
        paddingHorizontal: 7,
    },
    googleButton: {
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        width: 250,
        height: 52,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1.5,
    },
});
