import { View, Text, Button } from 'react-native';
import React from 'react';
import Calendario from '../components/buttonDay';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
      <Calendario /> 
  )
}

export default HomeScreen