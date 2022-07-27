import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const Modal = ({ tripCost, distance, clearData }) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.textContainer}>
                        <TouchableOpacity onPress={() => clearData()} style={{ position: 'absolute', left: '92%', alignItems: 'center' }}>
                            <MaterialIcons name='exit-to-app' size={30} color='white' />
                        </TouchableOpacity>
                        <View style={styles.info}>
                            <Text style={styles.text}>
                                This trip will cost: <Text style={{ fontSize: 25 }}>{tripCost}</Text>
                            </Text>
                            <Text style={styles.text}>Distance: {(distance / 1000).toFixed(2)} KM</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        elevation: 10,
        height: 180,
        width: '100%',
        backgroundColor: '#E9E9E9',
        position: 'absolute',
        top: '1200%',
        zIndex: 10,
        borderTopWidth: 0.2,
    },
    modal: {
        height: '100%',
        backgroundColor: '#FFAC33',
    },
    info: {
        marginTop: '10%',
        paddingHorizontal: '10%',
        fontSize: 5,
    },
    text: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
});
