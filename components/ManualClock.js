import { useState } from "react";
import { View } from "react-native";
import { colors } from "../global";

const ManualClock = ({style, time, setTime, submitted}) => {
  const [input, setInput] = useState("00:00");
  useState(() => {
    if(time == ""){
      setInput("00:00");
    }
  });

  return (
    <View style={[style, {marginBottom: 3,flexDirection: 'column', justifyContent: 'center', alignItems: "center"}]}>
      <input
        type="time"
        value={input}
        style={{
          borderColor: colors.gray,
          padding: 3,
          fontSize: 18,
          borderRadius: 3
        }}
        onChange={(e) => {
          if(!submitted){
            // get hours and minutes
            setInput(e.currentTarget.value);
            
            let components = e.currentTarget.value.split(":").map(c => parseInt(c));
            let newValue = new Date();
            newValue.setHours(components[0]);
            newValue.setMinutes(components[1]);
            newValue.setSeconds(0);            
            setTime(newValue.toISOString());
          }
          return;
        }}
      />
    </View>
  );
}

export default ManualClock;