import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { RoundedButton } from '../components/RoundedButton';

export const Register = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder='First name' style={styles.textInput}></TextInput>
                <TextInput placeholder='Last name' style={styles.textInput}></TextInput>
                <TextInput placeholder='Email' style={styles.textInput}></TextInput>
                <TextInput placeholder='Password' style={styles.textInput}></TextInput>
            </View>
            <RoundedButton text='Go' />
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
        marginTop: 30,
        marginBottom: 10,
        alignItems: 'center',
    },
    textInput: {
        margin: 10,
        width: 250,
        height: 52,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1.5,
    },
});
