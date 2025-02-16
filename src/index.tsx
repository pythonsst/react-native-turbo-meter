/* eslint import/no-unresolved: [2, { ignore: ['react-native', 'react'] }] */
/* eslint radix: ["error", "as-needed"] */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  Easing,
  Text,
  type StyleProp,
  type ViewStyle,
  type ImageStyle,
  type TextStyle,
} from 'react-native';
import PropTypes from 'prop-types';

// Utils
import {calculateDegreeFromLabels} from './utils/calculate-degree-from-labels';
import {calculateLabelFromValue} from './utils/calculate-label-from-value';
import {limitValue} from './utils/limit-value';
import {validateSize} from './utils/validate-size';

// Style
import style, { width as deviceWidth } from './style';

export interface Label {
  name: string;
  labelColor: string;
  activeBarColor: string;
}

export interface SpeedometerProps {
  value: number;
  defaultValue?: number;
  size?: number;
  minValue?: number;
  maxValue?: number;
  easeDuration?: number;
  allowedDecimals?: number;
  labels?: Label[];
  needleImage?: any; // For stricter typing, consider using ImageSourcePropType from 'react-native'
  wrapperStyle?: StyleProp<ViewStyle>;
  outerCircleStyle?: StyleProp<ViewStyle>;
  halfCircleStyle?: StyleProp<ViewStyle>;
  imageWrapperStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  innerCircleStyle?: StyleProp<ViewStyle>;
  labelWrapperStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  labelNoteStyle?: StyleProp<TextStyle>;
  useNativeDriver?: boolean;
}

const Speedometer: React.FC<SpeedometerProps> = ({
  value,
  defaultValue = 50,
  size,
  minValue = 0,
  maxValue = 100,
  easeDuration = 500,
  allowedDecimals = 0,
  labels = [
    {
      name: 'Pathetically weak',
      labelColor: '#ff2900',
      activeBarColor: '#ff2900',
    },
    {
      name: 'Very weak',
      labelColor: '#ff5400',
      activeBarColor: '#ff5400',
    },
    {
      name: 'So-so',
      labelColor: '#f4ab44',
      activeBarColor: '#f4ab44',
    },
    {
      name: 'Fair',
      labelColor: '#f2cf1f',
      activeBarColor: '#f2cf1f',
    },
    {
      name: 'Strong',
      labelColor: '#14eb6e',
      activeBarColor: '#14eb6e',
    },
    {
      name: 'Unbelievably strong',
      labelColor: '#00ff6b',
      activeBarColor: '#00ff6b',
    },
  ],
  needleImage = require('./images/needle.png'),
  wrapperStyle = {},
  outerCircleStyle = {},
  halfCircleStyle = {},
  imageWrapperStyle = {},
  imageStyle = {},
  innerCircleStyle = {},
  labelWrapperStyle = {},
  labelStyle = {},
  labelNoteStyle = {},
  useNativeDriver = true,
}) => {
  // Create an Animated.Value reference
  const speedometerValue = useRef(new Animated.Value(defaultValue)).current;

  // Compute the current value and label based on the provided value
  const currentValue = limitValue(value, minValue, maxValue, allowedDecimals);
  const labelResult = calculateLabelFromValue(currentValue, labels, minValue, maxValue);
  const degree = 180;
  const perLevelDegree = calculateDegreeFromLabels(degree, labels);

  // Trigger animation when the value changes
  useEffect(() => {
    Animated.timing(speedometerValue, {
      toValue: currentValue,
      duration: easeDuration,
      easing: Easing.linear,
      useNativeDriver,
    }).start();
  }, [currentValue, easeDuration, useNativeDriver, speedometerValue]);

  // Interpolate the animated value to get the rotation string
  const rotate = speedometerValue.interpolate({
    inputRange: [minValue, maxValue],
    outputRange: ['-90deg', '90deg'],
  });

  // Determine the current size for the gauge
  const currentSize = validateSize(size, Number(deviceWidth) - 40);

  return (
    <View style={[style.wrapper, { width: currentSize, height: currentSize / 2 }, wrapperStyle]}>
      <View
        style={[
          style.outerCircle,
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
                style.halfCircle,
                {
                  backgroundColor: level.activeBarColor,
                  width: currentSize / 2,
                  height: currentSize,
                  borderRadius: currentSize / 2,
                  transform: [
                    { translateX: currentSize / 4 },
                    { rotate: `${circleDegree}deg` },
                    { translateX: -(currentSize / 4) },
                  ],
                },
                halfCircleStyle,
              ]}
            />
          );
        })}
        <Animated.View
          style={[
            style.imageWrapper,
            { top: -(currentSize / 15), transform: [{ rotate }] },
            imageWrapperStyle,
          ]}
        >
          <Image
            style={[
              style.image,
              { width: currentSize, height: currentSize },
              imageStyle,
            ]}
            source={needleImage}
          />
        </Animated.View>
        <View
          style={[
            style.innerCircle,
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
      <View style={[style.labelWrapper, labelWrapperStyle]}>
        <Text style={[style.label, labelStyle]}>
          {currentValue}
        </Text>
        <Text style={[style.labelNote, { color: labelResult.labelColor }, labelNoteStyle]}>
          {labelResult.name}
        </Text>
      </View>
    </View>
  );
};

Speedometer.propTypes = {
  value: PropTypes.number.isRequired,
  defaultValue: PropTypes.number,
  size: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  easeDuration: PropTypes.number,
  allowedDecimals: PropTypes.number,
  labels: PropTypes.array,
  needleImage: PropTypes.any,
  wrapperStyle: PropTypes.object,
  outerCircleStyle: PropTypes.object,
  halfCircleStyle: PropTypes.object,
  imageWrapperStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  innerCircleStyle: PropTypes.object,
  labelWrapperStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  labelNoteStyle: PropTypes.object,
  useNativeDriver: PropTypes.bool,
};

export default Speedometer;
