import React, {useContext, } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Picker} from '@react-native-picker/picker';

import {ThemeContext} from '../../context/theme/ThemeContext';


interface Props {
  label: string;
  options: string[];
  initialValue: string;
  onChange: React.Dispatch<React.SetStateAction<string>>
}

export const SimplePicker = ({label, options, initialValue, onChange}: Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: theme.ligthText}]}>{label}:</Text>
      <Picker
        style={[styles.pickerContainer, {color:theme.colors.text}]}
        selectedValue={initialValue}
        itemStyle={{height: 150}}
        onValueChange={onChange}
        dropdownIconColor={theme.colors.text}
      >
        {options.map(opt => (
          <Picker.Item
            key={opt}
            label={String(opt)} value={opt}
            color={theme.colors.text}
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