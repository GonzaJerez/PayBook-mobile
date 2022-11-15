import React, {useEffect, useRef} from 'react'
import {View, Text, StyleSheet, Animated} from 'react-native'

import {currencyShortFormat} from '../../helpers/currencyFormat';


interface Props {
  color: string;
  value: number;
  percent?: number;
  heightChart?: number;
}

export const BarChart = ({color, value, percent, heightChart}: Props) => {

  const height = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    Animated.timing(height,{
      duration: 500,
      toValue: (heightChart || 0) * (percent || 0),
      useNativeDriver: false
    }).start()
  },[percent])

  return (
    <Animated.View style={[styles.barContainer, {height, backgroundColor: color}]}>
      {(value > 0) && (
        <Text 
          style={[styles.barValue, {color}]}
        >
          {currencyShortFormat(value)}
        </Text>
      )}
      <View
        style={styles.bar}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  barContainer: {
    maxWidth: 50,
    flex:1,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    justifyContent:'space-between'
  },
  bar: {
    flex: 1,
  },
  barValue:{
    textAlign:'center',
    top:-20,
    fontSize:11,
    // borderWidth:1
    minHeight:16
  },
})