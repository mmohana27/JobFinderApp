import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsStackNavigator from './JobsStackNavigator';
import BookmarksScreen from '../screens/BookmarksScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Jobs" component={JobsStackNavigator} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
    </Tab.Navigator>
  );
}
