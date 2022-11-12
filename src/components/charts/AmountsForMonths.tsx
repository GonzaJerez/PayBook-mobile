import React, {useContext} from 'react'

import {BarChartContainer} from './BarChartContainer'
import {ExpensesForMonth, StatisticsResponse} from '../../interfaces/Expense'
import {BarChart} from './BarChart';
import {MONTHS} from '../../constants/ConstantsFilters';
import {ThemeContext} from '../../context/theme/ThemeContext';


interface Props {
  statistics?: StatisticsResponse;
  heightChart: number
}

export const AmountsForMonths = ({heightChart, statistics}: Props) => {

  const {theme} = useContext(ThemeContext)

  const amountForMonth: ExpensesForMonth[] = []
  for (let i = 1; i <= 12; i++) {
    const expOnMonth = {
      month: i,
      totalAmount: 0
    }
    statistics?.amountsForMonthInActualYear.forEach(exp => {
      if (i === exp.month) {
        expOnMonth.totalAmount = exp.totalAmount
      }
    })
    amountForMonth.push(expOnMonth)
  }

  const maxToGraph = Math.max(...amountForMonth.map(amount => (amount.totalAmount))) * 1.1

  return (
    <BarChartContainer
      maxToGraph={maxToGraph}
      title={new Date().getFullYear().toString()}
      data={amountForMonth.map(data => (MONTHS[data.month - 1][0]))}
      color={[theme.colors.primary]}
    >
      {amountForMonth.map((el,idx) => (
        <BarChart
          key={idx}
          value={el.totalAmount}
          percent={el.totalAmount / maxToGraph}
          heightChart={heightChart}
          color={theme.colors.primary}
        />
      ))}
    </BarChartContainer>
  )
}
