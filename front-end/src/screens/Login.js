import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { useState, useEffect, useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { RoundedButton } from '../components/RoundedButton';

export const Login = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        return () => {
            setEmail(''), setPassword('');
        };
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:8000/api/login', JSON.stringify({ email, password }), {
                headers: { 'Content-type': 'application/json' },
                withCredentials: true,
            });
            console.log(JSON.stringify(response.data));
            setUser(response?.data);
            navigation.navigate('BottomTab');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in</Text>
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
        paddingTop: '10%',
    },
    title: {
        marginTop: '20%',
        color: '#0F5F53',
        fontSize: 40,
    },
    inputContainer: {
        marginTop: '10%',
        marginBottom: '10%',
        alignItems: 'center',
    },
    textInput: {
        margin: '4%',
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
        margin: '4%',
        width: 250,
        height: 52,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1.5,
    },
});
