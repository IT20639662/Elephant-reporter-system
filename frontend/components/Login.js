import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log('Login component props:', navigation);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://172.28.23.130:3000/api/users/login', {
        email,
        password,
      });
      console.log('Login response:', response.data);
      if (response.data && response.data.userId) {
        const userId = response.data.userId;
        // Save the user ID in local storage
        await AsyncStorage.setItem('userId', userId);
        // Handle successful login (e.g., call onLogin function)
        onLogin(userId);
        console.log('UserId:', userId);
      } else {
        throw new Error('User ID is undefined');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Registration');
  };  

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
        </View>
        <Card.Content>
        <Image
    source={require('../assets/image.png')} // Assuming your image is in the assets folder
    style={styles.logo}
    resizeMode="contain"
  />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </Card.Content>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#424242',
  },
  logo: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#1976D2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#1976D2',
    fontSize: 16,
  },
});