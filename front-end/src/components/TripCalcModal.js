import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const Modal = ({ tripCost, distance, clearData }) => {
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => clearData()}>
                    <Text>X</Text>
                </TouchableOpacity>
                <Text>{tripCost}</Text>
                <Text>{distance}</Text>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 200,
        backgroundColor: '#E9E9E9',
        position: 'absolute',
        top: 200,
        left: 100,
        zIndex: 10,
    },
});
