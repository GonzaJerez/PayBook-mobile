import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';

import { Filters } from '../../../components/side-menu/Filters';
import { ShowExpensesCard } from '../../../components/lists/ShowExpensesCard';
import { CarouselStats } from '../../../components/carousels/CarouselStats';
import { ExpensesContext } from '../../../context/expenses/ExpensesContext';
import { StatisticsResponse } from '../../../interfaces/Expense';
import { StatisticsContext } from '../../../context/statistics/StatisticsContext';
import { ThemeContext } from '../../../context/theme/ThemeContext';
import { LoadingModal } from '../../../components/modals/LoadingModal';

export const StatsScreen = () => {
	const { theme } = useContext(ThemeContext);
	const { getStatistics } = useContext(ExpensesContext);
	const { filtersApplied } = useContext(StatisticsContext);

	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [statistics, setStatistics] = useState<StatisticsResponse>();

	const onGetStatistics = async () => {
		try {
			const res = await getStatistics(filtersApplied);
			setStatistics(res);
		} 
    catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		onGetStatistics().finally(() => {
			setIsLoading(false);
		});
	}, [filtersApplied]);

	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={async () => {
						setIsRefreshing(true);
						await onGetStatistics();
						setIsRefreshing(false);
					}}
					progressBackgroundColor={theme.colors.card}
					colors={[theme.colors.primary]}
				/>
			}
		>
			{isLoading && <LoadingModal />}

			<ShowExpensesCard data={statistics?.expenses || []}>
				<View style={styles.filtersContainer}>
					<Filters />
				</View>

				<CarouselStats statistics={statistics} />
			</ShowExpensesCard>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	filtersContainer: {
		marginTop: 20,
		marginHorizontal: 20,
		alignItems: 'flex-end',
	},
	filtersApplied: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
	},
});
