import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';

const categories = [
  { name: 'Peaceful', image: { uri: 'https://dummyimage.com/100x100/0f0/fff&text=Peaceful' } },
  { name: 'Conflicts', image: { uri: 'https://dummyimage.com/100x100/f00/fff&text=Conflicts' } },
  { name: 'Injured', image: { uri: 'https://dummyimage.com/100x100/00f/fff&text=Injured' } },
];

export default function ViewCategories({ navigation, route }) {
  const { userId } = route.params || {}; // Set userId to an empty object if route.params is undefined

  const handleCategorySelection = (category) => {
    navigation.navigate('View My All Posts', { userId, category });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Categories</Text>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryCard}
          onPress={() => handleCategorySelection(category.name)}>
          <Image source={category.image} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8F9FA', // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryCard: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFF', // White card background
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow radius for iOS
    overflow: 'hidden', // Clip content that overflows card boundaries
  },
  categoryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', // Adjust image size to cover the entire card
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
});