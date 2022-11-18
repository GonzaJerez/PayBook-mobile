import React, {useContext, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {useField} from 'formik';
import {InlineField} from './InlineField';


interface Props {
  name: string;
  data: {label:string}[];
  initialValue: boolean;
}

export const RadioButtonsField = ({name, data, initialValue}:Props) => {

  const {theme} = useContext(ThemeContext)
  const [field, _meta, helpers] = useField(name)

  const [showInstallmentsOptions, setShowInstallmentsOptions] = useState((initialValue) ? 1 : 0)

  const onChange = (item:{label:string})=>{

    if(item.label === 'Cuotas'){
      helpers.setValue(2)
      setShowInstallmentsOptions(1)
    } else {
      helpers.setValue(1)
      setShowInstallmentsOptions(0)
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.radioButtonsContainer}>
        {
          data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.buttonContainer}
              onPress={()=>onChange(item)}
            >
              <Ionicons
                name={`radio-button-${(index === showInstallmentsOptions) ? 'on' : 'off'}-outline`}
                size={20}
                style={styles.buttonIcon}
                color={(index === showInstallmentsOptions) ? theme.colors.primary : theme.ligthText}
              />
              <Text style={[styles.buttonLabel,{color:theme.ligthText}]}>{item.label}</Text>
            </TouchableOpacity>
          ))
        }
      </View>

      {(showInstallmentsOptions === 1) && (
        <InlineField 
          name={name}
          label='Cantidad de cuotas'
          placeholder='1'
          type='number-pad'
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  radioButtonsContainer:{
    marginVertical:20,
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height:30
  },
  buttonIcon: {
    marginRight: 5
  },
  buttonLabel: {

  }
})