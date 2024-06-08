import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Alert, FlatList, Image } from 'react-native';
import axios from 'axios';

export default function ViewPostClient({ route, navigation }) {
  const { post } = route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://172.28.23.130:3000/api/comments/${post._id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post('http://172.28.23.130:3000/api/comments', {
        postId: post._id,
        userId: '65f52f0d6351fb2137aa3b38',
        comment: comment,
      });
      console.log('Comment added successfully:', response.data);
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Text>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{post.title}</Text>
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
      </View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.commentList}
      />
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddComment}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    alignItems: 'center',
    marginBottom: 20,
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
    textAlign: 'center',
  },
  commentInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '18%',
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  commentList: {
    flexGrow: 1,
  },
});