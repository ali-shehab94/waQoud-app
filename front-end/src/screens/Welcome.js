import { StyleSheet, Text, View, Button, TouchableOpacity, Pressable } from 'react-native';
import { WelcomeLogo } from '../components/WelcomeLogo';
import { RoundedButton } from '../components/RoundedButton';

export const Welcome = (props) => {
    return (
        <View style={styles.container}>
            <WelcomeLogo />
            <View style={styles.buttonsContainer}>
                <RoundedButton
                    text='Login'
                    onPress={() => {
                        props.navigation.navigate('Login');
                    }}
                />
                <RoundedButton
                    text='Register'
                    onPress={() => {
                        props.navigation.navigate('Register');
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BE1931',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        marginTop: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
    },
    button: {
        margin: 30,
        borderWidth: 2,
        borderRadius: 15,
        fontSize: 20,
    },
    text: {
        fontSize: 20,
    },
    roundButton2: {
        marginTop: 20,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#ccc',
    },
    skip: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
