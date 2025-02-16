/* eslint import/no-unresolved: [2, { ignore: ['react-native', 'react'] }] */
/* eslint radix: ["error", "as-needed"] */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  Easing,
  Text,
  Dimensions,
} from 'react-native';

// Utils
import { calculateDegreeFromLabels } from './utils/calculate-degree-from-labels';
import { calculateLabelFromValue } from './utils/calculate-label-from-value';
import { limitValue } from './utils/limit-value';
import { validateSize } from './utils/validate-size';

// Style
import styles from './style';

const deviceWidth = Dimensions.get('window').width;

type SpeedometerLabel = {
  name: string;
  labelColor: string;
  activeBarColor: string;
};

interface SpeedometerProps {
  value: number;
  defaultValue?: number;
  size?: number;
  minValue?: number;
  maxValue?: number;
  easeDuration?: number;
  allowedDecimals?: number;
  labels?: SpeedometerLabel[];
  needleImage: any;
  wrapperStyle?: object;
  outerCircleStyle?: object;
  halfCircleStyle?: object;
  imageWrapperStyle?: object;
  imageStyle?: object;
  innerCircleStyle?: object;
  labelWrapperStyle?: object;
  labelStyle?: object;
  labelNoteStyle?: object;
  useNativeDriver?: boolean;
}

const defaultLabels: SpeedometerLabel[] = [
  { name: 'Weak', labelColor: '#ff0000', activeBarColor: '#ff0000' },
  { name: 'Strong', labelColor: '#00ff00', activeBarColor: '#00ff00' },
];

const Speedometer: React.FC<SpeedometerProps> = ({
  value,
  defaultValue = 50,
  size,
  minValue = 0,
  maxValue = 100,
  easeDuration = 500,
  allowedDecimals = 0,
  labels = defaultLabels,
  needleImage,
  wrapperStyle,
  outerCircleStyle,
  halfCircleStyle,
  imageWrapperStyle,
  imageStyle,
  innerCircleStyle,
  labelWrapperStyle,
  labelStyle,
  labelNoteStyle,
  useNativeDriver = true,
}) => {
  const speedometerValue = useRef(new Animated.Value(defaultValue)).current;

  useEffect(() => {
    Animated.timing(speedometerValue, {
      toValue: limitValue(value, minValue, maxValue, allowedDecimals),
      duration: easeDuration,
      easing: Easing.linear,
      useNativeDriver,
    }).start();
  }, [value, minValue, maxValue, allowedDecimals, easeDuration, useNativeDriver]);

  const degree = 180;
  const perLevelDegree = calculateDegreeFromLabels(degree, labels);
  const limitedValue = limitValue(value, minValue, maxValue, allowedDecimals);
  const label = calculateLabelFromValue(limitedValue, labels, minValue, maxValue);

  const rotate = speedometerValue.interpolate({
    inputRange: [minValue, maxValue],
    outputRange: ['-90deg', '90deg'],
  });

  const currentSize = validateSize(size, deviceWidth - 20);

  return (
    <View
      style={[
        styles.wrapper,
        { width: currentSize, height: currentSize / 2 },
        wrapperStyle,
      ]}
    >
      <View
        style={[
          styles.outerCircle,
          {
            width: currentSize,
            height: currentSize / 2,
            borderTopLeftRadius: currentSize / 2,
            borderTopRightRadius: currentSize / 2,
          },
          outerCircleStyle,
        ]}
      >
        {labels.map((level, index) => {
          const circleDegree = 90 + index * perLevelDegree;
          return (
            <View
              key={level.name}
              style={[
                styles.halfCircle,
                {
                  backgroundColor: level.activeBarColor,
                  width: currentSize / 2,
                  height: currentSize,
                  borderRadius: currentSize / 2,
                  transform: [
                    { translateX: currentSize / 4 },
                    { rotate: `${circleDegree}deg` },
                    { translateX: -currentSize / 4 },
                  ],
                },
                halfCircleStyle,
              ]}
            />
          );
        })}
        <Animated.View
          style={[
            styles.imageWrapper,
            { top: -(currentSize / 15), transform: [{ rotate }] },
            imageWrapperStyle,
          ]}
        >
          <Image
            style={[
              styles.image,
              { width: currentSize, height: currentSize },
              imageStyle,
            ]}
            source={needleImage}
          />
        </Animated.View>
        <View
          style={[
            styles.innerCircle,
            {
              width: currentSize * 0.6,
              height: (currentSize / 2) * 0.6,
              borderTopLeftRadius: currentSize / 2,
              borderTopRightRadius: currentSize / 2,
            },
            innerCircleStyle,
          ]}
        />
      </View>
      <View style={[styles.labelWrapper, labelWrapperStyle]}>
        <Text style={[styles.label, labelStyle]}>{limitedValue}</Text>
        <Text
          style={[
            styles.labelNote,
            { color: label.labelColor },
            labelNoteStyle,
          ]}
        >
          {label.name}
        </Text>
      </View>
    </View>
  );
};

export default Speedometer;
