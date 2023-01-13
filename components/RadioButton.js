import {useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../global';

const RadioButton = ({style, options, handleUpdate, value}) =>{
	return (
		<View style={[style, {flexDirection: 'row', justifyContent: 'center'}]}>
			{options.map(res => {
				return (
					<TouchableOpacity key={res.key} style={styles.container}
						onPress={() => {
							handleUpdate(res.key);
							console.log(value)
						}}
					>
						<View style={styles.radioCircle}>
							{value === res.key && <View style={styles.selectedRb} />}
						</View>
						<Text style={styles.radioText}>{res.text}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
		justifyContent: 'space-between',
	},
  radioText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'gray',
    fontWeight: '700'
  },
	radioCircle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: colors.black,
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 10,
		height: 10,
		borderRadius: 50,
		backgroundColor: colors.black,
  }
});

export default RadioButton;