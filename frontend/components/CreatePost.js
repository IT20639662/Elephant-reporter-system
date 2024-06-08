import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from expo-image-picker
import axios from 'axios';
import { Camera } from 'expo-camera';

export default function CreatePost({ navigation, route, userId }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  const [venue, setVenue] = useState('');
  const [weather, setWeather] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null); // State to store captured image URI
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    checkPermissions();
    getLocation();
  }, []);

  const checkPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Camera permission denied', 'Please grant camera access to take photos.');
      return;
    }
    setCameraPermission(true);
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission denied', 'Please enable location access to continue.');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleImagePick = async () => {
    try {
      if (!cameraPermission) {
        Alert.alert('Camera permission denied', 'Please grant camera access to take photos.');
        return;
      }
  
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.error('Image pick error:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };  

  const handlePost = async () => {
    try {
      if (!category) {
        Alert.alert('Error', 'Please select a category.');
        return;
      }

      setLoading(true);

      const postData = {
        title,
        category,
        date,
        time,
        venue,
        weather,
        description,
        location: location ? { latitude: location.coords.latitude, longitude: location.coords.longitude } : null,
        userId,
        image
      };

      // Check if userId exists in route params
      if (!userId) {
        console.error('User ID is undefined');
        Alert.alert('Error', 'User ID is missing. Please log in again.');
        setLoading(false);
        return;
      }

      postData.userId = userId;

      const response = await axios.post('http://172.28.23.130:3000/api/posts', postData);
      console.log('Post response:', response.data);
      setLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Post error:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to create post. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.4dDscWL3QFxstTqQ6Sq2QQHaLH?rs=1&pid=ImgDetMain' }}
          style={styles.image}
          resizeMode="cover"
        />
        {image && <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />}
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
          <Text style={styles.imageButtonText}>Take Photo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <Picker
          selectedValue={category}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
          <Picker.Item label="Select Category" value="category" />
          <Picker.Item label="Peaceful Elephant Presence" value="Peaceful" />
          <Picker.Item label="Elephant-Human Conflicts" value="Conflicts" />
          <Picker.Item label="Injured Elephants" value="Injured" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={time}
          onChangeText={setTime}
        />
        <TextInput
          style={styles.input}
          placeholder="Venue"
          value={venue}
          onChangeText={setVenue}
        />
        <TextInput
          style={styles.input}
          placeholder="Weather"
          value={weather}
          onChangeText={setWeather}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.button} onPress={handlePost}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Create Post</Text>
          )}
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
    backgroundColor: '#F8F9FA', // Light background color
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF', // White card background
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow radius for iOS
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    borderRadius: 5,
  },
  imageButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#1976D2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#1976D2', // Blue color for button
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});