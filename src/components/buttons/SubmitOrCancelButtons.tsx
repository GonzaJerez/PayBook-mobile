import React from 'react'
import { View, StyleSheet } from 'react-native'

import {PrimaryButton} from './PrimaryButton'
import {TertiaryButton} from './TertiaryButton'

interface Props {
  marginTop?: number
  disable?: boolean;
  isLoading?: boolean;
  submitLabel?: string;
  onSubmit: ()=>void;
  onCancel: ()=>void;
}

export const SubmitOrCancelButtons = ({onSubmit, onCancel, marginTop=50, disable, isLoading, submitLabel}:Props) => {
  
  return (
    <>
      <View style={[styles.buttonsContainer, {marginTop}]}>
        <TertiaryButton 
          label='Cancelar' 
          onPress={onCancel}
        />
        <PrimaryButton 
          label={submitLabel || 'Guardar'} 
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
    // width:100
  },
})