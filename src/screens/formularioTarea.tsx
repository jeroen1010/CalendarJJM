import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type FormularioTareaRouteProp = RouteProp<RootStackParamList, 'FormularioTarea'>;

const FormularioTarea = ({ route }: { route: FormularioTareaRouteProp }) => {
  const { day } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario para el día {day}</Text>
      {/* Aquí puedes agregar tu formulario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FormularioTarea;
