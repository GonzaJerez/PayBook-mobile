import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useContext} from 'react'
import {Ionicons} from '@expo/vector-icons'
import {currencyFormat} from '../../helpers/currencyFormat'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {CreditPayment} from '../../interfaces/CreditExpenses'


interface Props{
  item: CreditPayment;
  onPress: ()=> void;
}

export const CreditExpenseRow = ({item, onPress}:Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <TouchableOpacity 
      style={[styles.creditPaymentContainer, {borderColor: theme.colors.border}]}
      onPress={onPress}
    >

      <View style={[styles.nameContainer]}>
        <Text style={[styles.name, {color:theme.colors.text}]}>{item.name}</Text>
        <Text
          style={[styles.lightText, {color: theme.ligthText}]}
        >
          Coutas pagadas: {item.installments_paid}/{item.installments}
        </Text>
      </View>

      <View style={[styles.nameContainer]}>
        <Text style={[styles.lightText, {color: theme.ligthText}]}>Monto hasta el momento</Text>
        <Text style={[styles.amount, {color:theme.colors.text}]}>
          {currencyFormat(item.expenses.reduce(
            (prev, current) => prev + current.amount,
            0
          ))}
        </Text>
      </View>

      <Ionicons
        name='chevron-forward-outline'
        size={20}
        style={styles.icon}
        color={theme.colors.text}
      />

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex:1
  },
  creditPaymentContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems:'center'
  },
  nameContainer: {
    flex: 1
  },
  name: {
    fontSize: 16,
    fontWeight: '500'
  },
  lightText: {
    fontSize: 13
  },
  amount: {
    fontSize: 18,
    fontWeight: '500'
  },
  icon: {
    marginLeft: 20
  },
})