import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { PDFDocument, PDFText } from 'react-native-pdf-lib';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system'; // Import StorageAccessFramework

const ReportPosts = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get('http://172.28.23.130:3000/api/posts/getall');
      if (response.data && response.data.length > 0) {
        const fetchedPosts = response.data;
        setPosts(fetchedPosts);
      } else {
        throw new Error('No posts found');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to fetch posts. Please try again later.');
    }
  };

  const generatePDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      let y = height - 50;

      PDFText.create('Posts Report', { fontSize: 24, y }).addToPage(page);

      y -= 30;

      posts.forEach((post) => {
        y -= 20;
        PDFText.create(`Title: ${post.title}`, { fontSize: 16, y }).addToPage(page);
        y -= 20;
        PDFText.create(`Category: ${post.category}`, { fontSize: 12, y }).addToPage(page);
        y -= 20;
        PDFText.create(`Time: ${post.time}`, { fontSize: 12, y }).addToPage(page);
        y -= 20;
        PDFText.create(`Venue: ${post.venue}`, { fontSize: 12, y }).addToPage(page);
        y -= 20;
        PDFText.create(`Weather: ${post.weather}`, { fontSize: 12, y }).addToPage(page);
        y -= 20;
        PDFText.create(`Description: ${post.description}`, { fontSize: 12, y }).addToPage(page);
        y -= 20;
        PDFText.create(`Date: ${new Date(post.date).toLocaleDateString()}`, { fontSize: 12, y }).addToPage(page);
        y -= 20;
        PDFText.create('------------------------------------', { fontSize: 12, y }).addToPage(page);
      });

      const pdfBytes = await pdfDoc.save();

      return pdfBytes;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const pdfBytes = await generatePDF();
      const base64Data = Buffer.from(pdfBytes).toString('base64'); // Convert PDF bytes to base64 string
      const fileName = 'posts_report.pdf';

      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        console.log('Permissions not granted');
        return;
      }

      const pdfUri = permissions.directoryUri + '/' + fileName;

      await FileSystem.writeAsStringAsync(pdfUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert('Success', 'PDF report downloaded successfully.');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      Alert.alert('Error', 'Failed to download PDF report.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDownloadPDF} style={styles.button}>
        <Text style={styles.buttonText}>Download PDF Report</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postCategory}>Category: {post.category}</Text>
            <Text style={styles.postTime}>Time: {post.time}</Text>
            <Text style={styles.postVenue}>Venue: {post.venue}</Text>
            <Text style={styles.postWeather}>Weather: {post.weather}</Text>
            <Text style={styles.postDescription}>Description: {post.description}</Text>
            <Text style={styles.postDate}>Date: {new Date(post.date).toLocaleDateString()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
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
  scrollView: {
    width: '100%',
    marginTop: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postCategory: {
    fontSize: 14,
  },
  postTime: {
    fontSize: 14,
  },
  postVenue: {
    fontSize: 14,
  },
  postWeather: {
    fontSize: 14,
  },
  postDescription: {
    fontSize: 14,
  },
  postDate: {
    fontSize: 12,
    marginTop: 5,
    color: 'gray',
  },
});

export default ReportPosts;