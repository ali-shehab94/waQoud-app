// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
// import axios from 'axios';
// import { useState, useEffect, useContext } from 'react';
// import { UserContext } from '../../context/UserContext';
// import { MY_GOOGLE_API_KEY } from '../../config/env';

// export const GasStation = (props) => {
//     const [data, setData] = useState();
//     const [user, setUser] = useContext(UserContext);
//     const [userLocation, setUserLocation] = useState({ latitude: user.userLocation.latitude, longitude: user.userLocation.longitude });

//     const getDistance = async (location) => {
//         await axios
//             .get(
//                 `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${location[0]},${location[1]}&origins=${user.userLocation.latitude},${user.userLocation.longitude}&key=${MY_GOOGLE_API_KEY}`
//             )
//             .then((response) => {
//                 console.log(response.data.rows[0].elements[0].distance.value);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//         }
//     return (
//         <View style={{ margin: 5, alignItems: 'center', width: '100%' }}>
//             <TouchableOpacity style={styles.tracker} onPress={() => setUser({ ...user, selectedGasStation: })}>
//                 <View style={styles.trackerTitle}>
//                     <Image source={require('../../assets/logos/3.png')} style={styles.stationImage} />
//                 </View>
//                 <View>
//                     <Text style={styles.stationInfo}>{props.name}</Text>
//                     <Text style={styles.stationInfo}>
//                         {/* {getDistance(props.stationLocation)} */}
//                         away
//                     </Text>
//                 </View>
//             </TouchableOpacity>
//             {/* <Image source={require('../../assets/logos/3.png')} style={styles.stationImage} />
//             <Text
//                 style={styles.stationInfo}
//                 onPress={() => {
//                     console.log('pressed');
//                 }}
//             >
//                 {props.name}
//             </Text>
//             <Text
//                 style={styles.stationInfo}
//                 onPress={() => {
//                     console.log('pressed');
//                 }}
//             >
//                 {props.location}
//             </Text> */}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#E9E9E9',
//     },
//     stationImage: {
//         width: 50,
//         height: 50,
//         borderWidth: 1,
//         borderColor: 'white',
//         borderRadius: 40,
//     },
//     stationInfo: {
//         paddingLeft: '2%',
//         fontSize: 20,
//         width: '100%',
//     },
//     tracker: {
//         backgroundColor: '#D9D9D9',
//         alignSelf: 'center',
//         width: '90%',
//         height: 100,
//         borderRadius: 8,
//         flexDirection: 'row',
//         alignItems: 'center',
//         margin: 5,
//     },
//     trackerTitle: {
//         paddingHorizontal: 20,
//     },
// });
