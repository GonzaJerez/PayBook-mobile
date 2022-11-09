import React, {useContext, useState} from 'react'
import {View, Text, StyleSheet, ViewStyle} from 'react-native'
import Checkbox from 'expo-checkbox';

import {ThemeContext} from '../../context/theme/ThemeContext';


interface Props {
  label: string;
  onPress: ()=>void;
  initialState?: boolean;
  style?: ViewStyle
}

export const CheckboxField = ({label, initialState, onPress, style}: Props) => {

  const {theme} = useContext(ThemeContext)

  const [isChecked, setChecked] = useState(initialState);

  const toggleSelect = () => {
    onPress(),
    setChecked(!isChecked)
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, {color: theme.ligthText}]}>{label}</Text>

      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={toggleSelect}
          color={isChecked ? theme.colors.primary : undefined}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    // width: '40%'
    flex:1
  },
  checkboxContainer:{
    // flex:1,
    alignItems:'center'
  },
  checkbox: {

  }
})