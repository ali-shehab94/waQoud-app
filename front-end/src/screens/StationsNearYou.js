import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { MY_GOOGLE_API_KEY } from '../../config/env';

export const StationsNearYou = () => {
    const getNearByStations = () => {
        axios
            .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.899873,35.488818&radius=50000&type=gas_station&key=${MY_GOOGLE_API_KEY}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <View>
            <Text onPress={getNearByStations}>Stations</Text>
        </View>
    );
};