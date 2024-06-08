import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

export default function ViewAllPosts({ route }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { category } = route.params;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          fetchPosts(storedUserId);
        } else {
          console.error('User ID not found in AsyncStorage');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  const fetchPosts = async (userId) => {
    try {
      const response = await axios.get(`http://172.28.23.130:3000/api/posts?userId=${userId}`);
      const filteredPosts = response.data.filter(post => post.category === category);
      const postsWithLocation = await Promise.all(filteredPosts.map(async (post) => {
        const { latitude, longitude } = post.location;
        const address = await fetchAddressFromCoordinates(latitude, longitude);
        return { ...post, address };
      }));
      setPosts(postsWithLocation);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        return 'Location not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Error fetching address';
    }
  };

  const handleViewPost = (post) => {
    navigation.navigate('View My Post', { post });
  };

  const handleUpdatePost = (postId) => {
    const postToUpdate = posts.find(post => post._id === postId);
    navigation.navigate('Update My Post', { post: postToUpdate });
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://172.28.23.130:3000/api/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const renderRightActions = (postId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDeletePost(postId)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item._id)}>
      <TouchableOpacity style={[styles.postContainer, { width: windowWidth - 40 }]} onPress={() => handleViewPost(item)}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postCategory}>{item.category}</Text>
        <Text style={styles.postDescription}>{item.description}</Text>
        <TouchableOpacity onPress={() => handleUpdatePost(item._id)} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update Post</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );

  const refreshPosts = () => {
    setLoading(true);
    fetchPosts(userId);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={refreshPosts}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  postContainer: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  postCategory: {
    fontStyle: 'italic',
    marginBottom: 5,
    color: '#3498db',
  },
  postAddress: {
    marginBottom: 5,
    color: '#555',
  },
  postDescription: {
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});