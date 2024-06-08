import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios'; // Import axios for HTTP requests

const UpdatePost = ({ navigation, route }) => {
  const { post } = route.params;

  const [updatedPostData, setUpdatedPostData] = useState({
    title: post.title,
    category: post.category,
    time: post.time,
    venue: post.venue,
    weather: post.weather,
    description: post.description,
  });

  const handleUpdate = async () => {
    try {
      console.log('Updating post with ID:', post._id);
      const updatedPost = await axios.put(`http://172.28.23.130:3000/api/posts/${post._id}`, updatedPostData);

      console.log('Updated post response:', updatedPost.data);
      // Navigate back to the previous screen after successful update
      navigation.goBack();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Post</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}>
        <View style={styles.card}>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.4dDscWL3QFxstTqQ6Sq2QQHaLH?rs=1&pid=ImgDetMain' }}
          style={styles.image}
          resizeMode="cover"
        />
          <TextInput
            style={styles.input}
            value={updatedPostData.title}
            onChangeText={(text) => setUpdatedPostData({ ...updatedPostData, title: text })}
            placeholder="Title"
          />
          {/* Add Picker here for category */}
          <TextInput
            style={styles.input}
            value={updatedPostData.time}
            onChangeText={(text) => setUpdatedPostData({ ...updatedPostData, time: text })}
            placeholder="Time"
          />
          <TextInput
            style={styles.input}
            value={updatedPostData.venue}
            onChangeText={(text) => setUpdatedPostData({ ...updatedPostData, venue: text })}
            placeholder="Venue"
          />
          <TextInput
            style={styles.input}
            value={updatedPostData.weather}
            onChangeText={(text) => setUpdatedPostData({ ...updatedPostData, weather: text })}
            placeholder="Weather"
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={updatedPostData.description}
            onChangeText={(text) => setUpdatedPostData({ ...updatedPostData, description: text })}
            placeholder="Description"
            multiline
            numberOfLines={4}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
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
    backgroundColor: '#F8F9FA', // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50', // Dark text color
  },
  scrollView: {
    width: '100%', // Full width for ScrollView
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff', // White card background
    padding: 20,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow radius for iOS
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100, // Adjust height for description input
    textAlignVertical: 'top', // Vertical alignment for multiline input
  },
  updateButton: {
    backgroundColor: '#3498db', // Blue color for button
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButtonText: {
    color: '#fff', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UpdatePost;