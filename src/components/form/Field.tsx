import {useField} from 'formik';
import React, {useContext, useState} from 'react'
import {View, Text, TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ErrorField} from '../texts/ErrorField';

interface Props {
  label?: string;
  type?: KeyboardTypeOptions;
  placeholder?: string;
  fixedValue?: string;
  name: string;
}

export const Field = ({label, type = 'default', placeholder, fixedValue, name}: Props) => {

  const {theme} = useContext(ThemeContext)

  const [field, meta, helpers] = useField(name)
  
  const [errorVisible, setErrorVisible] = useState(false)

  return (
    <View style={styles.container}>
      
      {
        (label) && (
          <Text
            style={{...styles.label, color: theme.ligthText}}>
            {label}
          </Text>
        )
      }

      {(fixedValue)
        ? (
          <Text
            style={[styles.input, {borderColor: theme.colors.border, color:theme.ligthText}]}
          >
            {fixedValue}
          </Text>
        )
        : (
          <TextInput
            style={[
              styles.input, 
              {
                borderColor: (errorVisible && meta.error) ? theme.delete : theme.colors.border,
                color: theme.colors.text
              }
            ]}
            keyboardType={type}
            selectionColor={theme.colors.primary}
            placeholder={placeholder}
            placeholderTextColor={theme.disable}
            value={field.value}
            onChangeText={value => helpers.setValue(value)}
            onBlur={()=>setErrorVisible(true)}
            onFocus={()=>helpers.setTouched(true)}
          />

        )
      }

      { (errorVisible && meta.error) && (
        <ErrorField>{meta.error}</ErrorField>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    // height: 45,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})