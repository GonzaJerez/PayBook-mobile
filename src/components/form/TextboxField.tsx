import {useField} from 'formik';
import React, {useContext, useState} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {ErrorField} from '../texts/ErrorField';


interface Props {
  name: string;
  placeholder?: string;
}

export const TextboxField = ({name, placeholder}: Props) => {

  const {theme} = useContext(ThemeContext)

  const [errorVisible, setErrorVisible] = useState(false)

  const [field, meta, helpers] = useField(name)

  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: theme.ligthText}]}>Descripción</Text>

      <TextInput
        style={[styles.textBoxContainer, {borderColor: theme.colors.border}]}
        multiline
        numberOfLines={5}
        selectionColor={theme.colors.primary}
        placeholder={(placeholder) ? placeholder : 'Descripción del gasto'}
        value={field.value}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => setErrorVisible(true)}
        onFocus={() => helpers.setTouched(true)}
      />

      {(errorVisible && meta.error) && (
        <ErrorField>{meta.error}</ErrorField>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  label: {
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '500'
  },
  textBoxContainer: {
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: 15,
    borderRadius: 5,
    minHeight: 120
  }
})