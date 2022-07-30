import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const RoundedButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={[styles.roundButton, styles.shadowProp]} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    roundButton: {
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
        shadowOpacity: 20,
        shadowColor: 'black',
        borderWidth: 0.5,
        elevation: 8,
    },
    buttonText: {
        fontSize: 26,
        fontFamily: 'Righteous_400Regular',
        color: '#0F5F53',
        justifyContent: 'center',
    },
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
