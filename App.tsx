// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ListaBotones from './src/components/buttonDay';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ListaBotones /> {/* Aquí se renderiza el componente */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
