import React, {useContext} from 'react'
import {Text, StyleSheet} from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext';
import {currencyFormat} from '../../helpers/currencyFormat';
import {PrincipalCardContainer} from './PrincipalCardContainer'

interface Props {
  titleCard: string;
  amount: number | null;
}


export const AmountsCards = ({amount,titleCard}:Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <PrincipalCardContainer>

      <Text style={[styles.titleCard, {color:theme.colors.text}]}>{titleCard}</Text>
      <Text style={[styles.amountCard, {color:theme.colors.text}]}>{currencyFormat(amount || 0)}</Text>

    </PrincipalCardContainer>
  )
}

const styles = StyleSheet.create({
  titleCard: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 30
  },
  amountCard: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: '700',
    letterSpacing: 1
  },
})