import React, { useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
	width?: number;
	height?: number;
  marginVertical?: number;
}

export const RowLoader = ({ height = 50, width, marginVertical= 10 }: Props) => {
	const { theme } = useContext(ThemeContext);
	const opacity = useRef(new Animated.Value(0.7)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, {
					toValue: 0.2,
					useNativeDriver: true,
					duration: 1000,
				}),
				Animated.timing(opacity, {
					toValue: 0.7,
					useNativeDriver: true,
					duration: 1000,
				}),
			])
		).start();
	}, []);

	return (
		<Animated.View
			style={[
				styles.container,
				{
					width: `${width || 100}%`,
					height,
          marginVertical,
					backgroundColor: theme.disable,
					opacity,
				},
			]}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf:'center',
    borderRadius:5
	},
});
