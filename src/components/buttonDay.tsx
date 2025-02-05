import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';

// Componente ButtonDay reutilizable
const ButtonDay = ({ dayNumber }: { dayNumber: number }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => Alert.alert(`Has pulsado el día ${dayNumber}`)}
    >
      <Text style={styles.buttonText}>{dayNumber}</Text>
    </TouchableOpacity>
  );
};

// Componente principal que usa FlatList
const ListaBotones = () => {
  // Generamos una lista de 30 días (números del 1 al 30)
  const data = Array.from({ length: 30 }, (_, index) => index + 1);

  // Renderizamos cada ButtonDay
  const renderItem = ({ item }: { item: number }) => (
    <ButtonDay dayNumber={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        numColumns={7} // Esto hace que haya 7 botones por fila
        columnWrapperStyle={styles.row} // Estilo para la fila
        ListFooterComponent={<View style={styles.footerSpace} />} // Espacio al final
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 10, // Añadido padding inferior para evitar que los botones se corten
  },
  button: {
    backgroundColor: 'gray', // Color gris para el botón
    width: Dimensions.get('window').width / 8, // Usamos el ancho de la pantalla para calcular el tamaño del botón
    margin: 4, // Espacio entre botones
    height: Dimensions.get('window').width / 8, // Altura del botón igual al ancho (cuadrados)
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18, // Tamaño más pequeño para el número (ajustamos el tamaño)
    fontWeight: 'bold', // Hace el número en negrita
    color: 'white', // Color blanco para el texto
  },
  row: {
    justifyContent: 'flex-start', // Asegura que los botones estén distribuidos uniformemente
  },
  footerSpace: {
    // Esto agrega espacio vacío en la parte inferior para asegurar que no se corten los botones
    height: Dimensions.get('window').width / 8,
  },
});

export default ListaBotones;
