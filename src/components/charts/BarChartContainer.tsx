import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { BackgroundChartMarks } from './BackgroundChartMarks';
import { PrincipalCardContainer } from '../cards/PrincipalCardContainer';
import { Title } from '../texts/Title';
import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
	children: JSX.Element | JSX.Element[];
	maxToGraph: number;
	title: string;
	data: string[];
	color: string[];
}

const HEIGHT_CHART = 180;

export const BarChartContainer = ({
	children,
	title,
	maxToGraph,
	data,
	color,
}: Props) => {
	const { theme } = useContext(ThemeContext);

	return (
		<PrincipalCardContainer size="big">
			<Title label={title} size="big" style={styles.amountTitle} />

			<View style={styles.chartContainer}>
				<View
					style={[styles.yAxisLine, { borderColor: theme.colors.border }]}
				/>
				<View
					style={[styles.xAxisContainer, { borderColor: theme.colors.border }]}
				>
					<BackgroundChartMarks maxAmount={maxToGraph} />

					<View style={styles.barsContainer}>{children}</View>

					<View style={styles.barsTextContainer}>
						{data.map((data, idx) => (
							<Text
								key={idx}
                numberOfLines={2}
								adjustsFontSizeToFit
								style={[styles.barName, { color: color[idx] || color[0] }]}
							>
								{data}
							</Text>
						))}
					</View>
				</View>
			</View>
		</PrincipalCardContainer>
	);
};

const styles = StyleSheet.create({
	amountTitle: {
		textAlign: 'center',
		marginBottom: 20,
	},
	chartContainer: {
		height: 200,
	},
	yAxisLine: {
		borderLeftWidth: 1,
		position: 'absolute',
		right: 0,
		width: '90%',
		height: '100%',
	},
	xAxisContainer: {
		borderBottomWidth: 1,
		justifyContent: 'flex-end',
		height: HEIGHT_CHART,
	},
	barsContainer: {
		width: '90%',
		marginLeft: '10%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
		paddingHorizontal:3
	},
	barsTextContainer: {
		flexDirection: 'row',
		position: 'absolute',
		width: '90%',
		marginLeft: '10%',
		bottom: -25,
		justifyContent: 'space-around',
	},
	barName: {
		flex: 1,
		maxWidth: 50,
		textAlign: 'center',
		fontSize: 10,
		textAlignVertical: 'center',
	},
});
