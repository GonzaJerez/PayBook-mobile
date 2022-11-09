import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {StatisticsContext} from '../../context/statistics/StatisticsContext'
import {InlineField} from './InlineField'


export const FilterAmountsForm = () => {

  const {filtersApplied,addFilter} = useContext(StatisticsContext)

  const onChangeAmount = (field: 'max_amount' | 'min_amount', value:string) => {
    addFilter(field, value)
  }

  return (
    <Formik
      initialValues={{
        min_amount: filtersApplied.min_amount || '',
        max_amount: filtersApplied.max_amount || ''
      }}
      onSubmit={()=>{}}
      validationSchema={
        Yup.object({
          min_amount: Yup
            .number()
            .min(0, 'El monto no puede ser negativo'),
          max_amount: Yup
            .number()
            .min(0, 'El monto no puede ser negativo'),
        })
      }
    >
      {({values}) => (
        <View style={styles.optionsContainer}>
          <InlineField
            name='min_amount'
            placeholder='100'
            type='number-pad'
            label='Min'
            onBlurEvent={()=>onChangeAmount('min_amount', values.min_amount)}
          />
          <InlineField
            name='max_amount'
            placeholder='100'
            type='number-pad'
            label='Max'
            onBlurEvent={()=>onChangeAmount('max_amount', values.max_amount)}
          />
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  optionsContainer: {
    marginBottom: 20,
    paddingHorizontal: 40,
  },
})