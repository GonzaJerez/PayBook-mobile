import {useField} from 'formik';
import React, {useContext, useState} from 'react'
import {View, Text, TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ErrorField} from '../texts/ErrorField';

interface Props {
  label?: string;
  type?: KeyboardTypeOptions;
  placeholder?: string;
  name: string;
}

export const BigInput = ({label, type = 'number-pad', placeholder, name}: Props) => {

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

      <TextInput
        style={[styles.input, {
          borderColor: (errorVisible && meta.error) ? theme.delete : theme.colors.border
        }]}
        keyboardType={type}
        selectionColor={theme.colors.primary}
        placeholder={placeholder}
        value={field.value}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => setErrorVisible(true)}
        onFocus={()=>helpers.setTouched(true)}
      />

      {(errorVisible && meta.error) && (
        <ErrorField>{meta.error}</ErrorField>
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center'
  },
  label: {
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 200,
    fontSize: 30,
    textAlign: 'center'
  },
})