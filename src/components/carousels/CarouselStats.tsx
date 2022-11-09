import React, {useContext, useState} from 'react'
import {Dimensions, StyleSheet} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Carousel from 'react-native-reanimated-carousel'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {PaginationCarousel} from './PaginationCarousel'
import {StatisticsResponse} from '../../interfaces/Expense'
import {FiltersChart} from '../charts/FiltersChart'
import {AmountsForMonths} from '../charts/AmountsForMonths'


interface Props {
  statistics?: StatisticsResponse
}

const WIDTH_SCREEN = Dimensions.get('screen').width
const HEIGHT_CAROUSEL = WIDTH_SCREEN / 1.5
const HEIGHT_CHART = 180;

export const CarouselStats = ({statistics}: Props) => {

  const {theme} = useContext(ThemeContext)
  const [actualCard, setActualCard] = useState(0)

  const data = [
    <FiltersChart
      heightChart={HEIGHT_CHART}
      statistics={statistics}
    />,
    <AmountsForMonths
      heightChart={HEIGHT_CHART}
      statistics={statistics}
    />
  ]

  return (
    <GestureHandlerRootView style={[styles.carouselContainer, {backgroundColor: theme.colors.background}]}>

      <Carousel
        width={WIDTH_SCREEN}
        height={HEIGHT_CAROUSEL + 50}
        data={data}
        scrollAnimationDuration={500}
        mode='parallax'
        loop={false}
        onSnapToItem={(index) => setActualCard(index)}
        style={[styles.carousel]}
        renderItem={({item, index}) => (
          <>
            {item}
          </>
        )}
      />

      <PaginationCarousel
        actualIndex={actualCard}
        totalLengthData={data.length}
      />

    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  carouselContainer: {
    // paddingTop: 20,
    paddingBottom: 50,
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})