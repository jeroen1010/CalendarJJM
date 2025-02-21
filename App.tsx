import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ListaBotones from './src/components/buttonDay';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import FormularioTarea from './src/screens/formularioTarea';
import { createStackNavigator } from '@react-navigation/stack';
import Calendario from './src/components/buttonDay';

export type RootStackParamList = {
  Calendario: undefined;
  FormularioTarea: { day: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calendario">
        <Stack.Screen name="Calendario" component={Calendario} />
        <Stack.Screen name="FormularioTarea" component={FormularioTarea} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
