import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

const categories = [
  { name: 'Peaceful', imageUri: 'https://th.bing.com/th/id/R.921a2f9209c6f7be7a578a36097a8fc0?rik=ygEHd64LDE678w&pid=ImgRaw&r=0' },
  { name: 'Conflicts', imageUri: 'https://th.bing.com/th/id/OIP.gS6fy4YvjypJvdR0zV99iwHaEo?w=480&h=300&rs=1&pid=ImgDetMain' },
  { name: 'Injured', imageUri: 'https://th.bing.com/th/id/OIP.mk0c7e7kUNP_Dd2au0oFeQHaEK?rs=1&pid=ImgDetMain' },
];

export default function ViewCategoriesClient({ navigation, route }) {
  const { userId } = route.params || {}; // Set userId to an empty object if route.params is undefined

  const handleCategorySelection = (category) => {
    navigation.navigate('View All Posts', { userId, category });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Categories</Text>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryCard}
          onPress={() => handleCategorySelection(category.name)}>
          <Image source={{ uri: category.imageUri }} style={styles.categoryImage} />
          <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
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
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
});