import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';


// Obtiene la cantidad de días en un mes considerando los años bisiestos (Gracias a la clase react "Date")
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

//Obtiene el día de la semana (posición en la que está) en la que empieza el mes
const getStartDayOffset = (month: number, year: number) => {
  let startDay = new Date(year, month, 1).getDay(); // 0 = Domingo, 6 = Sábado
  return startDay === 0 ? 6 : startDay - 1; // Ajusto para que Lunes sea el primer día
};

// Nombres de los meses
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

//Array de los días de la semana
const weekDays = ['L', 'M', "X", "J", "V", "S", "D"];

//Los días se adaptan al tamaño de la pantalla con el Dimensions,
//guardamos el tamño de la pantalla y dividimos la longitud del array dias entre el tamaño total.
const screenWidth = Dimensions.get('window').width;
const dayWidth = screenWidth / weekDays.length;

// Componente ButtonDay reutilizable
const ButtonDay = ({ dayNumber }: { dayNumber: number }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('FormularioTarea', { day: dayNumber })}
    >
      <Text style={styles.buttonText}>{dayNumber}</Text>
    </TouchableOpacity>
  );
};


/* Componente principal, para obtener la fecha actual necesito estados.
Creo una variable currentDate con un objeto Date, guardo el mes y el año */

const Calendario = () => {
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  // Obtiene la cantidad correcta de días en el mes
  const daysInMonth = getDaysInMonth(month, year);
  const startDayOffset = getStartDayOffset(month, year);
  const data = [
    ...Array(startDayOffset).fill(null), // Espacios vacíos
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1), // Días del mes
  ];
  


  // Cambiar de mes
  const changeMonth = (increment: number) => {
    let newMonth = month + increment;
    let newYear = year;

    //Si el mes es inferior a cero cambia de año y pasa al mes 12 de nuevo (posición 11 del array, es decir, Diciembre)
    //en caso contario (mes mayor que 11) se pasa al año siguiente y el array mes empieza en la posición cero (enero)
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  return (
    <View style={styles.container}>
      {/* Controles del mes */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.arrow}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{`${months[month]} ${year}`}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.arrow}>
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {weekDays.map((day, index) => (
          <View key={index} style={{ width: dayWidth, alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>{day}</Text>
          </View>
        ))}
      </View>
  

      {/* Renderizar días con espacios vacíos */}
      <FlatList
        data={data}
        renderItem={({ item }) =>
          item === null ? <View style={styles.emptySpace} /> : <ButtonDay dayNumber={item} />
        }
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        columnWrapperStyle={styles.row}
        ListFooterComponent={<View style={styles.footerSpace} />}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  arrow: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'gray',
    width: Dimensions.get('window').width / 8,
    height: Dimensions.get('window').width / 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    justifyContent: 'flex-start',
  },
  footerSpace: {
    height: Dimensions.get('window').width / 8,
  },
  // Estilo para los espacios vacíos 
  emptySpace: {
    width: Dimensions.get('window').width / 8,
    height: Dimensions.get('window').width / 8,
    margin: 4,
  }
  
});

export default Calendario;
