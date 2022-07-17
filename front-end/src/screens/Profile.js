import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const Profile = () => {
    return (
        <View style={styles.container}>
            <View>
                <FontAwesome name='chevron-circle-left' size={32} color='black' />
            </View>
            <View style={styles.page}>
                <View style={styles.profile}>
                    <Text style={styles.name}>Name</Text>
                    <TouchableOpacity>
                        <MaterialIcons name='mode-edit' size={24} color='black' />
                    </TouchableOpacity>
                    <Image source={require('../../assets/logos/3.png')} style={styles.image} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.profile}>
                        <Ionicons name='car' size={40} color='black' /> My Vehicles
                    </Text>
                    <Text style={styles.profile}>
                        <Ionicons name='car' size={40} color='black' /> My Vehicles
                    </Text>
                    <Text style={styles.profile}>
                        <Ionicons name='car' size={40} color='black' /> My Vehicles
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#E9E9E9',
        paddingTop: 30,
    },
    page: {
        margin: 30,
    },
    name: {
        fontSize: 36,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        flex: 0.3,
        height: 50,
        borderRadius: 40,
    },
    info: {
        marginTop: 50,
    },
});
