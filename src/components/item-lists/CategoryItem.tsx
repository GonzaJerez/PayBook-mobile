import React, {useContext} from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {AccountStackNavigation} from '../../navigation/AccountNavigation'
import {Category} from '../../interfaces/Category'
import {CategoriesContext} from '../../context/categories/CategoriesContext'


interface Props {
  category: Category;
}


export const CategoryItem = ({category}:Props) => {

  const {navigate} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()
  const {theme} = useContext(ThemeContext)
  const {setActualCategory} = useContext(CategoriesContext)

  const onSelectCategory = ()=>{
    setActualCategory(category);
    navigate('SubcategoriesListScreen')
  }
  

  return (
    <TouchableOpacity
      style={[styles.container, {borderColor:theme.disable}]}
      onPress={onSelectCategory}
    >
      <Text style={[styles.categorieName, {color:theme.colors.text}]}>{category.name}</Text>
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