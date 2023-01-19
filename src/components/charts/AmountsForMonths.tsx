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

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

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
      title={(currentDate.getMonth() === 11) ? currentYear.toString() : `${currentYear -1} - ${currentYear}`}
      data={amountForMonth.map(data => (MONTHS[data.month - 1][0]))}
      color={[theme.colors.primary]}
      monthGraph
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
