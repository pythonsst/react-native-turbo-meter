import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export { width };

export const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
    alignSelf: 'center',
  },
  circleWrapper: {
    overflow: 'hidden',
  },
  outerCircle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    borderColor: '#ffffff',
    backgroundColor: '#e6e6e6',
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  imageWrapper: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
  },
  image: {
    resizeMode: 'stretch' as const, // Ensure correct type
    height: width - 20,
    width: width - 20,
  },
  innerCircle: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: width * 0.6,
    height: (width / 2) * 0.6,
    borderTopLeftRadius: width / 2 - 10,
    borderTopRightRadius: width / 2 - 10,
  },
  labelWrapper: {
    marginVertical: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold' as const,
  },
  labelNote: {
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  imageStyle: {
    resizeMode: 'contain', // Ensures the image maintains its aspect ratio
    position: 'absolute', // Positions the needle correctly
    left: '50%', // Centers it horizontally
    top: '50%', // Centers it vertically
    transform: [{ translateX: -50 }, { translateY: -50 }], // Adjusts positioning
  },
});

export default styles;


