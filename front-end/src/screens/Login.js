import { StyleSheet, Text, View, TextInput } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { useState, useEffect, useContext } from 'react';
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
            const response = await axios.post(`/login`, JSON.stringify({ email, password }), {
                headers: { 'Content-type': 'application/json' },
                withCredentials: true,
            });
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
                <TextInput placeholder='Password' secureTextEntry={true} style={styles.textInput} onChangeText={(userPass) => setPassword(userPass)} />
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
        fontFamily: 'Righteous_400Regular',
    },
    inputContainer: {
        width: '70%',
        height: '30%',
        marginTop: '20%',
        marginBottom: '12%',
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
