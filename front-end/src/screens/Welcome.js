import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { WelcomeLogo } from './src/components/WelcomeLogo';
import { RoundedButton } from './src/components/RoundedButton';

export const Welcome = () => {
    return (
        <View style={styles.container}>
            <WelcomeLogo />
            <View style={styles.buttonsContainer}>
                <RoundedButton text='Login' />
                <RoundedButton text='Register' />
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
});
