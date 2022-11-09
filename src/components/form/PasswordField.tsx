import {Ionicons} from '@expo/vector-icons';
import {useField} from 'formik';
import React, {useContext, useState} from 'react'
import {View, Text, TextInput, StyleSheet, KeyboardTypeOptions, TouchableOpacity} from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ErrorField} from '../texts/ErrorField';

interface Props {
  label: string;
  name: string;
  placeholder?: string;
}

export const PasswordField = ({label, name, placeholder}: Props) => {

  const {theme} = useContext(ThemeContext)

  const [field, meta, helpers] = useField(name)
  const [errorVisible, setErrorVisible] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <View style={styles.container}>
      
      <Text
        style={{...styles.label, color: theme.ligthText}}>
        {label}
      </Text>

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: (errorVisible && meta.error) ? theme.delete : theme.colors.border,
          }
        ]}
      >
        <TextInput
          style={[styles.input,{color:theme.colors.text}]}
          selectionColor={theme.colors.primary}
          placeholder={placeholder}
          placeholderTextColor={theme.disable}
          secureTextEntry={!passwordVisible}
          value={field.value}
          onChangeText={value => helpers.setValue(value)}
          onBlur={() => setErrorVisible(true)}
          onFocus={()=>helpers.setTouched(true)}
        />

        <TouchableOpacity
          onPress={()=>setPasswordVisible(!passwordVisible)}
        >
          <Ionicons 
            name={(passwordVisible) ? 'eye-off-outline' : 'eye-outline'} 
            size={18} 
            color={theme.ligthText} 
          />
        </TouchableOpacity>
      </View>

      {(errorVisible && meta.error) && (
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '90%',
  },
})