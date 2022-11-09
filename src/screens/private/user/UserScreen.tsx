import React from 'react';
import { View, StyleSheet } from 'react-native';

import { UserProfile } from '../../../components/lists/UserProfile';
import { FooterBrand } from '../../../components/brand/FooterBrand';

export const UserScreen = () => {
	return (
		<View style={styles.container}>
			<UserProfile />
			<FooterBrand hasScreenHeader />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	version: {
		fontSize: 12,
	},
});
