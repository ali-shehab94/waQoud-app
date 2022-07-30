import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Modal = ({ tripCost, distance, clearData }) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.textContainer}>
                        <TouchableOpacity onPress={() => clearData()} style={{ position: 'absolute', left: '92%', alignItems: 'center' }}>
                            <MaterialIcons name='exit-to-app' size={30} color='black' />
                        </TouchableOpacity>
                        <View style={styles.info}>
                            <Text style={styles.text}>
                                <MaterialCommunityIcons name='hand-coin' size={24} color='black' />
                                This trip will cost: <Text style={{ fontSize: 25 }}>{tripCost}</Text>
                            </Text>
                            <Text style={styles.text}>
                                <MaterialCommunityIcons name='map-marker-distance' size={24} color='black' />
                                Distance: <Text style={{ fontSize: 25 }}>{(distance / 1000).toFixed(2)} KM</Text>
                            </Text>
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
        padding: 5,
        height: '100%',
        backgroundColor: '#FFAC33',
    },
    info: {
        marginTop: '10%',
        fontSize: 5,
        alignSelf: 'center',
    },
    text: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Righteous_400Regular',
    },
});
