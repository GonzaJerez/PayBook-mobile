import React, {useContext, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {OptionsButton} from '../../../components/buttons/OptionsButton'
import {RowInfo} from '../../../components/item-lists/RowInfo'
import {ShowExpensesCard} from '../../../components/lists/ShowExpensesCard'
import {CreditExpensesContext} from '../../../context/credit-expenses/CreditExpensesContext'
import {currencyFormat} from '../../../helpers/currencyFormat'
import {AccountStackNavigation} from '../../../navigation/AccountNavigation'
import {useAlertToConfirm} from '../../../hooks/useAlertToConfirm'


interface Props extends NativeStackScreenProps<AccountStackNavigation, 'DetailCreditExpenseScreen'> {}

export const DetailCreditExpenseScreen = ({navigation}: Props) => {

  const {actualCreditExpense, removeCreditExpense} = useContext(CreditExpensesContext)

  const toDelete = ()=>{
    navigation.goBack();
    removeCreditExpense();
  }

  const {showAlert} = useAlertToConfirm({
    title: 'Eliminar gasto en cuotas',
    message: `
    ¿Seguro que desea eliminar este gasto en cuotas? Esta acción no se puede deshacer. \n
    Tener en cuenta que los gastos asociados a este gasto en cuotas también se eliminarán`,
    onCancel:()=>{},
    onConfirm: toDelete,
    textToConfirm:'Eliminar'
  })

  const options = [
    {
      label: 'Editar gasto en cuotas',
      icon: 'pencil-outline',
      onPress: () => {navigation.navigate('EditCreditExpenseScreen')}
    },
    {
      label: 'Eliminar gasto en cuotas',
      icon: 'trash-outline',
      onPress: showAlert
    },
  ]


  useEffect(() => {
    navigation.setOptions({
      title: actualCreditExpense?.name,
      headerRight: () => (
        <OptionsButton
          options={options}
        />
      )
    })
  }, [actualCreditExpense])

  return (
    <ShowExpensesCard
      data={actualCreditExpense?.expenses || []}
      title='Cuotas pagadas'
    >
      <View style={styles.dataContainer}>
        <RowInfo
          label='Coutas totales'
          value={String(actualCreditExpense?.installments)}
        />
        <RowInfo
          label='Coutas pagadas'
          value={String(actualCreditExpense?.installments_paid)}
        />
        <RowInfo
          label='Coutas restantes'
          value={String((actualCreditExpense?.installments || 0) - (actualCreditExpense?.installments_paid || 0))}
        />
        <RowInfo
          label='Monto acumulado hasta el momento'
          value={
            currencyFormat(actualCreditExpense?.expenses?.reduce(
              (prev, current) => prev + current.amount,
              0
            ) || 0)
          }
        />
        <RowInfo
          label='Estado'
          value={(actualCreditExpense?.installments || 0) - (actualCreditExpense?.installments_paid || 0) === 0 ? 'Finalizado' : 'Pendiente'}
        />
      </View>

    </ShowExpensesCard>
  )
}

const styles = StyleSheet.create({
  dataContainer: {
    marginTop: 20
  }

})