import { Text, View, StyleSheet } from 'react-native';
import Speedometer from 'react-native-turbo-meter';


export default function App() {
  return (
    <View style={styles.container}>
      <Speedometer
        value={75}
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
