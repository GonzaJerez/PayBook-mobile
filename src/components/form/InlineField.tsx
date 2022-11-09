import {useField} from 'formik';
import React, {useContext, useState} from 'react'
import {View, Text, KeyboardTypeOptions, TextInput, StyleSheet} from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {DefaultLabel} from '../fields/DefaultLabel';
import {ErrorField} from '../texts/ErrorField';

interface Props {
  name:           string;
  label?:         string;
  type?:          KeyboardTypeOptions;
  placeholder?:   string;
  onBlurEvent?:        ()=>void;
}

export const InlineField = ({name, label, type='default', placeholder, onBlurEvent}:Props) => {

  const {theme} = useContext(ThemeContext)

  const [field, meta, helpers] = useField(name)
  const [errorVisible, setErrorVisible] = useState(false)

  const onBlur = ()=>{
    setErrorVisible(true)
    if (onBlurEvent) onBlurEvent()
  }

  return (
    <View style={styles.container}>
      {
        (label) && (
          <DefaultLabel label={label}/>
        )
      }

      <View style={styles.inputContainer}>
        {
          (label === 'Monto' || label === 'Min' || label === 'Max') && (
            <Text style={{color:theme.colors.text}}>$</Text>
          )
        }
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
          value={String(field.value || '')}
          onChangeText={value => helpers.setValue(value)}
          onBlur={onBlur}
          onFocus={()=>helpers.setTouched(true)}
        />
      </View>

      { (errorVisible && meta.error) && (
        <ErrorField>{meta.error}</ErrorField>
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  inputContainer: {
    width:'60%',
    flexDirection:'row',
    alignItems:'center'
  },
  input:{
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex:1,
    marginLeft:5
  }
})
