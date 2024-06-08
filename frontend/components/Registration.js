import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper'; // Import Card from react-native-paper

export default function RegistrationScreen({ navigation, route }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [cnumber, setCNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://172.28.23.130:3000/api/users/register', {
        username,
        email,
        city,
        cnumber,
        password,
      });
      console.log('Registration response:', response.data);
      navigation.navigate('Login'); // Navigate to the Login screen after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        if (errorMessage === 'User already exists') {
          Alert.alert('Error', 'User already exists. Please choose a different username or email.');
        } else {
          Alert.alert('Error', 'Registration failed. Please try again later.');
        }
      } else {
        Alert.alert('Error', 'An unknown error occurred. Please try again later.');
      }
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (route.params?.fromLogin) {
      Alert.alert('Error', 'Sign Up failed. Please try again from the Login screen.');
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Registration</Text>
        <Image
    source={require('../assets/image.png')} // Assuming your image is in the assets folder
    style={styles.logo}
    resizeMode="contain"
  />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={cnumber}
          onChangeText={setCNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  card: {
    width: '90%',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    backgroundColor: '#fff', // Add background color to the card
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#424242',
    textAlign: 'center', // Center the title text
  },
  logo: {
    width: '100%',
    height: 150, // Adjust the height of the image as needed
    marginBottom: 20, // Add space between the image and inputs
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#1976D2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, // Add space between the button and the text
  },
  signInText: {
    color: '#1976D2',
    fontSize: 16,
  },
});