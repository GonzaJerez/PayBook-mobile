import React, {useContext, useState} from 'react'
import {Dimensions, StyleSheet} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import {AmountsCards} from '../cards/AmountsCards';
import {usePrincipalAmounts} from '../../hooks/usePrincipalAmounts';
import {PaginationCarousel} from './PaginationCarousel';
import {ThemeContext} from '../../context/theme/ThemeContext';


const WIDTH_SCREEN = Dimensions.get('screen').width
const HEIGHT_CAROUSEL = WIDTH_SCREEN / 1.5

export const CarouselAmounts = () => {

  const {theme} = useContext(ThemeContext)

  const {formatPrincipalAmounts} = usePrincipalAmounts()

  const [actualCard, setActualCard] = useState(0)

  return (
    <GestureHandlerRootView style={[styles.carouselContainer, {backgroundColor:theme.colors.background}]}>

      <Carousel
        width={WIDTH_SCREEN}
        height={HEIGHT_CAROUSEL}
        data={formatPrincipalAmounts}
        scrollAnimationDuration={500}
        mode='parallax'
        loop={false}
        onSnapToItem={(index) => setActualCard(index)}
        style={[styles.carousel]}
        renderItem={({item}) => (
          <AmountsCards
            titleCard={item.title}
            amount={item.amount}
          />
        )}
      />

      <PaginationCarousel 
        actualIndex={actualCard}
        totalLengthData={formatPrincipalAmounts.length}
      />

    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  carouselContainer: {
    // marginTop: 20,
    paddingTop:20,
    paddingBottom:50,
    // backgroundColor:'red'
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})