import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MyListScreen from '../screens/MyListScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'MyList') {
          iconName = 'list';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="MyList" component={MyListScreen} />
  </Tab.Navigator>
);

// Stack Navigator
const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
