import React, {useContext} from 'react'
import {View, StyleSheet, ViewStyle, ScrollView, Text, Dimensions} from 'react-native'

import {Title} from '../texts/Title'
import {DefaultSeparator} from '../separators/DefaultSeparator'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {TertiaryButton} from '../buttons/TertiaryButton'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {PrivateStackNavigation} from '../../navigation/PrivateNavigation'
import {ExpensesList} from './ExpensesList'
import {Expense} from '../../interfaces/Expense'
import {LIMIT_EXPENSES_HOME} from '../../constants/ContantsAccounts'


interface Props {
  data: Expense[];
  children?: JSX.Element | JSX.Element[];
  showAllExpensesButton?: boolean;
  title?: string;
}

const HEIGHT_SCREEN = Dimensions.get('window').height;

export const ShowExpensesCard = ({data, children, title, showAllExpensesButton}: Props) => {

  const {theme} = useContext(ThemeContext)
  const {navigate} = useNavigation<NativeStackNavigationProp<PrivateStackNavigation>>()


  return (
    <ScrollView
      style={{backgroundColor:theme.colors.background}}
    >
      <View style={styles.outInfo}>
        {children}
      </View>
      <View style={[styles.cardContainer, {backgroundColor:theme.colors.background}]}>
        <View
          style={[
            styles.listContainer,
            {backgroundColor: theme.colors.card, paddingTop: (title) ? 0 : 40}
          ]}
        >

          {(title) && (
            <>
              <Title label={title} style={{...styles.lastExpensesTitle, color: theme.colors.text}} />
              <DefaultSeparator percentWidth={80} marginVertical={20} />
            </>
          )}

          <ExpensesList data={data} />

          {(showAllExpensesButton && data.length >= LIMIT_EXPENSES_HOME) && (
            <TertiaryButton
              label='Ver todos los gastos'
              onPress={() => navigate('ExpensesNavigation', {screen: 'AllExpensesScreen'})}
              style={styles.seeAllExpensesButton}
              fontSize={18}
            />

          )}

        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
  },
  outInfo:{
    flex:1
  },
  cardContainer:{
    flex:1,
    minHeight:HEIGHT_SCREEN / 2,

  },
  listContainer: {
    flex:1,
    paddingBottom: 50,
    width: '100%',
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    alignItems: 'center',
  },
  lastExpensesTitle: {
    marginTop: 20,
    marginBottom: 0,
  },
  allExpensesContainer: {
    width: '100%'
  },
  seeAllExpensesButton: {
    marginVertical: 10,
    marginBottom: 0
  }
})