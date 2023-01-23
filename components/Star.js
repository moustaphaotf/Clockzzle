import {View } from 'react-native';
import { colors } from "../global";

const Star = ({fillColor, size, filledPercentage}) => {
  const starStyle = {
    overflow: "hidden",
    position: "relative",
    width: "1em",
    height: "1em",
    cursor: "pointer",
  };

  const maskStyle = {
    backgroundColor: colors.main,
    position: "absolute",
    top: 0,
    right: 0,
    width: `${100 - filledPercentage}%`,
    height: "100%",
  };

  const borderStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1
  }

  return(
    <View style={starStyle}>
      <svg style={{fill:fillColor}} viewBox={`0 0 24 24`}>
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.16-3.967-7.16 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
      </svg>
      <svg 
        style={borderStyle} 
        fillOpacity={0} 
        viewBox={`0 0 24 24`}
        stroke={fillColor}
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.16-3.967-7.16 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
      </svg>
      <View style={maskStyle} />
    </View>
  );
}

export default Star;