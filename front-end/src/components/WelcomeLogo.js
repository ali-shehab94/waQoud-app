import { StyleSheet, Text, View, Image } from 'react-native';

export const WelcomeLogo = () => {
    return <Image source={require('../../assets/logos/logo-main.png')} style={styles.mainLogo} />;
};

const styles = StyleSheet.create({
    mainLogo: {
        width: 340,
        height: 340,
        resizeMode: 'contain',
        borderRadius: 10,
    },
});
