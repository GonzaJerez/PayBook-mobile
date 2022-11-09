import React from 'react'

import {BarChartContainer} from './BarChartContainer'
import {BarChart} from './BarChart'
import {StatisticsResponse} from '../../interfaces/Expense'
import {currencyFormat} from '../../helpers/currencyFormat';


interface Props {
  statistics?: StatisticsResponse;
  heightChart: number
}

const COLORS_TO_BARS = [
  '#f44336',
  '#42a5f5',
  '#ab47bc',
  '#3f51b5',
  '#4db6ac',
  '#d4e157',
  '#ffa726',
  '#5d4037',
  '#607d8b',
]

export const FiltersChart = ({statistics, heightChart}:Props) => {

  const categoriesValues = Object.values(statistics?.totalAmountsForCategories || {})
  const subcategoriesValues = Object.values(statistics?.totalAmountsForSubcategories || {})

  let maxToGraph = 0
  if (categoriesValues.length > 0) {
    maxToGraph = Math.max(...categoriesValues) * 1.1
  }
  if (subcategoriesValues.length > 0) {
    maxToGraph = Math.max(...subcategoriesValues) * 1.1
  }

  return (
    <BarChartContainer 
      maxToGraph={maxToGraph}
      title={currencyFormat(statistics?.totalAmount || 0)}
      color={COLORS_TO_BARS}
      data={(categoriesValues.length > 0) ? Object.keys(statistics?.totalAmountsForCategories || {}) : Object.keys(statistics?.totalAmountsForSubcategories || {})}
    >
      <>
        {Object.entries(statistics?.totalAmountsForCategories || {}).map((el, idx) => (
          <BarChart
            key={el[0]}
            value={el[1]}
            percent={el[1] / maxToGraph}
            heightChart={heightChart}
            color={COLORS_TO_BARS[idx]}
          />
        ))}
        {Object.entries(statistics?.totalAmountsForSubcategories || {}).map((el, idx) => (
          <BarChart
            key={el[0]}
            value={el[1]}
            percent={el[1] / maxToGraph}
            heightChart={heightChart}
            color={COLORS_TO_BARS[idx]}
          />
        ))}
      </>
    </BarChartContainer>
  )
}
