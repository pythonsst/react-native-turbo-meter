import { Text, View, StyleSheet } from 'react-native';
import TurboMeter from 'react-native-turbo-meter'; // Ensure this is the correct import

export default function App() {
  return (
    <View style={styles.container}>
      <TurboMeter
        value={50}
        minValue={0}
        maxValue={100}
        labels={[
          { name: 'Weak', labelColor: '#ff0000', activeBarColor: '#ff0000' },
          { name: 'Strong', labelColor: '#00ff00', activeBarColor: '#00ff00' },
        ]}
        needleImage={undefined}
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
