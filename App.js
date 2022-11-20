import { StatusBar } from 'expo-status-bar';
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Historico from './componentes/Historico';
import SearchWeather from './componentes/SearchWeather';

import React from 'react';
import { Text, TabView } from '@rneui/themed';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function App() {

  const [index, setIndex] = React.useState(0);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Pesquisar">
        <Tab.Screen
          name="Pesquisar" 
          component={SearchWeather}/>
        <Tab.Screen
          name="Historico" 
          component={Historico}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});