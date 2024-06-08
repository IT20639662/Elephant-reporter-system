import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation, route }) => {
  const [userId, setUserId] = useState(null);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    getUserIdFromStorage();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPostCount(userId);
    }
  }, [userId]);

  const getUserIdFromStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    } catch (error) {
      console.error('Error retrieving userId from storage:', error);
    }
  };

  const fetchPostCount = async (userId) => {
    try {
      const response = await axios.get(`http://172.28.23.130:3000/api/posts/${userId}/count`);
      setPostCount(response.data.count);
    } catch (error) {
      console.error('Error fetching post count:', error);
    }
  };

  const handleViewCategories = () => {
    navigation.navigate('CategoryNavigatorClient');
  };

  const handleReportPosts = () => {
    navigation.navigate('ReportPosts');
  };

  useEffect(() => {
    if (route.params?.userId) {
      saveUserIdToStorage(route.params.userId);
      setUserId(route.params.userId);
    }
  }, [route.params?.userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPostCount(userId);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
      <Image
    source={require('../assets/image.png')} // Assuming your image is in the assets folder
    style={styles.logo}
    resizeMode="contain"
  />
      <Text style={styles.description}>
      Our app allows users to create detailed posts about elephant encounters and conservation efforts, enabling them to share valuable insights with the community.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>My Posts</Text>
        <Text style={styles.cardContent}>{postCount}</Text>
      </View>
      <View style={styles.card}>
      <Text style={styles.cardTitle}>App features</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add Your Posts</Text>
        <Text style={styles.cardContent}>Add your post with realtime</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>View All Posts</Text>
        <Text style={styles.cardContent}>View all posts width ading comments</Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default HomeScreen;