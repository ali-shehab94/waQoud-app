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
        width: 116,
        height: 116,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
        shadowOpacity: 20,
        shadowColor: 'black',
    },
    buttonText: {
        fontSize: 24,
        color: '#0F5F53',
    },
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
