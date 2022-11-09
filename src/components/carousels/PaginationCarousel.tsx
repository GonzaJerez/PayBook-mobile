import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext';


interface Props {
  actualIndex:      number;
  totalLengthData:  number;
}

export const PaginationCarousel = ({actualIndex,totalLengthData}:Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <View style={styles.carouselPaginationContainer}>
      {[...new Array(totalLengthData).keys()].map((_el, index) => (
        <View
          key={index}
          style={[
            styles.carouselPaginationItem,
            {
              backgroundColor: (index === actualIndex) ? theme.colors.primary : theme.disable,
              width: (index === actualIndex) ? 15 : 12,
              height: (index === actualIndex) ? 15 : 12,
            }
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  carouselPaginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselPaginationItem: {
    borderRadius: 100,
    marginHorizontal: 10
  }
})