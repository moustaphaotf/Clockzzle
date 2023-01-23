import { View } from 'react-native';
import Star from './Star';

// rate = [0...5] (real number)
const Rating = ({style, rate, color}) => {
  const stars = [];
  const MAX_RATE = 5;
  let totalRate = rate * 100 * 5;
  for(let i = 0; i < MAX_RATE; i++){
    let p = 100;
    if(totalRate < 100){
      p = totalRate;
    }
    stars.push(
      <Star
        fillColor={color}
        filledPercentage={p}
        key={i}
      />
    )
    totalRate -= p;
  }

  return (
    <View 
      style={[style, {flexDirection: 'row'}]}
    >{stars}</View>
  );
}

export default Rating;