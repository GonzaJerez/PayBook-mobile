import React, {useContext, } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {useField} from 'formik';

import {ThemeContext} from '../../context/theme/ThemeContext';


interface Props {
  label: string;
  options: {name:string; value:string;}[];
  name: string;
}

export const PickerField = ({label, options, name}: Props) => {

  const {theme} = useContext(ThemeContext)

  const [field, meta, helpers] = useField(name)

  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: theme.ligthText}]}>{label}:</Text>
      <Picker
        style={[styles.pickerContainer]}
        selectedValue={field.value}
        itemStyle={{height: 150}}
        onValueChange={(itemValue) => helpers.setValue(itemValue)}
      >
        {options.map(opt => (
          <Picker.Item
            key={opt.value}
            label={String(opt.name)}
            value={opt.value}
          />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  label: {
    flex:1
  },
  pickerContainer: {
    flex: 1
  }
})