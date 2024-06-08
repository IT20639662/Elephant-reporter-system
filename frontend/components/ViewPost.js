import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';

export default function ViewPost({ route, navigation }) {
  const { post } = route.params;
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      navigation.navigate('ViewAllPosts');
    }
  }, [deleted]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Post not found or deleted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{post.title}</Text>
        {/* {post.image && (
          <Image
            source={{ uri: post.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )} */}
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.4dDscWL3QFxstTqQ6Sq2QQHaLH?rs=1&pid=ImgDetMain' }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <Text style={styles.category}>{post.category}</Text>
        <Text style={styles.description}>{post.time}</Text>
        <Text style={styles.description}>{post.venue}</Text>
        <Text style={styles.description}>{post.weather}</Text>
        <Text style={styles.description}>{post.description}</Text>
        {/* <Text style={styles.location}>
          Location: {post.location.type} - Coordinates: {post.location.coordinates.join(', ')}
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  category: {
    fontStyle: 'italic',
    marginBottom: 5,
    color: '#3498db',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center', // Center the text horizontally
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center', // Center the text horizontally
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});