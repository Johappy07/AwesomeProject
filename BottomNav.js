import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import List from './List';
import Map from './Map';
import Editdata from './Editdata';
import  Profile from './Profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faUser, faMap, faHouse, faUsers, faListUl, faPenToSquare, faCircle} from '@fortawesome/free-solid-svg-icons';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { WebView } from 'react-native-webview';
function HomeScreen() {
  return (
    <Home />
  );
}

function ListScreen() {
  return (
    <List />
  );
}

function EditDataScreen() {
  return (
    <Editdata/>
  );
}
function  ProfileScreen() {
  return (
    < Profile/>
  );
}

function MapScreen() {
  return (
    <Map/>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} 
      options={{ headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faHouse} color={color} size={20} />
        ),}}/>
        <Tab.Screen name="List" component={ListScreen}  options={{ headerShown: true,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faListUl} color={color} size={20} />
        ),}}/>
        <Tab.Screen name="Edit" component={EditDataScreen}  options={{ headerShown: true,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faPenToSquare} color={color} size={20} />
        ),}}/>
      <Tab.Screen name="Map" component={MapScreen}  options={{ 
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faMap} color={color} size={20} />
        ),}}/>
      <Tab.Screen name="Profile" component={ ProfileScreen}  options={{ 
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faUser} color={color} size={20} />
        ),}}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}