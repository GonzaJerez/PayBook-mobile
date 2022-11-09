import React from 'react'
import { View, StyleSheet } from 'react-native'

import {PrimaryButton} from './PrimaryButton'
import {TertiaryButton} from './TertiaryButton'

interface Props {
  onSubmit: ()=>void;
  onCancel: ()=>void;
  marginTop?: number
  disable?: boolean;
  isLoading?: boolean;
}

export const SubmitOrCancelButtons = ({onSubmit, onCancel, marginTop=50, disable, isLoading}:Props) => {
  
  return (
    <>
      <View style={[styles.buttonsContainer, {marginTop}]}>
        <TertiaryButton 
          label='Cancelar' 
          onPress={onCancel}
        />
        <PrimaryButton 
          label='Guardar' 
          onPress={onSubmit}
          style={styles.saveButton}
          disable={disable}
          isLoading={isLoading}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  buttonsContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
  },
  saveButton:{
    width:100
  },
})