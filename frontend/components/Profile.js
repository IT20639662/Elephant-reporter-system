import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Profile = ({ userId, onLogout }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://172.28.23.130:3000/api/users/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', 'Failed to fetch user profile. Please try again.');
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleUpdateProfile = () => {
    navigation.navigate('UpdateProfile', { userId }); // Navigate to UpdateProfile screen with userId
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`http://172.28.23.130:3000/api/users/profile/${userId}`);
      onLogout(); // Call the onLogout function passed from the parent component
    } catch (error) {
      console.error('Error deleting profile:', error);
      Alert.alert('Error', 'Failed to delete profile. Please try again.');
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain' }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>Username: {user.username}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>City: {user.city}</Text>
        <Text style={styles.text}>Contact Number: {user.cnumber}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteProfile}>
        <Text style={styles.buttonText}>Delete Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1', // Light background color
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: 'center', // Center the content horizontally
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333', // Text color
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#3498db', // Blue button background color
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  logoutButton: {
    backgroundColor: 'orange', // Change logout button color
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  }
});

export default Profile;