// SplashScreen.js
import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to the Login screen after splash
    }, 3000); // 3000 milliseconds (3 seconds) delay for the splash screen

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
    source={require('../assets/image.png')} // Assuming your image is in the assets folder
    style={styles.logo}
    resizeMode="contain"
  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Background color for the splash screen
  },
  image: {
    width: '80%', // Adjust the width as needed
    height: '80%', // Adjust the height as needed
  },
});

export default SplashScreen;