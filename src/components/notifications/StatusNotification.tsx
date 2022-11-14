import React, { useContext } from 'react';
import { StyleSheet, Animated, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { useStatusAnimation } from '../../hooks/useStatusAnimation';
import { RequestsStatusContext } from '../../context/requests-status/RequestsStatusContext';

export const StatusNotification = () => {
	const { successMessage, hideNotification } = useContext(
		RequestsStatusContext
	);
	const { theme } = useContext(ThemeContext);

	const { bottom } = useStatusAnimation({ hideNotification });

	return (
		<Animated.View
			style={[
				styles.container,
				{
					borderColor: theme.colors.primary,
					backgroundColor: theme.colors.card,
					shadowColor: theme.shadow,
					bottom,
				},
			]}
		>
			<Animated.View style={[styles.rowContainer]}>
				<Text style={styles.label}>{successMessage}</Text>
				<LottieView
					autoPlay
					loop={false}
					style={{
						width: 40,
						height: 40,
					}}
					source={require('../../../assets/animations/positive-status.json')}
				/>
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 70,
		position: 'absolute',
		zIndex: 9999,
		width: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		borderWidth: 1,
		alignSelf: 'center',
		// bottom: 50,
		borderRadius: 20,
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.15,
		shadowRadius: 3.5,
		elevation: 5,
	},
	rowContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	label: {
		fontSize: 16,
		fontWeight: '500',
	},
});
