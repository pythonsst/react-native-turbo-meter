import { Text, View, StyleSheet } from 'react-native';
import Speedometer from 'react-native-turbo-meter';

const defaultLabels = [
  { name: 'Too Slow', labelColor: '#ff2900', activeBarColor: '#ff2900' },
  { name: 'Very Slow', labelColor: '#ff5400', activeBarColor: '#ff5400' },
  { name: 'Slow', labelColor: '#f4ab44', activeBarColor: '#f4ab44' },
  { name: 'Normal', labelColor: '#f2cf1f', activeBarColor: '#f2cf1f' },
  { name: 'Fast', labelColor: '#14eb6e', activeBarColor: '#14eb6e' },
  { name: 'Unbelievably Fast', labelColor: '#00ff6b', activeBarColor: '#00ff6b' },
];


export default function App() {
  return (
    <View style={styles.container}>
      <Speedometer
        value={75}
        minValue={0}
        maxValue={100}
        labels={defaultLabels}
      />

      <Text>React Native Turbo Meter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
