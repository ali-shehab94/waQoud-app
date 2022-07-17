import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const Login = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sing in</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder='Email' style={styles.textInput}></TextInput>
                <TextInput placeholder='Password' style={styles.textInput}></TextInput>
                <TouchableHighlight style={styles.googleButton}>
                    <Text>
                        <AntDesign name='google' size={24} color='black' />
                        Continue with google
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9E9',
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        marginTop: 25,
        color: '#0F5F53',
        fontSize: 40,
    },
    inputContainer: {
        marginTop: 30,
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
