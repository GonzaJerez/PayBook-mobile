import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext'

interface Props {
  marginVertical?: number;
  percentWidth?: number;
}

export const DefaultSeparator = ({marginVertical = 30, percentWidth = 40}: Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <View style={{...styles.container, marginVertical}}>
      <View
        style={{
          ...styles.separator,
          borderColor: theme.separator,
          width: `${percentWidth}%`
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%'
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  }
})