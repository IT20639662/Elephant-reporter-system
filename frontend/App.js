import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import HomeScreen from './components/Home';
import CreatePost from './components/CreatePost';
import ViewCategories from './components/ViewCategories';
import Profile from './components/Profile';
import LoginScreen from './components/Login';
import ViewAllPosts from './components/ViewAllPosts';
import ViewPost from './components/ViewPost';
import ViewCategoriesClient from './components/ViewCategoriesClient';
import ViewAllPostsClient from './components/ViewAllPostsClient';
import ViewPostClient from './components/ViewPostClient';
import RegistrationScreen from './components/Registration';
import ReportPosts from './components/ReportPosts';
import UpdatePost from './components/UpdatePost';
import SplashScreen from './components/SplashScreen';
import UpdateProfile from './components/UpdateProfile';
import Prediction from './components/prediction';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = (loggedInUserId) => {
    setIsLoggedIn(true);
    setUserId(loggedInUserId);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  const ProfileScreen = () => (
    <Profile userId={userId} onLogout={handleLogout} />
  );

  const CategoryNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="View My Posts"
        component={ViewCategories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View My All Posts"
        component={ViewAllPosts}
        options={{ tabBarLabel: 'All Posts' }}
      />
      <Stack.Screen
        name="View My Post"
        component={ViewPost}
        options={{ tabBarLabel: 'View Post' }}
      />
      <Stack.Screen
        name="Update My Post"
        component={UpdatePost}
        options={{ tabBarLabel: 'Update Post' }}
      />
    </Stack.Navigator>
  );

  const CategoryNavigatorClient = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="View Posts"
        component={ViewCategoriesClient}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View All Posts"
        component={ViewAllPostsClient}
        options={{ tabBarLabel: 'All Posts' }}
      />
      <Stack.Screen
        name="View Post"
        component={ViewPostClient}
        options={{ tabBarLabel: 'View Post' }}
      />
      <Stack.Screen
        name="Update Post"
        component={UpdatePost}
        options={{ tabBarLabel: 'Update Post' }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
      
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Create Post') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (
              route.name === 'My Posts' ||
              route.name === 'View My Posts' ||
              route.name === 'View Posts'
            ) {
              iconName = focused ? 'list' : 'list-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            }else if (route.name === 'All Posts') {
              iconName = focused ? 'list' : 'list-circle-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            }else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarLabel: 'Home' }}
          />
       
       

<Tab.Screen
  name="Create Post"
>
  {(props) => <CreatePost {...props} userId={userId} />}
</Tab.Screen>
          <Tab.Screen
            name="My Posts"
            component={CategoryNavigator}
            options={{ tabBarLabel: 'My Posts' }}
          />
          <Tab.Screen
            name="All Posts"
            component={CategoryNavigatorClient}
            options={{ tabBarLabel: 'All Posts' }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ tabBarLabel: 'Profile' }}
          />
         
         <Tab.Screen
            name="Risk Prediction"
            component={Prediction}
            options={{ tabBarLabel: 'Risk Prediction' }}
          />

        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
  name="Login"
  options={{ headerShown: false }}
>
  {(props) => <LoginScreen {...props} navigation={props.navigation} onLogin={handleLogin}/>}
</Stack.Screen>
<Stack.Screen
  name="Registration"
  options={{ headerShown: false }}
>
  {(props) => <RegistrationScreen {...props} navigation={props.navigation} />}
</Stack.Screen>
<Stack.Screen
  name="Home"
>
  {(props) => <HomeScreen {...props} navigation={props.navigation} />}
</Stack.Screen>
<Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{ headerShown: false }}
        />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  logoutButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;