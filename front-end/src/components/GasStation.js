import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';

export const GasStation = (props) => {
    return (
        <View style={{ margin: '5%', alignItems: 'center', width: '100%' }}>
            <View style={styles.tracker}>
                <View style={styles.trackerTitle}>
                    <Image source={require('../../assets/logos/3.png')} style={styles.stationImage} />
                </View>
                <View>
                    <Text>Name: {props.name}</Text>
                    <Text>Distance: {props.location}</Text>
                </View>
            </View>
            {/* <Image source={require('../../assets/logos/3.png')} style={styles.stationImage} />
            <Text
                style={styles.stationInfo}
                onPress={() => {
                    console.log('pressed');
                }}
            >
                {props.name}
            </Text>
            <Text
                style={styles.stationInfo}
                onPress={() => {
                    console.log('pressed');
                }}
            >
                {props.location}
            </Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9E9',
    },
    stationImage: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 40,
    },
    stationInfo: {
        textAlign: 'center',
        paddingLeft: '2%',
        fontSize: 20,
        width: '70%',
    },
    tracker: {
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        width: '90%',
        height: 100,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    trackerTitle: {
        paddingHorizontal: 20,
    },
});
