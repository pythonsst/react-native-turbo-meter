import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, Text, StyleSheet, Dimensions } from 'react-native';

// Import utility functions
import { calculateDegreeFromLabels } from './utils/calculate-degree-from-labels';
import { calculateLabelFromValue } from './utils/calculate-label-from-value';
import { limitValue } from './utils/limit-value';
import { validateSize } from './utils/validate-size';

const deviceWidth = Dimensions.get('window').width;

type Label = {
  name: string;
  labelColor: string;
  activeBarColor: string;
};

type SpeedometerProps = {
  value: number;
  size?: number;
  minValue?: number;
  maxValue?: number;
  labels?: Label[];
  easeDuration?: number;
  needleImage?: any;
  useNativeDriver?: boolean;
};

const defaultLabels: Label[] = [
  { name: 'Too Slow', labelColor: '#ff2900', activeBarColor: '#ff2900' },
  { name: 'Very Slow', labelColor: '#ff5400', activeBarColor: '#ff5400' },
  { name: 'Slow', labelColor: '#f4ab44', activeBarColor: '#f4ab44' },
  { name: 'Normal', labelColor: '#f2cf1f', activeBarColor: '#f2cf1f' },
  { name: 'Fast', labelColor: '#14eb6e', activeBarColor: '#14eb6e' },
  { name: 'Unbelievably Fast', labelColor: '#00ff6b', activeBarColor: '#00ff6b' },
];

const Speedometer: React.FC<SpeedometerProps> = ({
  value,
  size = deviceWidth - 20,
  minValue = 0,
  maxValue = 100,
  labels = defaultLabels,
  easeDuration = 500,
  needleImage = require('./images/speedometer-needle.png'),
  useNativeDriver = true,
}) => {
  const limitedValue = limitValue(value, minValue, maxValue, 0);
  const validatedSize = validateSize(size, deviceWidth - 20);
  const perLevelDegree = calculateDegreeFromLabels(180, labels);
  const label = calculateLabelFromValue(limitedValue, labels, minValue, maxValue);

  const rotation = useRef(new Animated.Value((limitedValue / maxValue) * 180 - 90)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: (limitedValue / maxValue) * 180 - 90,
      duration: easeDuration,
      easing: Easing.linear,
      useNativeDriver,
    }).start();
  }, [limitedValue, maxValue, easeDuration, useNativeDriver]);

  return (
    <View style={[styles.container, { width: validatedSize, height: validatedSize / 2 }]}>
      {/* Background Color Segments */}
      <View style={[styles.outerCircle, { width: validatedSize, height: validatedSize / 2 }]}>
        {labels.map((level, index) => {
          const circleDegree = 90 + index * perLevelDegree;
          return (
            <View
              key={level.name}
              style={[
                styles.halfCircle,
                {
                  backgroundColor: level.activeBarColor,
                  width: validatedSize / 2,
                  height: validatedSize,
                  borderRadius: validatedSize / 2,
                  transform: [
                    { translateX: validatedSize / 4 },
                    { rotate: `${circleDegree}deg` },
                    { translateX: -(validatedSize / 4) },
                  ],
                },
              ]}
            />
          );
        })}
      </View>

      {/* Needle */}
      <Animated.Image
        source={needleImage}
        style={[
          styles.needle,
          {
            width: validatedSize * 0.1,
            height: validatedSize * 0.4,
            top: validatedSize * 0.1,
            left: validatedSize * 0.45,
            transform: [{ rotate: rotation.interpolate({ inputRange: [-90, 90], outputRange: ['-90deg', '90deg'] }) }],
          },
        ]}
        resizeMode="contain"
      />

      {/* Inner Circle */}
      <View style={[styles.innerCircle, { width: validatedSize * 0.6, height: (validatedSize / 2) * 0.6 }]} />

      {/* Value & Label */}
      <View style={styles.labelWrapper}>
        <Text style={styles.valueText}>{limitedValue}</Text>
        <Text style={[styles.label, { color: label.labelColor }]}>{label.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  outerCircle: {
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 9999,
    borderTopRightRadius: 9999,
    overflow: 'hidden',
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
  },
  needle: {
    position: 'absolute',
  },
  innerCircle: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 9999,
    borderTopRightRadius: 9999,
    backgroundColor: '#FFF',
  },
  labelWrapper: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Speedometer;
