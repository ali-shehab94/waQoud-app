import { StyleSheet, Text, View, Image } from 'react-native';

export const WelcomeLogo = () => {
    return <Image source={require('../../assets/logos/logo-main.png')} style={styles.mainLogo} />;
};

const styles = StyleSheet.create({
    mainLogo: {
        borderWidth: 2,
        width: 308,
        height: 308,
        resizeMode: 'contain',
    },
});
