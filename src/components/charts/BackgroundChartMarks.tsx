import React, {useContext} from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {currencyFormat} from '../../helpers/currencyFormat'


interface Props {
  maxAmount: number
}

const NUM_DIVIDERS = 5

export const BackgroundChartMarks = ({maxAmount}: Props) => {

  const {theme} = useContext(ThemeContext)

  const amountsList: number[] = []

  for (let i = 0; i < NUM_DIVIDERS; i++) {
    let amount = maxAmount * 0.2
    if (i !== 0) amount += amountsList[i - 1]
    amountsList.push(amount)
  }

  return (
    <View style={styles.backgroundContainer}>
      {
        amountsList.reverse().map((amount, index) => (
          <View
            key={index}
            style={[
              styles.backgroundMarks,
              {
                borderColor: theme.separator,
                borderStyle: (Platform.OS === 'ios') ? 'solid' : 'dotted'
              }
            ]}
          >
            {maxAmount > 0 && (
              <Text style={[styles.amountText, {color: theme.ligthText}]}>{currencyFormat(amount)}</Text>
            )}
          </View>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  backgroundMarks: {
    height: '20%',
    borderTopWidth: 1,
  },
  amountText: {
    fontSize: 10,
    left: -10,
  },
})