# React Native Turbo Meter

[![npm version](https://badge.fury.io/js/react-native-turbo-meter.svg)](https://badge.fury.io/js/react-native-turbo-meter)
[![npm downloads](https://img.shields.io/npm/dt/react-native-turbo-meter.svg)](https://www.npmjs.com/package/react-native-turbo-meter)

A highly customizable and easy-to-use speedometer component for React Native. Perfect for integrating stylish speedometers or gauges into your app.

## Features

- Simple, customizable speedometer display.
- Supports dynamic value changes.
- Customizable ring color, needle color, size, and more.
- Easy integration with your React Native projects.

## Installation

To install this package, run:

```bash
npm install react-native-turbo-meter --save
```

or if you're using yarn:

```bash
yarn add react-native-turbo-meter
```

## Usage

### Basic Usage

You can easily add the Turbo Meter component to your project like this:

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import TurboMeter from 'react-native-turbo-meter';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Turbo Meter Demo</Text>
      <TurboMeter value={75} />
    </View>
  );
};

export default App;
```

### Customization

The `TurboMeter` component is highly customizable to match the needs of your design. You can adjust the following props to control its appearance:

#### Props

| Prop             | Type                | Default     | Description                                  |
|------------------|---------------------|-------------|----------------------------------------------|
| `value`          | `number`            | `0`         | The current value of the speedometer (0 to 100). |
| `max`            | `number`            | `100`       | Maximum value for the speedometer. |
| `size`           | `number`            | `200`       | The size of the speedometer. |
| `width`          | `number`            | `15`        | Width of the speedometer ring. |
| `ringColor`      | `string`            | `#00ff00`   | Color of the speedometer ring. |
| `needleColor`    | `string`            | `#ff0000`   | Color of the needle. |
| `backgroundColor`| `string`            | `#ffffff`   | Background color of the speedometer. |
| `fontSize`       | `number`            | `30`        | Font size for the label in the center. |

#### Example of Customization

```jsx
<TurboMeter
  value={60}
  max={120}
  size={250}
  width={20}
  ringColor="#3498db"
  needleColor="#e74c3c"
  backgroundColor="#ecf0f1"
  fontSize={40}
/>
```

## API

### `value`
- **Type**: `number`
- **Default**: `0`
- **Description**: Sets the current value of the speedometer (range 0 to `max`).

### `max`
- **Type**: `number`
- **Default**: `100`
- **Description**: The maximum value of the speedometer, used to scale the needle.

### `size`
- **Type**: `number`
- **Default**: `200`
- **Description**: Controls the overall size of the speedometer (in pixels).

### `width`
- **Type**: `number`
- **Default**: `15`
- **Description**: The width of the speedometer ring.

### `ringColor`
- **Type**: `string`
- **Default**: `#00ff00`
- **Description**: The color of the outer ring (use any valid CSS color).

### `needleColor`
- **Type**: `string`
- **Default**: `#ff0000`
- **Description**: The color of the needle.

### `backgroundColor`
- **Type**: `string`
- **Default**: `#ffffff`
- **Description**: The background color of the speedometer area.

### `fontSize`
- **Type**: `number`
- **Default**: `30`
- **Description**: The font size of the center value displayed.

## Contributing

We welcome contributions to **react-native-turbo-meter**! If you'd like to help improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request with a detailed description of your changes.

## License

MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- Special thanks to the creators and contributors of `react-native-turbo-meter` for making this project possible.
- Inspired by other great React Native UI components.

