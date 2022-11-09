import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useContext} from 'react'
import {ThemeContext} from '../../context/theme/ThemeContext';
import {Ionicons} from '@expo/vector-icons';

interface Props {
  label: string;
  value?: string;
  onPress: ()=>void;
  borderBottom?: boolean
}

export const RowInfoPressable = ({label, value, borderBottom, onPress}: Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <TouchableOpacity 
      style={[
        styles.rowContainer, 
        {
          borderColor: theme.colors.border,
          borderBottomWidth: (borderBottom) ? 1 : 0
        }
      ]}
      onPress={onPress}
    >
      <View style={styles.dataContainer}>
        <Text style={[styles.label, {color: theme.colors.text}]}>{label}</Text>
        <Text 
          numberOfLines={1} 
          adjustsFontSizeToFit 
          style={[styles.value, {color:theme.ligthText}]}
        >
          {value}
        </Text>
      </View>
      <Ionicons
        name='chevron-forward-outline'
        size={20}
        style={styles.icon}
        color={theme.ligthText}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems:'center',
    marginRight:20,
    marginLeft:40,
    paddingVertical:10,
    marginVertical:10,
    borderBottomWidth:1
  },
  dataContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1
  },
  icon:{
    marginLeft:20
  },
  label: {
    fontSize: 20,
    fontWeight: '500'
  },
  value: {
    fontSize: 20,
    fontWeight: '500',
    maxWidth: '60%',
  },
})
