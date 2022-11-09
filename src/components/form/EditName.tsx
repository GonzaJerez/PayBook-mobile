import React from 'react'
import {View, StyleSheet} from 'react-native'

import {EditNameField} from './EditNameField'


interface Props {
  label: 'cuenta' | 'usuario' | 'categoría' | 'subcategoría' | 'gasto en cuotas';
  initialValue: string;
  onSubmit: (body:{[x:string]:string})=>void;
}

export const EditName = ({label,initialValue,onSubmit}:Props) => {

  return (
    <View style={styles.formContainer}>
      <EditNameField 
        label={label}
        initialValue={initialValue}
        onSubmit={onSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer:{
    marginTop: 50,
    paddingHorizontal:40
  }
})