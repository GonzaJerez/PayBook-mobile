import React, {useContext} from 'react'
import {Text, TouchableOpacity, StyleSheet } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {Subcategory} from '../../interfaces/Subcategory'
import {AccountStackNavigation} from '../../navigation/AccountNavigation'


interface Props {
  subcategory: Subcategory
}

export const SubcategoryItem = ({subcategory}:Props) => {
  const {theme} = useContext(ThemeContext)
  
  const {navigate} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()

  return (
    <TouchableOpacity
      style={[styles.container, {borderColor:theme.disable}]}
      onPress={()=>navigate('EditCategoryScreen', {type:'subcategoría', element:subcategory})
      }
    >
      <Text style={[styles.categorieName, {color:theme.colors.text}]}>{subcategory.name}</Text>
      <Ionicons 
        name='chevron-forward-outline'
        size={20}
        color={theme.colors.text}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:10,
    borderBottomWidth:1
  },
  categorieName:{
    fontSize:20
  }
})