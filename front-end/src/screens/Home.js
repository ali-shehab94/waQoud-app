import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        <Image source={require('../../assets/logos/3.png')} style={styles.profileImg} />
                        <Text style={styles.headerText}>Name</Text>
                    </View>
                    <Image source={require('../../assets/logos/2.png')} style={styles.logoImg} />
                </View>
            </View>
            <View style={styles.gasChart}>
                <View style={styles.chartTop}>
                    <TouchableOpacity style={styles.selectGas}>
                        <Text>UNL95</Text>
                        <MaterialIcons
                            name='keyboard-arrow-down'
                            size={24}
                            color='black'
                            onPress={() => {
                                alert('pressed');
                            }}
                        />
                    </TouchableOpacity>
                    <View style={styles.price}>
                        <Text>Price</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9E9',
    },
    header: {
        backgroundColor: '#0F5F53',
        height: '17%',
    },
    headerText: {
        color: 'white',
    },
    headerContent: {
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    logoImg: {
        width: 180,
        height: 60,
    },
    gasChart: {
        padding: 30,
    },
    chartTop: {
        flexDirection: 'row',
    },
    price: {
        alignItems: 'center',
    },
    selectGas: {
        width: '18%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
});
