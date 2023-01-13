import {View, StyleSheet} from  'react-native';

const Hand = ({style, value, rotationStep, height, width, color,}) => {
  return (
    <View style={
      [style, {
        transform: [
          // Change the rotating point to the bottom point then rotate 
          // the hand for 180deg
          {translateY: - ( height / 2 ) },
          {rotate: `${value * rotationStep - 180}deg`},
          {translateY: (height / 2) }
        ],

        height: height,
        width: width,
        backgroundColor: color,
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 99
      },
      ]}
    >
    </View>
  );
}

const styles = StyleSheet.create({
  hand: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
})

export default Hand;